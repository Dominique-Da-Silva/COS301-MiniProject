import React, { useState, useEffect } from 'react';
import { Nav, Search, Tweet, WhoToFollow } from '@components/index';
import TrendingListFull from '@components/TrendingListFull/TrendingListFull';
import { FiSettings } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { Avatar } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { IoSearch } from 'react-icons/io5';
import { Tab, Tabs } from '@nextui-org/react';
import { searchUsers, fetchUsers } from '@services/index';
import { fetchAllProfiles } from "@services/profileServices/getProfile";
import { searchTweet } from '@services/index';
import { mockTweets, mockUsers, mockSavesCount, mockCommentsCount, mockRetweetsCount, mockLikesCount } from '../../mockData/mockData';

interface ExplorePageProps { }

interface User {
  UserName: string;
  Name: string;
  Surname: string;
}

const Explore: React.FC<ExplorePageProps> = () => {
  const [tweets] = useState<any[]>(mockTweets);
  // const [users] = useState<any[]>(mockUsers);
  const [searchResultshandles, setSearchResultshandles] = useState<any[]>([]); // State to store search results
  const [searchResultstweets, setSearchResultstweets] = useState<any[]>([]); // State to store search results
  const [profiles, setProfiles] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [savesCount] = useState<any>(mockSavesCount);
  const [commentsCount] = useState<any>(mockCommentsCount);
  const [retweetsCount] = useState<any>(mockRetweetsCount);
  const [likesCount] = useState<any>(mockLikesCount);
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showTabs, setShowTabs] = useState(false); // State to track if tabs should be shown

  useEffect(() => {
    const getAllProfiles = async () => {
      try {
        const profilesData = await fetchAllProfiles();
        // console.log("Profiles Data:");
        // console.log(profilesData);
        setProfiles(profilesData as any); // Update the type of the state variable
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

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
    fetchData();
    getAllProfiles();
  },[]);

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

  const removetabs = () => {
    setShowTabs(false);
    setIsFocused(false);
    setSearchValue('');
  };

  const handleSearchKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      setShowTabs(true);
      getResultsHandles(searchValue);
      getResultsTweets(searchValue);
    }
    console.log(searchResultshandles);
  };


  const getResultsHandles = async (searchValue) => {
    try {
      const results = await searchUsers(searchValue);
      // console.log('Results:', results); // Check the results in the console
      setSearchResultshandles(results);
    } catch (error) {
      console.error('Error fetching handles:', error);
    }
  }

  const getResultsTweets = async (searchValue) => {
    try {
      const results = await searchTweet(searchValue);
      // console.log('Results:', results); // Check the results in the console
      setSearchResultstweets(results);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  }

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
                <div onChange={handleSearchChange} onClick={removetabs} className='hover:bg-slate-200 p-3 mr-5 rounded-full cursor-pointer hover-t'>
                  <FaArrowLeft size={18} onClick={removetabs} />
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
                  className="w-full bg-transparent outline-0 border-none text-lg"
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
                    {searchResultshandles?.length > 0 && (
                      <div className="no-tweets pl-4 py-3 text-black">
                        <p className="font-bold text-2xl dark:text-white">People</p>
                      </div>
                    )}
                  {searchResultshandles?.slice(0, 3).map((handle: User) => (
                      <div className="tweet w-full flex hover:bg-neutral-200 cursor-pointer m-0 p-4 dark:border-neutral-800">
                      <div className="avatar">
                        <Avatar
                          src={handle.img_url}
                          alt="User Avatar"
                          className="user-avatar min-w-12 min-h-12"
                        />
                      </div>
                      <div className="w-full flex flex-col align pl-2 align-middle">
                        <div className="p-0 m-0 h-5">
                          <NavLink
                            to={{
                              pathname: `/profile/${handle.username.substring(1)}`, //sets the url path
                              //state: { username: username.substring(1) } //passes the state -> is this valid, please verify
                              /*
                              To retrieve this data when navigating to the next page:
                              import { useLocation } from 'react-router-dom';
                              const ProfileComponent = () => {
                                const location = useLocation();
                                const username = location.state?.username;
                  
                                // Use the username to render the profile
                              };
                              */
                            }}
                            className="font-semibold p-0 m-0 dark:text-white"
                          >
                            {handle.name}
                          </NavLink>
                        </div>
                        <div className="p-0 m-0 h-5">
                          <NavLink
                            to={{
                              pathname: `/profile/${handle.username.substring(1)}`,
                              //state: { username: username.substring(1) } -> is this valid, please verify
                            }}
                            className="text-slate-700 p-0 m-0 dark:text-gray-400"
                          >
                            @{handle.username}
                          </NavLink>
                        </div>     
                        <div>
                          <p className="p-0 m-0 dark:text-white">{handle.bio}</p>
                        </div>             
                      </div>
                    </div>
                    ))}
                    {searchResultstweets?.map(tweet => {
                      // console.log("Tweet:", tweet);
                      // console.log("Users:", users);
                      const user = users.find(u => u.User_Id === tweet.User_Id); // Assuming there's a user_id in tweets data
                      // console.log("User:", user);

                      // Check if tweet.Saves is defined and not empty before accessing its properties
                      const saves = tweet.Saves && tweet.Saves.length > 0 ? tweet.Saves[0]?.count || 0 : 0;
                      // console.log("Saves Count:", saves);

                      // Similar checks for Comments, Likes, and Retweets
                      const comments = tweet.Comments && tweet.Comments.length > 0 ? tweet.Comments[0]?.count || 0 : 0;
                      // console.log("Comments Count:", comments);

                      const likes = tweet.Likes && tweet.Likes.length > 0 ? tweet.Likes[0]?.count || 0 : 0;
                      // console.log("Likes Count:", likes);

                      const retweets = tweet.Retweets && tweet.Retweets.length > 0 ? tweet.Retweets[0]?.count || 0 : 0;
                      // console.log("Retweets Count:", retweets);

                      const image_url = profiles.find(p => p.User_Id === tweet.User_Id)?.Img_Url;
                      // console.log("Image URL:", image_url);

                      return (
                        <Tweet
                          key={tweet.Tweet_Id}
                          name={user ? user.Name : "Unknown User"}
                          username={user ? `@${user.Username}` : ""}
                          text={tweet.content}
                          imageUrl={tweet.image}
                          timeDisplay={getTimeDisplay(tweet.created)}
                          likes={formatCount(likes)}
                          retweets={formatCount(retweets)}
                          saves={formatCount(saves)}
                          comments={formatCount(comments)}
                          profileimageurl={image_url}
                        />
                      );
                    })}
                    {/* {searchResultstweets?.length === 0 && (
                      <div className="no-tweets text-center p-8 text-black">
                        <p className="font-bold text-4xl dark:text-white">No results for"{searchValue}"</p>
                      </div>
                    )} */}
                  </Tab>
                  <Tab key="Latest" title="Latest" className="p-0">
                    {searchResultstweets?.map(tweet => {
                      // console.log("Tweet:", tweet);
                      // console.log("Users:", users);
                      const user = users.find(u => u.User_Id === tweet.User_Id); // Assuming there's a user_id in tweets data
                      // console.log("User:", user);

                      // Check if tweet.Saves is defined and not empty before accessing its properties
                      const saves = tweet.Saves && tweet.Saves.length > 0 ? tweet.Saves[0]?.count || 0 : 0;
                      // console.log("Saves Count:", saves);

                      // Similar checks for Comments, Likes, and Retweets
                      const comments = tweet.Comments && tweet.Comments.length > 0 ? tweet.Comments[0]?.count || 0 : 0;
                      // console.log("Comments Count:", comments);

                      const likes = tweet.Likes && tweet.Likes.length > 0 ? tweet.Likes[0]?.count || 0 : 0;
                      // console.log("Likes Count:", likes);

                      const retweets = tweet.Retweets && tweet.Retweets.length > 0 ? tweet.Retweets[0]?.count || 0 : 0;
                      // console.log("Retweets Count:", retweets);

                      const image_url = profiles.find(p => p.User_Id === tweet.User_Id)?.Img_Url;
                      // console.log("Image URL:", image_url);

                      return (
                        <Tweet
                          key={tweet.Tweet_Id}
                          name={user ? user.Name : "Unknown User"}
                          username={user ? `@${user.Username}` : ""}
                          text={tweet.content}
                          imageUrl={tweet.image}
                          timeDisplay={getTimeDisplay(tweet.created)}
                          likes={formatCount(likes)}
                          retweets={formatCount(retweets)}
                          saves={formatCount(saves)}
                          comments={formatCount(comments)}
                          profileimageurl={image_url}
                        />
                      );
                    })}
                    {searchResultstweets?.length === 0 && (
                      <div className="no-tweets text-center p-8 text-black">
                        <p className="font-bold text-4xl dark:text-white">No results for"{searchValue}"</p>
                      </div>
                    )}
                  </Tab>
                  <Tab key="People" title="People" className="p-0">
                    {searchResultshandles?.map((handle: User) => (
                      <div className="tweet w-full flex border-b hover:bg-neutral-200 cursor-pointer m-0 p-4 dark:border-neutral-800">
                      <div className="avatar">
                        <Avatar
                          src={handle.img_url}
                          alt="User Avatar"
                          className="user-avatar min-w-12 min-h-12"
                        />
                      </div>
                      <div className="w-full flex flex-col align pl-2 align-middle">
                        <div className="p-0 m-0 h-5">
                          <NavLink
                            to={{
                              pathname: `/profile/${handle.username.substring(1)}`, //sets the url path
                              //state: { username: username.substring(1) } //passes the state -> is this valid, please verify
                              /*
                              To retrieve this data when navigating to the next page:
                              import { useLocation } from 'react-router-dom';
                              const ProfileComponent = () => {
                                const location = useLocation();
                                const username = location.state?.username;
                  
                                // Use the username to render the profile
                              };
                              */
                            }}
                            className="font-semibold p-0 m-0 dark:text-white"
                          >
                            {handle.name}
                          </NavLink>
                        </div>
                        <div className="p-0 m-0 h-5">
                          <NavLink
                            to={{
                              pathname: `/profile/${handle.username.substring(1)}`,
                              //state: { username: username.substring(1) } -> is this valid, please verify
                            }}
                            className="text-slate-700 p-0 m-0 dark:text-gray-400"
                          >
                            @{handle.username}
                          </NavLink>
                        </div>     
                        <div>
                          <p className="p-0 m-0 dark:text-white">{handle.bio}</p>
                        </div>             
                      </div>
                    </div>
                    ))}
                    {searchResultshandles?.length === 0 && (
                      <div className="no-tweets text-center p-8 text-black">
                        <p className="font-bold text-4xl dark:text-white">No results for"{searchValue}"</p>
                      </div>
                    )}
                  </Tab>
                  <Tab key="Media" title="Media" className="p-0">
                    {searchResultstweets?.map(tweet => {
                        // console.log("Tweet:", tweet);
                        // console.log("Users:", users);
                        const user = users.find(u => u.User_Id === tweet.User_Id); // Assuming there's a user_id in tweets data
                        // console.log("User:", user);

                        // Check if tweet.Saves is defined and not empty before accessing its properties
                        const saves = tweet.Saves && tweet.Saves.length > 0 ? tweet.Saves[0]?.count || 0 : 0;
                        // console.log("Saves Count:", saves);

                        // Similar checks for Comments, Likes, and Retweets
                        const comments = tweet.Comments && tweet.Comments.length > 0 ? tweet.Comments[0]?.count || 0 : 0;
                        // console.log("Comments Count:", comments);

                        const likes = tweet.Likes && tweet.Likes.length > 0 ? tweet.Likes[0]?.count || 0 : 0;
                        // console.log("Likes Count:", likes);

                        const retweets = tweet.Retweets && tweet.Retweets.length > 0 ? tweet.Retweets[0]?.count || 0 : 0;
                        // console.log("Retweets Count:", retweets);

                        const image_url = profiles.find(p => p.User_Id === tweet.User_Id)?.Img_Url;
                        // console.log("Image URL:", image_url);
                        if (tweet.image) {
                          return (
                            <Tweet
                              key={tweet.Tweet_Id}
                              name={user ? user.Name : "Unknown User"}
                              username={user ? `@${user.Username}` : ""}
                              text={tweet.content}
                              imageUrl={tweet.image}
                              timeDisplay={getTimeDisplay(tweet.created)}
                              likes={formatCount(likes)}
                              retweets={formatCount(retweets)}
                              saves={formatCount(saves)}
                              comments={formatCount(comments)}
                              profileimageurl={image_url}
                            />
                          );
                        }
                    })}
                  </Tab>
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
