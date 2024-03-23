import { Tweet, TrendingTopics , WhoToFollow , Nav , Search, CreateTweet } from "@components/index";
// import React,{useState,useEffect} from "react";
//import React,{useState,useEffect} from "react";
import React,{useState} from "react";
//import {supabase} from '@config/supabase';
// import {Tabs, Tab} from "@nextui-org/react";
//import {supabase} from '@config/supabase'; 
import { mockTweets, mockUsers,mockSavesCount,mockCommentsCount,mockRetweetsCount,mockLikesCount } from '../../mockData/mockData';

interface HomePageProps {}

/*const HomePage: React.FC<HomePageProps> = () => {
  const [tweets, setTweets] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
*/
const HomePage: React.FC<HomePageProps> = () => {
const [tweets] = useState<any[]>(mockTweets);
const [users] = useState<any[]>(mockUsers);
const [savesCount] = useState<any>(mockSavesCount);
const [commentsCount] = useState<any>(mockCommentsCount);
const [retweetsCount] = useState<any>(mockRetweetsCount);
const [likesCount] = useState<any>(mockLikesCount);
  
//uncomment the following with the two useStates (setTweets and setUsers) for db access, useeffect and supabase imports
/*  useEffect(() => {
   //FETCHING THE TWEETS FROM TWEETS TABLE
   const fetchTweets = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('getTweets', {
        //this is part of the body of the http request that is passed into the function, I put it here
        // for post requests of making tweets and so forth
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (error) {
        throw error;
      }
  
      console.log(data); // Log the data to see the structure
      setTweets(data); // Assuming 'data' contains the tweets
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

    // FETCHING THE USERS FROM THE USER TABLE
     const fetchUsers = async () => {
      try {
         const { data: usersData, error } = await supabase.from('User').select('*');
         if (error) {
           throw error;
         }
         //console.log(usersData);
         setUsers(usersData);
      } catch (error) {
         console.error('Error fetching users:', error);
      }
     };
    // // Call both fetch functions when the component mounts
     fetchTweets();
     fetchUsers();
  }, []);*/
  
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

  // TWEET DISPLAY with mock data, scroll down for db acess tweet display

  return (
    <div className="container flex">
      <div className="nav w-1/5 ml-20 mr-6">
        <Nav />
      </div>
      <div className="main-content max-w-full m-0 p-0 border">
        <div className="flex min-w-full flex-col m-0 p-0 justify-center">
          {/* <Tabs 
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
            > */}
              <CreateTweet></CreateTweet>
               {tweets.map(tweet => {
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
              })}
            {/* </Tab>
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
            </Tabs> */}
      </div>  
      <WhoToFollow users={[]}/>
      </div>
    </div>
  );
  //TWEET DISPLAY with db acess
  /*
  return (
    <div className="container">
      <SideNavbar />
      <div className="main-content">
          <CreateTweet></CreateTweet>
          {tweets.map(tweet => {
          const user = users.find(u => u.User_Id === tweet.User_Id); // Assuming there's a user_id in tweets data
          return (
            <Tweet
              key={tweet.Tweet_Id}
              name={user ? user.Name : 'Unknown User'}
              username={user ? `@${user.Username}` : ''}
              text={tweet.Content}
              imageUrl={tweet.Img_Url}
              timeDisplay={getTimeDisplay(tweet.Created_at)}
              likes={formatCount(tweet.Likes[0].count)}
              retweets={formatCount(tweet.Retweets[0].count)}
              saves={formatCount(tweet.Saves[0].count)}
              comments={formatCount(tweet.Comments[0].count)}
            />
          );
        })}
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
  */
      }

export default HomePage;
