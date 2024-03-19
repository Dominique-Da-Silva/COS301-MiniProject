import React, { useState, useEffect, Suspense } from "react";
import "./ProfilePage.css";
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
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileDetails, setProfileDetails] = useState<any>(null);
  const [createdAt, setCreatedAt] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedWebsite, setEditedWebsite] = useState("");
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const [editedBanner, setEditedBanner] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data: userData, error: userError } = await supabase
            .from("User")
            .select()
            .eq("auth_id", user?.id)
            .single();
          if (userError) {
            throw userError;
          }
          setUserProfile(userData);
          const createdDate = new Date(userData.Created_at);
          const formattedDate = createdDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          });
          setCreatedAt(formattedDate);

          if (userData?.User_Id) {
            const { data: profileData, error: profileError } = await supabase
              .from("Profile")
              .select()
              .eq("User_Id", userData.User_Id)
              .single();
            if (profileError) {
              throw profileError;
            }
            setProfileDetails(profileData);

            // Count followers
            const { data: followersData, error: followersError } =
              await supabase
                .from("Followers")
                .select("Followed_Id")
                .eq("Following_Id", userData.User_Id);
            if (followersError) {
              throw followersError;
            }
            const followersCount = followersData.length;

            // Count following
            const { data: followingData, error: followingError } =
              await supabase
                .from("Followers")
                .select("Following_Id")
                .eq("Followed_Id", userData.User_Id);
            if (followingError) {
              throw followingError;
            }
            const followingCount = followingData.length;

            setUserProfile((prevState: any) => ({
              ...prevState,
              followers: followersCount,
              following: followingCount,
            }));
          } else {
            console.error("User data ID is undefined");
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", (error as any).message);
      }
    };

    fetchUserProfile();
  }, []);

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

  const handleSaveClick = async () => {
    console.log(editedImage);
    console.log(editedBanner);
    try {
      // Update name in User table
      await supabase
        .from("User")
        .update({ Name: editedName })
        .eq("auth_id", userProfile?.auth_id)
        .single();

      // Update bio in Profile table
      await supabase
        .from("Profile")
        .update({
          Bio: editedBio,
          Location: editedLocation,
          Website: editedWebsite,
        })
        .eq("User_Id", userProfile?.User_Id)
        .single();

      if (editedImage) {
        const { data: imageData, error: imageError } = await supabase.storage
          .from(`media`)
          .upload(`profile_images/${editedImage.name}`, editedImage, {
            cacheControl: "3600",
            upsert: false,
          });
        if (imageError) {
          console.log(imageData);
          throw new Error(`Error uploading image: ${imageError.message}`);
        }

        console.log("Image uploaded successfully:", imageData.path);
        if (imageData) {
          console.log("Image data:", imageData);

          const { data: publicURL } = await supabase.storage
            .from("media")
            .getPublicUrl(imageData?.path);
          // Insert image reference into database table
          console.log("Public URL:", publicURL);

          const { data: imageInsertData, error: insertError } = await supabase
            .from("Profile")
            .update({ Img_Url: publicURL.publicUrl })
            .eq("User_Id", userProfile.User_Id)
            .single();

          if (insertError) {
            throw insertError;
          }

          console.log(
            "Image reference inserted into database:",
            imageInsertData
          );
        }
      }

      if (editedBanner) {
        const { data: bannerData, error: bannerError } = await supabase.storage
          .from("media")
          .upload(`banner_images/${editedBanner.name}`, editedBanner, {
            cacheControl: "3600",
            upsert: false,
          });
        if (bannerError) {
          throw new Error(`Error uploading banner: ${bannerError.message}`);
        }

        console.log("Banner uploaded successfully:", bannerData.path);

        if (bannerData) {
          console.log("Banner data:", bannerData);

          const { data: bannerURL } = await supabase.storage
            .from("media")
            .getPublicUrl(bannerData.path);
          // Insert image reference into database table
          console.log("Banner URL:", bannerURL);

          // Insert image reference into database table
          const { data: bannerInsertData, error: bannerInsertError } =
            await supabase
              .from("Profile")
              .update({
                Banner_Url: bannerURL?.publicUrl,
                Bio: editedBio,
                Img_Url: editedImage ? editedImage.toString() : "",
                Profile_Id: userProfile?.Profile_Id,
                Profile_Type: userProfile?.Profile_Type,
                Theme: userProfile?.Theme,
                User_Id: userProfile?.User_Id,
              })
              .eq("User_Id", userProfile?.User_Id)
              .single();

          if (bannerInsertError) {
            throw bannerInsertError;
          }

          console.log(
            "Banner reference inserted into database:",
            bannerInsertData
          );
        }
      }

      // Refresh profile details after updating
      const { data: updatedProfileData, error: profileError } = await supabase
        .from("Profile")
        .select()
        .eq("User_Id", userProfile.User_Id)
        .single();
      if (profileError) {
        throw profileError;
      }
      setProfileDetails(updatedProfileData);

      const { data: updatedUserData, error: updatedUserError } = await supabase
        .from("User")
        .select()
        .eq("auth_id", userProfile?.auth_id)
        .single();
      if (updatedUserError) {
        throw updatedUserError;
      }
      setUserProfile(updatedUserData);

      // Close the edit window and reset states
      setIsEditing(false);
      setEditedName("");
      setEditedBio("");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("media")) {
          console.error("Error uploading image:", error.message);
        } else if (error.message.includes("images")) {
          console.error("Error uploading banner:", error.message);
        } else if (error.message.includes("Profile")) {
          console.error("Error updating profile:", error.message);
        } else if (error.message.includes("User")) {
          console.error("Error updating user:", error.message);
        } else {
          console.error("Unknown error:", error.message);
        }
      }
    }
  };

  const handleCancelClick = () => {
    // Reset Editing state to close the edit window
    setIsEditing(false);
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
              <Button className="ml-auto">
                <IoMdSettings className="mr-1" ></IoMdSettings>Edit Profile
              </Button>
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
                <Button className="active">Tweets</Button>
                <Button>Replies</Button>
                <Button>Media</Button>
                <Button>Likes</Button>
              </div>
            </div>
          </div>

          {/* Tweets */}
        </div>
        {/* Tweets */}
        <Tweet
          name={userProfile.Name}
          username={userProfile.Username}
          text="This is a tweet"
          timeDisplay={createdAt}
          likes={profileDetails.likes}
          retweets={profileDetails.retweets}
          comments={profileDetails.comments}
          saves={profileDetails.saves}
        />
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
