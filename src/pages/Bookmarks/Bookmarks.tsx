import { isUserLoggedIn, getLoggedUserId, getBookmarkedTweets, fetchUsers } from '@services/index';
import { fetchAllProfiles } from "@services/profileServices/getProfile";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, Tweet, TrendingTopics , WhoToFollow, Search} from '@components/index';
import { mockTweets, mockUsers,mockSavesCount,mockCommentsCount,mockRetweetsCount,mockLikesCount } from '../../mockData/mockData';
import {useState} from "react";
  
const Bookmarks = () => {

  // const [tweets] = useState<any[]>(mockTweets);
  const [userid, setUserId] = useState<any[]>([]);
  const [tweets, setTweets] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [savesCount] = useState<any>(mockSavesCount);
  const [commentsCount] = useState<any>(mockCommentsCount);
  const [retweetsCount] = useState<any>(mockRetweetsCount);
  const [likesCount] = useState<any>(mockLikesCount);
  const navigate = useNavigate(); // Initialize useNavigate hook

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

  const formatCount = (count: number): string | number => {
    if (count < 1000) {
      return count; // Return as it is if less than 1000
    } else if (count < 1000000) {
      // Convert to K format
      return (count / 1000).toFixed(1) + "K";
    } else {
      // Convert to M format
      return (count / 1000000).toFixed(1) + "M";
    }
  };
  
  useEffect(() => {
    // this is necessary for checking if the user is signed in
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      if (!result) {
        navigate("/home"); // Redirect to home page if user is not logged in
      }
    }

    const fetchData = async () => {
      try {
        const usersData = await fetchUsers();
        // console.log("Users Data:");
        // console.log(usersData);
        setUsers(usersData as any[]); // Add type assertion here

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const getAllProfiles = async () => {
      try {
        const profilesData = await fetchAllProfiles();
        console.log("Profiles Data:");
        console.log(profilesData);
        setProfiles(profilesData as any); // Update the type of the state variable
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    const fetchTweets = async () => {
      try {
        const id = await getLoggedUserId();
        setUserId(id); // Set user ID state
        console.log(id);

        // Fetch tweets only if user ID is available
        if (id !== null) {
          const tweetData = await getBookmarkedTweets(id); // Pass the correct user ID
          setTweets(tweetData);
        }
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };
    // Call the async function
    checkUser();
    fetchData();
    getAllProfiles();
    fetchTweets();
  }, [navigate]);
  
  return (
    <div className="w-full h-full flex justify-center align-middle">
      <div className="container flex w-full justify-center dark:bg-black">
        <div className="nav flex justify-end w-1/5 m-0 p-0 mr-[2vh] pr-10">
          <Nav />
        </div>
        <div className="main-content flex w-2/5 m-0 p-0 border dark:border-neutral-800">
          <div className="flex flex-col m-0 p-0 justify-center">
            <h1 className="text-2xl font-bold p-4 dark:text-white">Bookmarks</h1>
            {/* <p className="p-4">This is the Bookmarks page content.</p>  */}
            {tweets.map(tweet => {
                const user = users.find(u => u.User_Id === tweet.User_Id);
                const saves = savesCount[tweet.Tweet_Id] || 0 ;
                const comments = commentsCount[tweet.Tweet_Id] || 0;
                const likes = likesCount[tweet.Tweet_Id] || 0;
                const retweets = retweetsCount[tweet.Tweet_Id] || 0;
                const image_url = profiles.find(p => p.User_Id === tweet.User_Id)?.Img_Url;
                return (
                  <Tweet
                    key={tweet.Tweet_Id}
                    name={user ? user.Name : "Unknown User"}
                    username={user ? `@${user.Username}` : ""}
                    text={tweet.Content}
                    imageUrl={tweet.Img_Url}
                    timeDisplay={getTimeDisplay(tweet.Created_at)}
                    likes={formatCount(likes)}
                    retweets={formatCount(retweets)}
                    saves={formatCount(saves)}
                    comments={formatCount(comments)}
                    bookmarked={true}
                    profileimageurl={image_url}
                  />
                );
              })}
          </div>
        </div>
        {/* Sidebar */}
        <div className="sidebar-right w-1/4 ml-7 mt-2 pl-1 pr-2">
          <div className="mb-3">
            <Search />
          </div>
          <TrendingTopics />
          <WhoToFollow users={[]} />
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
