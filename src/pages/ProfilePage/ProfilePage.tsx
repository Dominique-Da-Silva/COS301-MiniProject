import { useState, Suspense, useEffect } from "react";

import { Tweet, TrendingTopics, WhoToFollow, Nav } from "@components/index";
//import { supabase } from "@config/supabase"; // Import supabase client
import { mockUserProfile, mockProfileDetails } from "../../mockData/mockData";

// import { EditProfile, SearchBar } from "@components/index";
import { IoMdSettings } from "react-icons/io";
import { Avatar, Button } from "@nextui-org/react";
import { BiCalendar } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { Search } from "@components/index";
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

interface TweetProps {
  id: number;
  image: string;
  createdAt: string;
  name: string;
  username: string;
  text: string;
  image_url: string;
  likes: number;
  retweets: number;
  quotes: number;
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
  const [profileDetails] = useState<any>(mockProfileDetails);
  const [createdAt] = useState<any>(
    new Date(mockUserProfile.Created_at).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    })
  );
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
  const [userTweets, setUserTweets] = useState<TweetProps[]>([]);
  const [userReplies, setUserReplies] = useState<TweetProps[]>([]);
  // const [userLikes, setUserLikes] = useState<TweetProps[]>([]);
  const [likedTweets, setLikedTweets] = useState<TweetProps[]>([]);
  // const [replies, setReplies] = useState<TweetProps[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        //const { data: { user } } = {};
        // if (user) {
        const mockTweets: TweetProps[] = [
          {
            id: 1,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "This is a mock tweet.",
            createdAt: "2022-01-01T00:00:00Z",
            image_url: "",
            likes: 2,
            retweets: 4,
            quotes: 1,
          },
          {
            id: 2,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Just another day on Twitter.",
            createdAt: "2022-01-02T00:00:00Z",
            image_url: "",
            likes: 5,
            retweets: 3,
            quotes: 0,
          },
          {
            id: 3,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Feeling good today!",
            createdAt: "2022-01-03T00:00:00Z",
            image_url: "",
            likes: 10,
            retweets: 8,
            quotes: 2,
          },
          {
            id: 4,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Just tweeted!",
            createdAt: "2022-01-04T00:00:00Z",
            image_url: "",
            likes: 15,
            retweets: 12,
            quotes: 3,
          },
          {
            id: 5,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Another tweet.",
            createdAt: "2022-01-05T00:00:00Z",
            image_url: "",
            likes: 20,
            retweets: 18,
            quotes: 5,
          },
          {
            id: 6,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "More tweets coming!",
            createdAt: "2022-01-06T00:00:00Z",
            image_url: "",
            likes: 25,
            retweets: 22,
            quotes: 6,
          },
          {
            id: 7,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Tweeting away.",
            createdAt: "2022-01-07T00:00:00Z",
            image_url: "",
            likes: 30,
            retweets: 28,
            quotes: 7,
          },
          {
            id: 8,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Having fun on Twitter.",
            createdAt: "2022-01-08T00:00:00Z",
            image_url: "",
            likes: 35,
            retweets: 32,
            quotes: 8,
          },
          {
            id: 9,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Just another tweet.",
            createdAt: "2022-01-09T00:00:00Z",
            image_url: "",
            likes: 40,
            retweets: 38,
            quotes: 9,
          },
          {
            id: 10,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Tweeting is fun!",
            createdAt: "2022-01-10T00:00:00Z",
            image_url: "",
            likes: 45,
            retweets: 42,
            quotes: 10,
          },
        ];
        setUserTweets(mockTweets);

        const userData = {
          following: 10, // mock following count
          followers: 20, // mock followers count
          Created_at: "2020-01-01T00:00:00Z",
          User_Id: 1,
          Username: "rickgrimes",
        };
        //setUserProfile(userData);

        const mockLikedTweets: TweetProps[] = [
          {
            id: 1,
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr7fjxvXMeWVUHUTjwGaS2Co_4dT7NwiLbxsJw1YhX2Q&s",
            name: "Mock User L1",
            username: "MUL1",
            text: "Remember to change data",
            createdAt: "2022-01-01T00:00:00Z",
            image_url: "",
            likes: 8,
            retweets: 564,
            quotes: 10000,
          },
          {
            id: 2,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr7fjxvXMeWVUHUTjwGaS2Co_4dT7NwiLbxsJw1YhX2Q&s",
            name: "Mock User L1",
            username: "MUL1",
            text: "Remember to change data",
            createdAt: "2022-01-01T00:00:00Z",
            image_url: "",
            likes: 8,
            retweets: 564,
            quotes: 10000,
          },
          {
            id: 3,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr7fjxvXMeWVUHUTjwGaS2Co_4dT7NwiLbxsJw1YhX2Q&s",
            name: "Mock User L1",
            username: "MUL1",
            text: "Great day ahead!",
            createdAt: "2022-01-02T00:00:00Z",
            image_url: "",
            likes: 15,
            retweets: 678,
            quotes: 20000,
          },
          {
            id: 4,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr7fjxvXMeWVUHUTjwGaS2Co_4dT7NwiLbxsJw1YhX2Q&s",
            name: "Mock User L1",
            username: "MUL1",
            text: "Just tweeting!",
            createdAt: "2022-01-03T00:00:00Z",
            image_url: "",
            likes: 20,
            retweets: 789,
            quotes: 30000,
          },
          {
            id: 5,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr7fjxvXMeWVUHUTjwGaS2Co_4dT7NwiLbxsJw1YhX2Q&s",
            name: "Mock User L1",
            username: "MUL1",
            text: "Feeling happy!",
            createdAt: "2022-01-04T00:00:00Z",
            image_url: "",
            likes: 25,
            retweets: 890,
            quotes: 40000,
          },
          {
            id: 6,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr7fjxvXMeWVUHUTjwGaS2Co_4dT7NwiLbxsJw1YhX2Q&s",
            name: "Mock User L1",
            username: "MUL1",
            text: "Tweeting away!",
            createdAt: "2022-01-05T00:00:00Z",
            image_url: "",
            likes: 30,
            retweets: 912,
            quotes: 50000,
          },
        ];
        setLikedTweets(mockLikedTweets);

        const mockReplies: TweetProps[] = [
          {
            id: 1,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "This is a mock reply.",
            createdAt: "2022-01-01T00:00:00Z",
            image_url: "",
            likes: 0,
            retweets: 0,
            quotes: 0,
          },
          {
            id: 2,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Just another day on Twitter.",
            createdAt: "2022-01-02T00:00:00Z",
            image_url: "",
            likes: 5,
            retweets: 3,
            quotes: 0,
          },
          {
            id: 3,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Feeling good today!",
            createdAt: "2022-01-03T00:00:00Z",
            image_url: "",
            likes: 10,
            retweets: 8,
            quotes: 2,
          },
          {
            id: 4,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Just tweeted!",
            createdAt: "2022-01-04T00:00:00Z",
            image_url: "",
            likes: 15,
            retweets: 12,
            quotes: 3,
          },
          {
            id: 5,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Another tweet.",
            createdAt: "2022-01-05T00:00:00Z",
            image_url: "",
            likes: 20,
            retweets: 18,
            quotes: 5,
          },
          {
            id: 6,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "More tweets coming!",
            createdAt: "2022-01-06T00:00:00Z",
            image_url: "",
            likes: 25,
            retweets: 22,
            quotes: 6,
          },
          {
            id: 7,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Tweeting away.",
            createdAt: "2022-01-07T00:00:00Z",
            image_url: "",
            likes: 30,
            retweets: 28,
            quotes: 7,
          },
          {
            id: 8,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Having fun on Twitter.",
            createdAt: "2022-01-08T00:00:00Z",
            image_url: "",
            likes: 35,
            retweets: 32,
            quotes: 8,
          },
          {
            id: 9,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Just another tweet.",
            createdAt: "2022-01-09T00:00:00Z",
            image_url: "",
            likes: 40,
            retweets: 38,
            quotes: 9,
          },
          {
            id: 10,
            image: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
            name: "Mock User",
            username: "rickgrimes",
            text: "Tweeting is fun!",
            createdAt: "2022-01-10T00:00:00Z",
            image_url: "",
            likes: 45,
            retweets: 42,
            quotes: 10,
          },
        ];
        setUserReplies(mockReplies);

        // const createdDate = new Date(userData.Created_at);
        // const formattedDate = createdDate.toLocaleString("en-US", {
        //   month: "long",
        //   year: "numeric",
        // });
        // setCreatedAt(formattedDate);

        if (userData?.User_Id) {
          // const profileData = {
          //   Profile_Type: "Public", // mock profile type
          //   Bio: "This is a mock bio.", // mock bio
          //   Location: "Mock City", // mock location
          //   Website: "https://mockwebsite.com", // mock website
          //   Img_Url: "https://cdn-icons-png.freepik.com/512/5951/5951752.png",
          //   Banner_Url:
          //     "https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/02/Usign-Gradients-Featured-Image.jpg",
          // };
          //setProfileDetails(profileData);
          // Count followers
          // const { data: followersData, error: followersError } = {
          //   data: [{ id: 1 }, { id: 2 }, { id: 3 }], // mock followers data
          //   error: null, // or some mock error
          // };
          // const followersCount = followersData.length;
          // setFollowerCount(followersData.length);
          // // Count following
          // const { data: followingData, error: followingError } = {
          //   data: [
          //     { id: 1 },
          //     { id: 2 },
          //     { id: 3 },
          //     ,
          //     { id: 4 },
          //     { id: 6 },
          //     { id: 5 },
          //   ], // mock following data
          //   error: null, // or some mock error
          // };
          // const followingCount = followingData.length;
          // setFollowingCount(followingData.length);
          //implement functionality to fetch current user's tweets: const { data: userTweets, error: tweetFetchError }
          //implement functionality to fetch retweets : const { data: replies, error: repliesError }
          //implement functionality to fetch likes :  const { data: userLikes, error: userLikesError }
          // setUserProfile((prevState: any) => ({
          //   ...prevState,
          //   followers: followerCount,
          //   following: followingCount,
          // }));
        } else {
          console.error("User data ID is undefined");
        }
      } catch (error) {
        console.error("Error fetching user profile:");
      }
    };

    fetchUserProfile();
  }, [activeTab]);

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
    return <div>Loading...</div>; // Render loading indicator until data is fetched
  }

  // const [isEditingProfileOpen, setIsEditingProfileOpen] = useState(false);

  // const handleEditProfileClose = () => {
  //   setIsEditingProfileOpen(false);
  // };

  // const handleEditProfileOpen = () => {
  //   setIsEditingProfileOpen(true);
  // };
  return (
    <div className="container flex">
      <div className="nav w-1/5 ml-20 mr-6">
        <Nav />
      </div>
      {/* BANNER */}
      <div className="main-content max-w-full m-0 p-0 border">
        <div className="flex min-w-full flex-col m-0 p-0 justify-center">
          <div className="banner">
            <img
              src={profileDetails.Banner_Url}
              alt="Banner"
              className="object-cover w-full h-48"
            />
          </div>
          {/* Profile  Header} */}
          <div className="profile-header bg-gray p-4 flex items-center">
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
                  <Button className="ml-auto ">
                    <IoMdSettings className="mr-1 "></IoMdSettings>Edit Profile
                  </Button>
                </NavLink>
                {/* Profile Details */}
                <div>
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
                </div>
                <div>
                  <div className="flex border-b border-gray-200">
                    <button
                      className={`px-4 py-2 text-sm font-semibold ${
                        activeTab === "tweets"
                          ? "text-blue-500 border-b-2 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleTabClick("tweets")}
                    >
                      Tweets
                    </button>

                    <button
                      className={`px-4 py-2 text-sm font-semibold ${
                        activeTab === "replies"
                          ? "text-blue-500 border-b-2 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleTabClick("replies")}
                    >
                      Tweets & replies
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-semibold ${
                        activeTab === "media"
                          ? "text-blue-500 border-b-2 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleTabClick("media")}
                    >
                      Media
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-semibold ${
                        activeTab === "likes"
                          ? "text-blue-500 border-b-2 border-blue-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleTabClick("likes")}
                    >
                      Likes
                    </button>
                  </div>
                  {activeTab === "tweets" && (
                    <div>
                      {userTweets.length === 0 ? (
                        <p className="text-center text-gray-500">
                          User hasn't tweeted yet
                        </p>
                      ) : (
                        userTweets.map((tweet, index) => (
                          <Tweet
                            key={index}
                            name={tweet.name}
                            username={tweet.username}
                            text={tweet.text}
                            imageUrl={tweet.image_url}
                            likes={tweet.likes}
                            retweets={tweet.retweets}
                            comments={1000}
                            saves={1000}
                            timeDisplay={getTimeDisplay(tweet.createdAt)}
                          />
                        ))
                      )}
                    </div>
                  )}
                  {activeTab === "media" && (
                    <div className="grid grid-cols-3 gap-1">
                      {userTweets.filter((tweet) => tweet.image_url !== "")
                        .length === 0 ? (
                        <p className="text-center text-gray-500">
                          No media to display
                        </p>
                      ) : (
                        userTweets
                          .filter((tweet) => tweet.image_url !== "")
                          .map((tweet, index) => (
                            <div key={index}>
                              <img
                                src={tweet.image_url}
                                alt="Tweet"
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))
                      )}
                    </div>
                  )}

                  {activeTab === "replies" && (
                    <div>
                      {userReplies.length === 0 ? (
                        <p className="text-center text-gray-500">
                          No replies to display
                        </p>
                      ) : (
                        userReplies.map((reply, index) => (
                          <Tweet
                            key={index}
                            name={reply.name}
                            username={reply.username}
                            text={reply.text}
                            imageUrl={reply.image_url}
                            likes={reply.likes}
                            retweets={reply.retweets}
                            comments={1000}
                            saves={1000}
                            timeDisplay={getTimeDisplay(reply.createdAt)}
                          />
                        ))
                      )}
                    </div>
                  )}
                </div>
                {activeTab === "likes" && (
                  <div>
                    {likedTweets.length === 0 ? (
                      <p className="text-center text-gray-500">
                        No liked Tweets to display
                      </p>
                    ) : (
                      likedTweets.map((tweet, index) => (
                        <Tweet
                          key={index}
                          name={tweet.name}
                          username={tweet.username}
                          text={tweet.text}
                          imageUrl={tweet.image_url}
                          likes={tweet.likes}
                          retweets={tweet.retweets}
                          comments={1000}
                          saves={1000}
                          timeDisplay={getTimeDisplay(tweet.createdAt)}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-right w-1/4 mr-32 ml-7 mt-2 pl-1 pr-2">
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
