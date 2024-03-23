// import { useState, useEffect, Suspense } from "react";
import { useState,  Suspense } from "react";
import "./ProfilePage.css";
import { Tweet, TrendingTopics , WhoToFollow , SideNavbar } from "@components/index";
//import { supabase } from "@config/supabase"; // Import supabase client
import { mockUserProfile,mockProfileDetails} from '../../mockData/mockData';

import {
  Tweet,
  TrendingTopics,
  WhoToFollow,
  SideNavbar,
} from "@components/index";
import { supabase } from "@config/supabase"; // Import supabase client
import { IoMdPerson, IoMdSettings } from "react-icons/io";
import { Avatar, Button } from "@nextui-org/react";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { BiCalendar } from "react-icons/bi";
import { NavLink } from "react-router-dom";
// interface Profile {
//   Bio?: string | null | undefined;
//   Img_Url?: string | null | undefined;
//   Profile_Id?: number | undefined;
//   Profile_Type?: string | null | undefined;
//   Theme?: boolean | null | undefined;
//   User_Id?: number | undefined;
//   Website?: string | null | undefined;
//   Location?: string | null | undefined;
//   Banner_Url?: string | null | undefined;
//   [key: string]: string | number | boolean | null | undefined; // index signature
// }

const ProfileDetails = () => {
  const [userProfile] = useState<any>(mockUserProfile);
  const [profileDetails] = useState<any>(mockProfileDetails);
  const [createdAt] = useState<any>(new Date(mockUserProfile.Created_at).toLocaleString('en-US', { month: 'long', year: 'numeric' }));
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(mockUserProfile.Name);
  const [editedBio, setEditedBio] = useState(mockProfileDetails.Bio);
  const [editedLocation, setEditedLocation] = useState(mockProfileDetails.Location);
  const [editedWebsite, setEditedWebsite] = useState(mockProfileDetails.Website);
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const [editedBanner, setEditedBanner] = useState<File | null>(null);
  const [content, setContent] = useState(null);

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const { data: { user } } = await supabase.auth.getUser();
  //       if (user) {
  //         const { data: userData, error: userError } = await supabase
  //           .from("User")
  //           .select()
  //           .eq("auth_id", user?.id)
  //           .single();
  //         if (userError) {
  //           throw userError;
  //         }
  //         setUserProfile(userData);
  //         const createdDate = new Date(userData.Created_at);
  //         const formattedDate = createdDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  //         setCreatedAt(formattedDate);
  };
  const loadLiked = () => {
    setContent(loadLikedContent());
  };
    setContent(loadMediaContent());
  const loadMedia = () => {
  };
    setContent(loadRepliesContent());
  const loadReplies = () => {
  const loadTweets = () => {
    setContent(loadTweetsContent());
  };

  //         if (userData?.User_Id) {
  //           const { data: profileData, error: profileError } = await supabase
  //             .from("Profile")
  //             .select()
  //             .eq("User_Id", userData.User_Id)
  //             .single();
  //           if (profileError) {
  //             throw profileError;
  //           }
  //           setProfileDetails(profileData);

  //           // Count followers
  //           const { data: followersData, error: followersError } = await supabase
  //             .from("Followers")
  //             .select("Followed_Id")
  //             .eq("Following_Id", userData.User_Id);
  //           if (followersError) {
  //             throw followersError;
  //           }
  //           const followersCount = followersData.length;

  //           // Count following
  //           const { data: followingData, error: followingError } = await supabase
  //             .from("Followers")
  //             .select("Following_Id")
  //             .eq("Followed_Id", userData.User_Id);
  //           if (followingError) {
  //             throw followingError;
  //           }
  //           const followingCount = followingData.length;

  //           setUserProfile((prevState: any) => ({
  //             ...prevState,
  //             followers: followersCount,
  //             following: followingCount
  //           }));
  //         } else {
  //           console.error("User data ID is undefined");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user profile:", (error as any).message);
  //     }
  //   };

  //   fetchUserProfile();
  // }, []);

  const handleEditClick = () => {
    console.log("Edit button clicked");
    console.log(profileDetails);
    console.log(userProfile);
    setIsEditing(true);
    setEditedName(userProfile?.Name);
    setEditedBio(profileDetails?.Bio);
    setEditedLocation(profileDetails?.Location);
    setEditedWebsite(profileDetails?.Website);
  };


  // const handleSaveClick = async () => {
  //   console.log(editedImage);
  //   console.log(editedBanner);
  //   try {
  //     // Update name in User table
  //     await supabase
  //       .from("User")
  //       .update({ Name: editedName })
  //       .eq("auth_id", userProfile?.auth_id)
  //       .single();

  //     // Update bio in Profile table
  //     await supabase
  //       .from("Profile")
  //       .update({
  //         Bio: editedBio,
  //         Location: editedLocation,
  //         Website: editedWebsite
  //       })
  //       .eq("User_Id", userProfile?.User_Id)
  //       .single();

  //     if (editedImage) {
  //       const { data: imageData, error: imageError } = await supabase.storage
  //         .from(`media`)
  //         .upload(`profile_images/${editedImage.name}`, editedImage, {
  //           cacheControl: "3600",
  //           upsert: false,
  //         });
  //       if (imageError) {
  //         console.log(imageData);
  //         throw new Error(`Error uploading image: ${imageError.message}`);
  //       }

  //       console.log("Image uploaded successfully:", imageData.path);
  //       if (imageData) {
  //         console.log("Image data:", imageData);

  //         const { data: publicURL } = await supabase
  //           .storage
  //           .from('media')
  //           .getPublicUrl(imageData?.path);
  //         // Insert image reference into database table
  //         console.log("Public URL:", publicURL);

  //         const { data: imageInsertData, error: insertError } = await supabase
  //           .from("Profile")
  //           .update({ Img_Url: publicURL.publicUrl })
  //           .eq("User_Id", userProfile.User_Id)
  //           .single();

  //         if (insertError) {
  //           throw insertError;
  //         }

  //         console.log("Image reference inserted into database:", imageInsertData);
  //       }
  //     }

  //     if (editedBanner) {
  //       const { data: bannerData, error: bannerError } = await supabase.storage
  //         .from("media")
  //         .upload(`banner_images/${editedBanner.name}`, editedBanner, {
  //           cacheControl: "3600",
  //           upsert: false,
  //         });
  //       if (bannerError) {
  //         throw new Error(`Error uploading banner: ${bannerError.message}`);
  //       }

  //       console.log("Banner uploaded successfully:", bannerData.path);

  //       if (bannerData) {
  //         console.log("Banner data:", bannerData);

  //         const { data: bannerURL } = await supabase
  //           .storage
  //           .from('media')
  //           .getPublicUrl(bannerData.path);
  //         // Insert image reference into database table
  //         console.log("Banner URL:", bannerURL);

  //         // Insert image reference into database table
  //         const { data: bannerInsertData, error: bannerInsertError } = await supabase
  //           .from("Profile")
  //           .update({ 
  //             Banner_Url: bannerURL?.publicUrl,
  //             Bio: editedBio,
  //             Img_Url: editedImage ? editedImage.toString() : "",
  //             Profile_Id: userProfile?.Profile_Id,
  //             Profile_Type: userProfile?.Profile_Type,
  //             Theme: userProfile?.Theme,
  //             User_Id: userProfile?.User_Id
  //           })
  //           .eq("User_Id", userProfile?.User_Id)
  //           .single();

  //         if (bannerInsertError) {
  //           throw bannerInsertError;
  //         }

  //         console.log("Banner reference inserted into database:", bannerInsertData);
  //       }
  //     }

  //     // Refresh profile details after updating
  //     const { data: updatedProfileData, error: profileError } = await supabase
  //       .from("Profile")
  //       .select()
  //       .eq("User_Id", userProfile.User_Id)
  //       .single();
  //     if (profileError) {
  //       throw profileError;
  //     }
  //     setProfileDetails(updatedProfileData);

  //     const { data: updatedUserData, error: updatedUserError } = await supabase
  //       .from("User")
  //       .select()
  //       .eq("auth_id", userProfile?.auth_id)
  //       .single();
  //     if (updatedUserError) {
  //       throw updatedUserError;
  //     }
  //     setUserProfile(updatedUserData);

  //     // Close the edit window and reset states
  //     setIsEditing(false);
  //     setEditedName("");
  //     setEditedBio("");
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       if (error.message.includes("media")) {
  //         console.error("Error uploading image:", error.message);
  //       } else if (error.message.includes("images")) {
  //         console.error("Error uploading banner:", error.message);
  //       } else if (error.message.includes("Profile")) {
  //         console.error("Error updating profile:", error.message);
  //       } else if (error.message.includes("User")) {
  //         console.error("Error updating user:", error.message);
  //       } else {
  //         console.error("Unknown error:", error.message);
  //       }
  //     }
  //   }
  // };

  const handleCancelClick = () => {
    // Reset Editing state to close the edit window
    setIsEditing(false);
  };

  const loadTweetsContent = () => {
    return <div>Loading tweets...</div>;
  };
  const loadRepliesContent = () => {
    return <div>Loading replies...</div>;
  };
  const loadMediaContent = () => {
    return <div>Loading media...</div>;
  };
  const loadLikedContent = () => {
    return <div>Loading liked content...</div>;
  };

  if (!profileDetails || !userProfile) {
    return <div>Loading...</div>; // Render loading indicator until data is fetched
  }

  return (
    <div className="profile-page flex">
      <div className="sidebar-left w-1/4">
        {/* Side Navbar */}
        <SideNavbar />
      </div>
      <div className="main-content flex-1">
        {/* Profile  Header} */}
        <div className="profile-header bg gray-200 p-4 flex items-center">
          <div className="profile-info flex items-center">
            <div>
              <div>
                <h2 className="font-bold text-xl">
                  <Avatar
                    src={profileDetails.Img_Url}
                    alt={userProfile.Name}
                    size="lg"
                  />
                  {userProfile.Name}
                </h2>
                <p className="text-gray-500">@{userProfile.Username}</p>
                <p className="text-gray-500">
                  <BiCalendar className="mr-1" />
                  Joined {createdAt}
                </p>
              </div>
              <NavLink to="/editProfile">
                <Button className="ml-auto">
                  <IoMdSettings className="mr-1"></IoMdSettings>Edit Profile
                </Button>
              </NavLink>
              {/* Profile Details */}
              <div className="profile-details ">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Tweets</h3>
                    <p className="text-gray-500">0</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Following</h3>
                    <p className="text-gray-500">{userProfile.following}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Followers</h3>
                    <p className="text-gray-500">{userProfile.followers}</p>
                  </div>
                </div>
              </div>
              <div className="profile-tabs">
                <Button className="active" onClick={loadTweets}>
                  Tweets
                </Button>
                <Button className="active" onClick={loadReplies}>
                  Replies
                </Button>
                <Button className="active" onClick={loadMedia}>
                  Media
                </Button>
                <Button className="active" onClick={loadLiked}>
                  Likes
                </Button>
              </div>
            </div>
          </div>

              <label htmlFor="image">Profile Image</label>
              {editedImage ? (
                <img
                  src={URL.createObjectURL(editedImage)}
                  alt="Profile Image"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              ) : profileDetails.Img_Url ? (
                <img
                  src={profileDetails.Img_Url}
                  alt="Profile Image"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              ) : (
                <span>No profile image selected</span>
              )}
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setEditedImage(files[0]);
                  }
                }}
              />

              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <label htmlFor="bio">Bio</label>
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
              ></textarea>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
              />
              <label htmlFor="website">Website</label>
              <input
                type="text"
                value={editedWebsite}
                onChange={(e) => setEditedWebsite(e.target.value)}
              />
              {/* <button onClick={handleSaveClick}>Save</button> */}
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>{profileDetails.Profile_Type}</h3>
              <p>{profileDetails.Bio}</p>
              <p>
                . Location: {profileDetails.Location} . Joined {createdAt}
              </p>
              <p><a href={profileDetails.Website}>{profileDetails.Website}</a></p>
              <p>
                <span>{userProfile.following} Following</span>{" "}
                <span>{userProfile.followers} Followers</span>
              </p>
            </div>
          )}
        </div>
        {/* Tweets */}
        {content}
      </div>
      <div className="sidebar-right w-1/4">
        <TrendingTopics />
        <WhoToFollow />
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileDetails />
    </Suspense>
  );
};

export default ProfilePage;
