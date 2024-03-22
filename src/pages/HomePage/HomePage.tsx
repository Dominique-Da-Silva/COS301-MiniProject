import { Tweet, TrendingTopics , WhoToFollow , SideNavbar , CreateTweet } from "@components/index";
// import React,{useState,useEffect} from "react";
import React,{useState} from "react";
//import {supabase} from '@config/supabase';
import "./HomePage.css";
import { mockTweets, mockUsers,mockSavesCount,mockCommentsCount,mockRetweetsCount,mockLikesCount } from '../../mockData/mockData';

interface HomePageProps {}

// const HomePage: React.FC<HomePageProps> = () => {
//   const [tweets, setTweets] = useState<any[]>({});
//   const [users,setUsers] = useState<any[]>({});
//   const [savesCount, setSavesCount] = useState<any>({});
//   const [commentsCount, setCommentsCount] = useState<any>({});
//   const [retweetsCount, setRetweetsCount] = useState<any>({});
//   const [likesCount, setLikesCount] = useState<any>({});
  
const HomePage: React.FC<HomePageProps> = () => {
  const [tweets] = useState<any[]>(mockTweets);
  const [users] = useState<any[]>(mockUsers);
  const [savesCount] = useState<any>(mockSavesCount);
  const [commentsCount] = useState<any>(mockCommentsCount);
  const [retweetsCount] = useState<any>(mockRetweetsCount);
  const [likesCount] = useState<any>(mockLikesCount);

  // FETCHING THE TWEETS FROM TWEETS TABLE
  // useEffect(() => {
    // const fetchTweets = async () => {
    //   try {
    //     const { data: tweetsData, error } = await supabase.from('Tweets').select('*');
    //     if (error) {
    //       throw error;
    //     }
    //     //console.log(tweetsData);
    //     setTweets(tweetsData);
    //   } catch (error) {
    //     console.error('Error fetching tweets:', error);
    //   }
    // };

    // FETCHING THE USERS FROM THE USER TABLE
    // const fetchUsers = async () => {
    //   try {
    //     const { data: usersData, error } = await supabase.from('User').select('*');
    //     if (error) {
    //       throw error;
    //     }
    //     //console.log(usersData);
    //     setUsers(usersData);
    //   } catch (error) {
    //     console.error('Error fetching users:', error);
    //   }
    // };

    // FETCHING & COUNTING THE NUMBER OF SAVES FOR INDIVIDUAL TWEET
    // const fetchSavesCount = async () => {
    //   try {
    //     const { data: savesCountData, error } = await supabase.from('Saves').select('*');
    //     if (error) {
    //       throw error;
    //     }
    //     console.log('Saves count data:', savesCountData);

    //     const countMap: { [key: number]: number } = {}; // Specify type annotation for countMap
    //     savesCountData.forEach(row => {
    //       const tweetId = row.Tweet_Id;
    //       if (tweetId in countMap) {
    //         countMap[tweetId]++;  
    //       } else {
    //         countMap[tweetId] = 1;
    //       }
    //     });
    //     setSavesCount(countMap);

    //   } catch (error) {
    //     console.error('Error fetching saves count:', error);
    //   }
    // };

    // // FETCHING & COUNTING THE NUMBER OF COMMENTS FOR INDIVIDUAL TWEET
    // const fetchCommentsCount = async () => {
    //   try {
    //     const { data: commentsCountData, error } = await supabase.from('Comments').select('*');
    //     if (error) {
    //       throw error;
    //     }
    //     console.log('Comments count data:', commentsCountData);

    //     const countMap: { [key: number]: number } = {}; // Specify type annotation for countMap
    //     commentsCountData.forEach(row => {
    //       const tweetId = row.Tweet_Id;
    //       if (tweetId in countMap) {
    //         countMap[tweetId]++;
    //       } else {
    //         countMap[tweetId] = 1;
    //       }
    //     });
    //     setCommentsCount(countMap);
    //   } catch (error) {
    //     console.error('Error fetching comments count:', error);
    //   }
    // };

    // // FETCHING & COUNTING THE NUMBER OF RETWEETS FOR INDIVIDUAL TWEET
    // const fetchRetweetsCount = async () => {
    //   try {
    //     const { data: retweetsCountData, error } = await supabase.from('Retweets').select('*');
    //     if (error) {
    //       throw error;
    //     }
    //     console.log('Retweets count data:', retweetsCountData);

    //     const countMap: { [key: number]: number } = {}; // Specify type annotation for countMap
    //     retweetsCountData.forEach(row => {
    //       const tweetId = row.Tweet_Id;
    //       if (tweetId in countMap) {
    //         countMap[tweetId]++;  
    //       } else {
    //         countMap[tweetId] = 1;
    //       }
    //     });
    //     setRetweetsCount(countMap);

    //   } catch (error) {
    //     console.error('Error fetching retweets count:', error);
    //   }
    // };


    // // FETCHING & COUNTING THE NUMBER OF LIKES FOR INDIVIDUAL TWEET
    // const fetchLikesCount = async () => {
    //   try {
    //     const { data: likesCountData, error } = await supabase.from('Likes').select('*');
    //     if (error) {
    //       throw error;
    //     }
    //     console.log('Likes count data:', likesCountData);

    //     const countMap: { [key: number]: number } = {}; // Specify type annotation for countMap
    //     likesCountData.forEach(row => {
    //       const tweetId = row.Tweet_Id;
    //       if (tweetId in countMap) {
    //         countMap[tweetId]++;  
    //       } else {
    //         countMap[tweetId] = 1;
    //       }
    //     });
    //     setLikesCount(countMap);

    //   } catch (error) {
    //     console.error('Error fetching likes count:', error);
    //   }
    // };

    // // Call both fetch functions when the component mounts
    // // fetchTweets();
    // // fetchUsers();
    // fetchSavesCount();
    // fetchCommentsCount();
    // fetchRetweetsCount();
    // fetchLikesCount();
  // }, []);
  
  const getTimeDisplay = (timestamp: string) => {
    const currentTime = new Date();
    const parsedTimestamp = new Date(timestamp);

  //   const timeDiff = currentTime.getTime() - parsedTimestamp.getTime(); // Get time difference in milliseconds
  //   const minutesDiff = Math.floor(timeDiff / 60000); // Convert milliseconds to minutes

  //   let timeDisplay;
  //   if (minutesDiff < 60) {
  //     timeDisplay = `${minutesDiff}m`;
  //   } else {
  //     const hoursDiff = Math.floor(minutesDiff / 60); // Convert minutes to hours
  //     if (hoursDiff < 24) timeDisplay = `${hoursDiff}h`;
  //     else {
  //       const month = parsedTimestamp.toLocaleString("en-us", {
  //         month: "short",
  //       });
  //       const day = parsedTimestamp.getDate();
  //       timeDisplay = `${month} ${day}`;
  //     }
  //   }

  //   return timeDisplay;
  // };

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

  // TWEET DISPLAY

const HomePage = () => {
  return (
    <div className="container flex">
      <div className="nav w-1/5 ml-24 mr-1">
        <Nav />
      </div>
      <div className="main-content max-w-full m-0 p-0 border">
        <div className="flex min-w-full flex-col m-0 p-0 justify-center">
          <Tabs 
            aria-label="Options" 
            variant="underlined"
            classNames={{
              tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider justify-center",
              cursor: "max-w-24 rounded-full h-1 bg-[#22d3ee]",
              tab: "max-w-full h-2 px-0 h-12",
              tabContent: "group-data-[selected=true]:text-[#000000] font-semibold"
            }}
          >
            <Tab
              title={
                <div className="flex items-center space-x-2">
                  <span>For you</span>
                </div>
              }
              className="text-md p-0"
            >
              <CreateTweet></CreateTweet>
              {/* {tweets.map(tweet => {
                const user = users.find(u => u.User_Id === tweet.User_Id); // Assuming there's a user_id in tweets data
                const saves = savesCount[tweet.Tweet_Id] || 0 ;
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
              })} */}
            </Tab>
            <Tab
              title={
                <div className="flex items-center space-x-2">
                  <span>Following</span>
                </div>
              }
              className="text-md"
            >
              <CreateTweet></CreateTweet>
            </Tab>
          </Tabs>
        </div>  
      </div>
      <div className="sidebar-right w-1/4 mr-28 ml-7 mt-2 pl-2">
        <div className="mb-3">
          <Search />
        </div>
        <TrendingTopics />
        {/* <WhoToFollow /> */}
      </div>
    </div>
  );
};

export default HomePage;
