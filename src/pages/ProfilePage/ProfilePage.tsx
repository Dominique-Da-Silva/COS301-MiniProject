import { useState, Suspense, useEffect } from "react";

import { Tweet, TrendingTopics, WhoToFollow, Nav } from "@components/index";
//import { supabase } from "@config/supabase"; // Import supabase client
import { mockUserProfile, mockProfileDetails } from "../../mockData/mockData";
import { countFollowing, fetchProfileDetails } from "@services/index";
import { countFollowers } from "@services/index";
import { fetchUserData } from "@services/index";
import { fetchUserMedia } from "@services/index";
import { fetchLikedPosts } from "@services/index";
import { getUserTweets } from "@services/index";
import { getUserComments } from "@services/index";
//import { getUserData } from "@services/auth/auth";
// import { EditProfile, SearchBar } from "@components/index";
import { IoMdSettings } from "react-icons/io";
import { Avatar, Button } from "@nextui-org/react";
import { BiCalendar } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { Search } from "@components/index";
import { isUserLoggedIn } from "@services/index";
import { fetchTweets, fetchUsers } from "@services/index";
import { fetchAllProfiles } from "@services/profileServices/getProfile";
// import {
//   mockTweets,
//   mockUsers,
//   mockSavesCount,
//   mockCommentsCount,
//   mockRetweetsCount,
//   mockLikesCount,
// } from "../../mockData/mockData";

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

// interface PopupProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

//Make not of tweet_Ids not being unique

interface Tweet {
  key: number;
  name: string;
  username: string;
  text: string;
  imageUrl: string;
  likes: number;
  retweets: number;
  saves: number;
  comments: number;
  timeDisplay: string;
  profileimageurl: string;
  author?: string;
}

const getTimeDisplay = (timestamp: string) => {
  const currentTime = new Date();
  const parsedTimestamp = new Date(timestamp);

  const timeDiff = currentTime.getTime() - parsedTimestamp.getTime(); // Get time difference in milliseconds
  const minutesDiff = Math.floor(timeDiff / 60000); // Convert milliseconds to minutes

  let timeDisplay;
  if (minutesDiff < 60) {
    timeDisplay = `${minutesDiff}m`;
  } else {
    const hoursDiff = Math.floor(minutesDiff / 60); // Convert minutes to hours
    if (hoursDiff < 24) timeDisplay = `${hoursDiff}h`;
    else {
      const month = parsedTimestamp.toLocaleString("en-us", {
        month: "short",
      });
      const day = parsedTimestamp.getDate();
      timeDisplay = `${month} ${day}`;
    }
  }

  return timeDisplay;
};

// const formatCount = (count: number): string | number => {
//   if (count < 1000) {
//     return count; // Return as it is if less than 1000
//   } else if (count < 1000000) {
//     // Convert to K format
//     return (count / 1000).toFixed(1) + "K";
//   } else {
//     // Convert to M format
//     return (count / 1000000).toFixed(1) + "M";
//   }
// };

// const editingProfile: React.FC<PopupProps> = ({ isOpen, onClose }) => {
//   const [isVisible, setIsVisible] = useState(isOpen);
//   const popupRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setIsVisible(isOpen);
//   }, [isOpen]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node)
//       ) {
//         onClose();
//       }
//     };

//     if (isVisible) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isVisible, onClose]);

//   if (!isVisible) {
//     return null;
//   }
//   return <EditProfile />;
// };

const ProfileDetails = () => {

  const [activeTab, setActiveTab] = useState("tweets");
  const [userProfile] = useState<any>(mockUserProfile);
  const [profileDetails, setProfileDetails] = useState<any>(mockProfileDetails);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(mockUserProfile);
  const [userFollowers, setUserFollowers] = useState<any>(null);
  const [userFollowing, setUserFollowing] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [tweetCollection, setTweetCollection] = useState<any[]>([]);
  const [createdAt] = useState<any>(
    new Date(mockUserProfile.Created_at).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    })
  );
  //FALSE MEANS USER IS VIEWING HIS OWN PROFILE, TRUE MEANS USER IS VIEWING SOMEONE ELSE'S PROFILE
  //This is just a placeholder for now, we will implement the actual logic later where the context is retrieved dynamically and not manually set.
  const [external, setExternal] = useState(true);

  const [following, setFollowing] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  // const [editedName, setEditedName] = useState(mockUserProfile.Name);
  // const [editedBio, setEditedBio] = useState(mockProfileDetails.Bio);
  // const [editedLocation, setEditedLocation] = useState(
  //   mockProfileDetails.Location
  // );
  // const [editedWebsite, setEditedWebsite] = useState(
  //   mockProfileDetails.Website
  // );
  // const [editedImage, setEditedImage] = useState<File | null>(null);
  // const [editedBanner, setEditedBanner] = useState<File | null>(null);
  // const [content, setContent] = useState(null);
  // const [followingCount, setFollowingCount] = useState<number>(10); // mock following count
  // const [followerCount, setFollowerCount] = useState<number>(20); // mock followers count
  const [userTweets, setUserTweets] = useState<any[]>([]);
  const [userMedia, setUserMedia] = useState<string[]>([]);
  const [userReplies, setUserReplies] = useState<any[]>([]);
  // const [userLikes, setUserLikes] = useState<TweetProps[]>([]);
  const [likedTweets, setLikedTweets] = useState<any[]>([]);
  // const [replies, setReplies] = useState<TweetProps[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userDataX = await fetchUserData();
  //       //setUserData()
  //       //console.log(userDataX);
  //     //   const followingCount = await countFollowing(userData.id);
  //     //   const followerCount = await countFollowers(userData.id);
  //       // console.log(followingCount); 
  //       //setUserData(null);
  //       setUserData(userDataX);
  //     } catch (error) {
  //         console.error("Error fetching data: ", error);
  //     }
  //   } 
  //   fetchData();
  // }, []);

  useEffect(() => {
    
    const getUD = async () => {
      const userDataX = await fetchUserData();
      setUserData(userDataX);
    }
    getUD();

    const profileSub = async () => {
      try {
        const profileTemp = await fetchProfileDetails(userData.User_Id);
        const followerTemp = await countFollowers(userData.User_Id);
        const followingTemp = await countFollowing(userData.User_Id);
        const userDataX = await fetchUserData();
        const imageURLs = await fetchUserMedia(userData.User_Id);
        setExternal(false);
        setUserFollowers(followerTemp);
        setUserFollowing(followingTemp);
        setUserData(userDataX);
        setProfileDetails(profileTemp);
        setUserMedia(imageURLs);
      } catch (error) {
          console.error("Error fetching data: ", error);
      }
    } 
    profileSub();
    
    const getLikes = async () => {
      try {
        const likes = await fetchLikedPosts(userData.User_Id);
        //console.log(likes);
        setLikedTweets(likes);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    getLikes();

    const getCurrUserTweets = async () => {
      try {
        const tempTweets = await getUserTweets(userData.User_Id);
        setUserTweets(tempTweets);
      }
      catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    getCurrUserTweets();

    // const getLikesPerTweet = async () => {
    //   try {
    //     if (userTweets.length !== 0) {
    //       const tweetIds = userTweets.map(tweet => tweet.tweet_Id);
    //       console.log("_________________________");
    //       console.log(tweetIds);
    //     }
        
    //     //setLikesPerTweet(tweetIds);
    //   } 
    //   catch (error) {
    //     console.error("Error fetching data: ", error);
    //   }
    // }
    //getLikesPerTweet();

    const getUserReplies = async() => {
      try {
        const replies = await getUserComments(userData.User_Id);
        setUserReplies(replies);
      }
      catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    getUserReplies();

    const getUsers= async() => {
      try {
        const usersFetched = await fetchUsers();
        const profilesFetched = await fetchAllProfiles();
        setUsers(usersFetched as any[]);
        setProfiles(profilesFetched as any[]);
      }
      catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    getUsers();

    const getTweets = async() => {
      try {
        const tweetsFetched = await fetchTweets();
        setTweetCollection(tweetsFetched as any[]);
        // console.log(tweetCollection);
      }
      catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    getTweets();
  }, [activeTab, userData.User_Id]);

  useEffect(() => {
    // this is necessary for checking if the user is signed in
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      if (!result) {
        navigate("/home"); // Redirect to home page if user is not logged in
      }
    }
    
    // Call the async function
    checkUser();
  }, [navigate]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

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
  // };
  // const loadLiked = () => {
  //   setContent(loadLikedContent());
  // };
  //   setContent(loadMediaContent());
  // const loadMedia = () => {
  // };
  //   setContent(loadRepliesContent());
  // const loadReplies = () => {
  // const loadTweets = () => {
  //   setContent(loadTweetsContent());
  // };

  // <button onClick={async () => {
  //   const result = await toggleLike(tweetId, userId);
  //   if (result === 'liked') {
  //     //I'm guessing we'd change the colour of the heart icon, from white to red/black
  //   } else if (result === 'unliked') {
  //     //I'm guessing we'd change the colour of the heart icon again, but from red/black to white
  //   } else {
  //     //We just process the error here, maybe a toast or something
  //   }
  // }}>
  //   Like
  // </button>

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

  // const handleEditClick = () => {
  //   console.log("Edit button clicked");
  //   console.log(profileDetails);
  //   console.log(userProfile);
  //   setIsEditing(true);
  //   setEditedName(userProfile?.Name);
  //   setEditedBio(profileDetails?.Bio);
  //   setEditedLocation(profileDetails?.Location);
  //   setEditedWebsite(profileDetails?.Website);
  // };

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

  // const handleCancelClick = () => {
  //   // Reset Editing state to close the edit window
  //   setIsEditing(false);
  // };

  // const loadTweetsContent = () => {
  //   return <div>Loading tweets...</div>;
  // };
  // const loadRepliesContent = () => {
  //   return <div>Loading replies...</div>;
  // };
  // const loadMediaContent = () => {
  //   return <div>Loading media...</div>;
  // };
  // const loadLikedContent = () => {
  //   return <div>Loading liked content...</div>;
  // };

  if (!profileDetails || !userProfile) {
    console.log("Log");
    return <div>Loading...</div>;
  }

  // const [isEditingProfileOpen, setIsEditingProfileOpen] = useState(false);

  // const handleEditProfileClose = () => {
  //   setIsEditingProfileOpen(false);
  // };

  // const handleEditProfileOpen = () => {
  //   setIsEditingProfileOpen(true);
  // };
  
  

  const handleButtonClick = () => {
    setFollowing(!following);
  }

  return (
    <div className="container flex">
      <div className="nav flex justify-end w-1/4 m-0 p-0 mr-[3vh] pr-10">
        <Nav />
      </div>
      <div className="main-content flex w-2/5 m-0 p-0 border">
        <div className="flex flex-col w-full m-0 p-0 justify-center">
          <div className="banner m-0">
            <img
              src={profileDetails.Banner_Url}
              alt="Banner"
              className="w-full h-48 m-0"
            />
          </div>
          {/* Profile  Header} */}
          <div className="profile-header bg-gray min-w-full p-0 flex items-center">
            <div className="profile-info flex flex-col min-w-full m-0">
              <div className="m-0 p-4">
                <div className="profile flex min-w-full flex-1 justify-between items-center">
                  <Avatar
                    src={profileDetails.Img_Url}
                    alt={userData.Name}
                    size="lg"
                  />
                  {external ? (
                    <Button
                    className={`ml-auto text-base font-semibold rounded-full border ${
                      following ? 'bg-blue-400 text-white border-blue-400' : 'bg-white border-gray-300 text-blue-400'
                    } h-9 items-center`}
                    style={{ borderColor: following ? '#1DA1F2' : '#DADADA', color: following ? '#FFFFFF' : '#1DA1F2' }}
                    onClick={handleButtonClick}
                    >
                      {following ? 'Following' : 'Follow'}
                    </Button>
                  ) : (
                    <NavLink to="/editProfile">
                      <Button className="ml-auto text-base font-semibold rounded-full border bg-white border-gray-300 h-9 items-center">
                        <IoMdSettings className="mr-1" />
                        Edit profile
                      </Button>
                    </NavLink>
                  )}
                </div>
                <h2 className="font-bold text-xl">
                  {userData.Name}
                </h2>

                <p className="text-gray-500 mb-5">@{userData.Username}</p>
                <p className="mb-2">{profileDetails.Bio}</p>
                <p className="text-gray-500 flex items-center">
                  <BiCalendar className="mr-1" />
                  Joined {createdAt}
                </p>
              </div>
              {/* Profile Details */}
              <div>
                <div className="profile-details ">
                  <div className="flex gap-6 items-center px-4 mb-6">
                    {/* <div className="flex">
                      <h3 className="font-bold text-lg">Tweets</h3>
                      <p className="text-gray-500">0</p>
                    </div> */}
                    <div className="flex">
                      <p className="font-semibold">{userFollowing}&nbsp;</p>
                      <h3 className="text-base text-gray-500">Following</h3>
                    </div>
                    <div className="flex">
                      <p className="font-semibold">{userFollowers}&nbsp;</p>
                      <h3 className="text-base text-gray-500">Followers</h3>
                    </div>
                  </div>
                </div>
              </div>
                <div>
                  <div className="flex justify-around border-b border-gray-200">
                    <button
                      className={`px-4 py-2 text-base font-semibold hover:bg-gray-200 ${
                        activeTab === "tweets"
                          ? "text-black border-b-3 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleTabClick("tweets")}
                    >
                      Tweets
                    </button>

                    <button
                      className={`px-4 py-2 text-base font-semibold hover:bg-gray-200 ${
                        activeTab === "replies"
                          ? "text-black border-b-3 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleTabClick("replies")}
                    >
                      Replies
                    </button>
                    <button
                      className={`px-4 py-2 text-base font-semibold hover:bg-gray-200 ${
                        activeTab === "media"
                          ? "text-black border-b-3 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleTabClick("media")}
                    >
                      Media
                    </button>
                    <button
                      className={`px-4 py-2 text-base font-semibold hover:bg-gray-200 ${
                        activeTab === "likes"
                          ? "text-black border-b-3 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleTabClick("likes")}
                    >
                      Likes
                    </button>
                  </div>
                  
                  {activeTab === "tweets" && (
                  <>
                    <div>
                      {userTweets.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '800px' }}>
                          <p className="text-center text-gray-500">
                            User hasn't tweeted yet
                          </p>
                        </div>
                      ) : (
                        userTweets.map((tweet, index) => {
                          const image_url = profileDetails.Img_Url;
                          const originalTweet = tweetCollection.find((u: { Tweet_Id: string }) => tweet.Tweet_Id === u.Tweet_Id);
                          const _likes = originalTweet.Likes[0].count || 0;
                          const _saves = originalTweet.Saves[0].count || 0;
                          const _comments = originalTweet.Comments[0].count || 0;
                          const _retweets = originalTweet.Retweets[0].count || 0;
                          return(
                            <Tweet
                              key={index}
                              name={userData.Name}
                              username={`@${userData.Username}`}
                              text={tweet.Content}
                              imageUrl={tweet.Img_Url}
                              timeDisplay={getTimeDisplay(tweet.Created_at)}
                              likes={_likes}
                              retweets={_retweets}
                              saves={_saves}
                              comments={_comments}
                              profileimageurl={image_url}
                            />);
                        })
                      )}
                    </div>
                    <div style={{ height: '800px' }}></div>
                  </>
                )}
                  {activeTab === "media" && (
                    <>
                      <div className="grid grid-cols-3 gap-1">
                        {userMedia.filter((u) => u !== "")
                          .length === 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '800px' }}>
                            <p className="text-center text-gray-500">
                              No media to display
                            </p>
                          </div>
                          ) : (
                          userMedia
                            .filter((u) => u !== "")
                            .map((u, index) => (
                              <div key={index}>
                                <img
                                  src={u}
                                  alt="Tweet"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ))
                        )}
                      </div>
                      <div style={{ height: '800px' }}></div>
                    </>
                  )}
                  {activeTab === "replies" && (
                  <>
                    <div>
                    {userReplies.length === 0 ? (
                         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '800px' }}>
                         <p className="text-center text-gray-500">
                           No replies to display
                         </p>
                       </div>
                      ) : (
                          userReplies.map((reply, index) => {
                            const originalTweet = tweetCollection.find((u: { Tweet_Id: string }) => reply.Tweet_Id === u.Tweet_Id);
                            const iUser = users.find((u: any) => u.User_Id === originalTweet.User_Id); 
                            const _likes = originalTweet.Likes[0].count || 0;
                            const _comments = originalTweet.Comments[0].count || 0;
                            const _saves = originalTweet.Saves[0].count || 0;
                            const _retweets = originalTweet.Retweets[0].count || 0;
                            const image_url = profileDetails.Img_Url;
                            return (
                              <Tweet
                                key={index}
                                name={userData.Name}
                                username={`@${userData.Username}`}
                                author={iUser ? `@${iUser.Username}` : ''} text={reply.Content}
                                imageUrl={reply.image_url}
                                likes={_likes}
                                retweets={_retweets}
                                saves={_saves}
                                comments={_comments}
                                timeDisplay={getTimeDisplay(reply.Created_at)}
                                profileimageurl={image_url}
                            />);
                            })
                          )}
                    </div>
                    <div style={{ height: '800px' }}></div>
                    </>
                  )}
              </div>
                {activeTab === "likes" && (
                <>
                  <div>
                    {likedTweets.length === 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '800px' }}>
                        <p className="text-center text-gray-500">
                          No liked Tweets to display
                        </p>
                      </div>
                    ) : (
                        likedTweets.map((tweet, index) => {
                          const iUser = users.find((u: any) => u.User_Id === tweet.User_Id); 
                          const image_url = profiles.find(p => p.User_Id === tweet.User_Id)?.Img_Url;
                          const originalTweet = tweetCollection.find((u: { Tweet_Id: string }) => tweet.Tweet_Id === u.Tweet_Id);
                          const _likes = originalTweet.Likes[0].count || 0;
                          const _comments = originalTweet.Comments[0].count || 0;
                          const _saves = originalTweet.Saves[0].count || 0;
                          const _retweets = originalTweet.Retweets[0].count || 0;
                        return(
                          <Tweet
                            key={index}
                            name={iUser ? iUser.Name : "Unknown User"}
                            username={iUser ? `@${iUser.Username}` : ""}
                            text={tweet.Content}
                            imageUrl={tweet.Img_Url}
                            timeDisplay={getTimeDisplay(tweet.Created_at)}
                            likes={_likes}
                            retweets={_retweets}
                            saves={_saves}
                            comments={_comments}
                            profileimageurl={image_url}
                          />);
                      })
                    )}
                  </div>
                  <div style={{ height: '800px' }}></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-right w-1/4 ml-7 mt-2 pl-1 pr-2">
        <div className="mb-3">
          <Search />
        </div>
        <TrendingTopics />
        <WhoToFollow users={[]} />
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
