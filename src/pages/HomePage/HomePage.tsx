import React, { useState, useEffect } from "react";
import { supabase } from "@config/supabase";
import Tweet from "../../components/Tweet/Tweet";
import TrendingTopics from "../../components/TrendingTopics/TrendingTopics";
import WhoToFollow from "../../components/WhoToFollow/WhoToFollow";
import "./HomePage.css";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [tweets, setTweets] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [savesCount, setSavesCount] = useState<any>({});
  const [commentsCount, setCommentsCount] = useState<any>({});
  const [retweetsCount, setRetweetsCount] = useState<any>({});
  const [likesCount, setLikesCount] = useState<any>({});

  // FETCHING THE TWEETS FROM TWEETS TABLE
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const { data: tweetsData, error } = await supabase
          .from("Tweets")
          .select("*");
        if (error) {
          throw error;
        }
        //console.log(tweetsData);
        setTweets(tweetsData);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    // FETCHING THE USERS FROM THE USER TABLE
    const fetchUsers = async () => {
      try {
        const { data: usersData, error } = await supabase
          .from("User")
          .select("*");
        if (error) {
          throw error;
        }
        //console.log(usersData);
        if (usersData) {
          setUsers(usersData);
        }else{
          console.log("No users found");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // FETCHING & COUNTING THE NUMBER OF SAVES FOR INDIVIDUAL TWEET
    const fetchSavesCount = async () => {
      try {
        const { data: savesCountData, error } = await supabase
          .from("Saves")
          .select("*");
        if (error) {
          throw error;
        }
        console.log("Saves count data:", savesCountData);

        const countMap: { [key: number]: number } = {}; // Specify type annotation for countMap
        savesCountData.forEach((row) => {
          const tweetId = row.Tweet_Id;
          if (tweetId in countMap) {
            countMap[tweetId]++;
          } else {
            countMap[tweetId] = 1;
          }
        });
        setSavesCount(countMap);
      } catch (error) {
        console.error("Error fetching saves count:", error);
      }
    };

    // FETCHING & COUNTING THE NUMBER OF COMMENTS FOR INDIVIDUAL TWEET
    const fetchCommentsCount = async () => {
      try {
        const { data: commentsCountData, error } = await supabase
          .from("Comments")
          .select("*");
        if (error) {
          throw error;
        }
        console.log("Comments count data:", commentsCountData);

        const countMap: { [key: number]: number } = {}; // Specify type annotation for countMap
        commentsCountData.forEach((row) => {
          const tweetId = row.Tweet_Id;
          if (tweetId in countMap) {
            countMap[tweetId]++;
          } else {
            countMap[tweetId] = 1;
          }
        });
        setCommentsCount(countMap);
      } catch (error) {
        console.error("Error fetching comments count:", error);
      }
    };

    // FETCHING & COUNTING THE NUMBER OF RETWEETS FOR INDIVIDUAL TWEET
    const fetchRetweetsCount = async () => {
      try {
        const { data: retweetsCountData, error } = await supabase
          .from("Retweets")
          .select("*");
        if (error) {
          throw error;
        }
        console.log("Retweets count data:", retweetsCountData);

        const countMap: { [key: number]: number } = {}; // Specify type annotation for countMap
        retweetsCountData.forEach((row) => {
          const tweetId = row.Tweet_Id;
          if (tweetId in countMap) {
            countMap[tweetId]++;
          } else {
            countMap[tweetId] = 1;
          }
        });
        setRetweetsCount(countMap);
      } catch (error) {
        console.error("Error fetching retweets count:", error);
      }
    };

    // FETCHING & COUNTING THE NUMBER OF LIKES FOR INDIVIDUAL TWEET
    const fetchLikesCount = async () => {
      try {
        const { data: likesCountData, error } = await supabase
          .from("Likes")
          .select("*");
        if (error) {
          throw error;
        }
        console.log("Likes count data:", likesCountData);

        const countMap: { [key: number]: number } = {}; // Specify type annotation for countMap
        likesCountData.forEach((row) => {
          const tweetId = row.Tweet_Id;
          if (tweetId in countMap) {
            countMap[tweetId]++;
          } else {
            countMap[tweetId] = 1;
          }
        });
        setLikesCount(countMap);
      } catch (error) {
        console.error("Error fetching likes count:", error);
      }
    };

    // Call both fetch functions when the component mounts
    fetchTweets();
    fetchUsers();
    fetchSavesCount();
    fetchCommentsCount();
    fetchRetweetsCount();
    fetchLikesCount();
  }, []);

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

  // TWEET DISPLAY
  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-item">
          <svg viewBox="0 0 24 24"></svg>
          Home
        </div>
        <div className="sidebar-item">
          <svg viewBox="0 0 24 24"></svg>
          Explore
        </div>
        <div className="sidebar-item">
          <svg viewBox="0 0 24 24"></svg>
          Notifications
        </div>
        <div className="sidebar-item">
          <svg viewBox="0 0 24 24"></svg>
          Bookmarks
        </div>
        <div className="sidebar-item">
          <svg viewBox="0 0 24 24"></svg>
          Profile
        </div>
        <div className="sidebar-item">
          <svg viewBox="0 0 24 24"></svg>
          More
        </div>
      </div>
      <div className="main-content">
        <div className="tweet-input">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="User Avatar"
          ></img>
          <input type="text" placeholder="What's happening?"></input>
          <button>Tweet</button>
        </div>
        {tweets.map((tweet) => {
          const user = users.find((u) => u.User_Id === tweet.User_Id); // Assuming there's a user_id in tweets data
          const saves = savesCount[tweet.Tweet_Id] || 0;
          const comments = commentsCount[tweet.Tweet_Id] || 0;
          const likes = likesCount[tweet.Tweet_Id] || 0;
          const retweets = retweetsCount[tweet.Tweet_Id] || 0;
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
            />
          );
        })}
      </div>
      <div className="sidebar-right">
        <TrendingTopics />
        <WhoToFollow />
      </div>
    </div>
  );
};

export default HomePage;
