import React, { useState, useEffect } from 'react';
import { Nav, Search, Tweet, WhoToFollow } from '@components/index';
import TrendingListFull from '@components/TrendingListFull/TrendingListFull';
import { FiSettings } from "react-icons/fi";
import { getTrendingTopics } from '@services/index';
import { FaArrowLeft } from "react-icons/fa";
import { IoSearch } from 'react-icons/io5';
import { Tab, Tabs } from '@nextui-org/react';
import { mockTweets, mockUsers, mockSavesCount, mockCommentsCount, mockRetweetsCount, mockLikesCount } from '../../mockData/mockData';

interface ExplorePageProps { }

const Explore: React.FC<ExplorePageProps> = () => {
  const [tweets] = useState<any[]>(mockTweets);
  const [users] = useState<any[]>(mockUsers);
  const [savesCount] = useState<any>(mockSavesCount);
  const [commentsCount] = useState<any>(mockCommentsCount);
  const [retweetsCount] = useState<any>(mockRetweetsCount);
  const [likesCount] = useState<any>(mockLikesCount);
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showTabs, setShowTabs] = useState(false); // State to track if tabs should be shown
  

  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
  }; 

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

  const handleSearchFocus = () => {
    setIsFocused(true);
  };

  const handleSearchBlur = () => {
    setIsFocused(false);
  };

  const handleSearchKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      setShowTabs(true);
    }
  };

  return (
    <div className="w-full h-full flex justify-center align-middle">
      <div className="container flex w-full justify-center dark:bg-black">
        <div className="nav flex justify-end w-1/5 m-0 p-0 mr-[2vh] pr-10">
          <Nav />
        </div>
        <div className="main-content w-2/5 m-0 p-0 border dark:border-neutral-800 dark:bg-black">
          <div className='searchbar px-4 py-1 flex items-center justify-between w-full dark:bg-black'>
            <div className="flex justify-between items-center w-11/12">
              {isFocused || searchValue ? (
                <div onChange={handleSearchChange} onClick={handleSearchBlur} className='hover:bg-slate-200 p-3 mr-5 rounded-full cursor-pointer hover-t'>
                  <FaArrowLeft size={18} onClick={handleSearchBlur} />
                </div>
              ) : null}
              <div className={`flex bg-gray-100 dark:bg-neutral-900 py-2 focus:ring-2 rounded-full items-center pl-4 w-full ${isFocused || searchValue ? 'border border-sky-500' : 'border-gray-200'}`}>
                <IoSearch size={20} color={`${isFocused || searchValue ? 'rgb(14 165 233)' : 'gray'}`}/>&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  onKeyPress={handleSearchKeyPress}
                  placeholder="Search..."
                  className="w-full rounded-full bg-transparent outline-0 border-none text-lg"
                />
              </div>
            </div>
            <div>
              <FiSettings size={18} />
            </div>
          </div>
          {!showTabs && (
            <>
              <p className='pl-3 mt-1 text-[21px] font-bold dark:text-white'>Trends for you</p>
              <div className="flex flex-col m-0 p-0 justify-center dark:text-white">
                <TrendingListFull />
              </div>
            </>
          )}
          {showTabs && (
            <>
              <div className="flex flex-col m-0 p-0 justify-center">
                <Tabs variant="underlined" aria-label="Tabs variants"  classNames={{
                  tabList: "w-full relative rounded-none p-0 border-b border-divider flex",
                  cursor: "w-14 bg-sky-500 h-1 rounded-full",
                  tab: "px-0 m-0 h-12 font-semibold hover:bg-gray-200",
                  tabContent: "group-data-[selected=true]:text-black text-gray-500",
                }}>
                  <Tab key="Top" title="Top" className="p-0">
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
                  </Tab>
                  <Tab key="Latest" title="Latest" className="p-0"/>
                  <Tab key="People" title="People" className="p-0"/>
                  <Tab key="Media" title="Media" className="p-0"/>
                </Tabs>
              </div>
            </>
          )}
        </div>
        <div className="sidebar-right w-1/4 ml-7 mt-2 pl-1 pr-2 dark:bg-black">
          <div className="mb-3">
            <Search />
          </div>
          <WhoToFollow users={[]} />
        </div>
      </div>
    </div>
  );
};

export default Explore;
