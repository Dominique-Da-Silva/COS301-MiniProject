import { Nav, Tweet, TrendingTopics , WhoToFollow, Search} from '@components/index';
import { mockTweets, mockUsers,mockSavesCount,mockCommentsCount,mockRetweetsCount,mockLikesCount } from '../../mockData/mockData';
import React,{useState} from "react";
  
const Bookmarks = () => {

  const [tweets] = useState<any[]>(mockTweets);
  const [users] = useState<any[]>(mockUsers);
  const [savesCount] = useState<any>(mockSavesCount);
  const [commentsCount] = useState<any>(mockCommentsCount);
  const [retweetsCount] = useState<any>(mockRetweetsCount);
  const [likesCount] = useState<any>(mockLikesCount);

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

  return (
    <div className="conatiner flex">
      <div className="nav flex justify-end w-1/4 m-0 p-0 mr-[3vh] pr-10">
        <Nav />
      </div>
      <div className="main-content flex w-2/5 m-0 p-0 border">
        <div className="flex flex-col m-0 p-0 justify-center">
          <h1 className="text-2xl font-bold p-4">Bookmarks</h1>
          {/* <p className="p-4">This is the Bookmarks page content.</p>  */}
          {tweets.map(tweet => {
              const user = users.find(u => u.User_Id === tweet.User_Id);
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
                  bookmarked={true}
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

  );
};

export default Bookmarks;
