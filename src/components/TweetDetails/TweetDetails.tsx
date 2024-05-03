import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Nav, TrendingTopics, Search, WhoToFollow, Tweet } from '@components/index';
import { getTweet } from '@services/index';
import { FaRegComment, FaComment } from "react-icons/fa";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import { LuRepeat2 } from "react-icons/lu";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { Image } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { NavLink, Link } from "react-router-dom";

const TweetDetailsPage = () => {
  const { tweetId = '0' } = useParams();
  const [tweetDetails, setTweetDetails] = useState<any>(null);

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

  useEffect(() => {
    const fetchTweetDetails = async () => {
      try {
        const tweet = await getTweet(parseInt(tweetId));
        setTweetDetails(tweet);
        // console.log(tweetId);
        // console.log(tweet);
      } catch (error) {
        console.error('Error fetching tweet details:', error);
      }
    };

    fetchTweetDetails();
  }, [tweetId]);
  console.log(tweetDetails?.name);
  
  return (
    <div className="w-full h-full flex justify-center align-middle">
      <div className="container flex w-full justify-center dark:bg-black">
        <div className="nav flex justify-end w-1/5 m-0 p-0 mr-[2vh] pr-10">
          <Nav />
        </div>
      <div className="main-content w-2/5 m-0 p-0 border dark:border-neutral-800 dark:bg-black">
        <div className="flex flex-col m-0 p-0 justify-center">
          <div>
            {tweetDetails ? ( 
              // <div className="avatar">
              //   <Avatar
              //     src={}
              //     alt="User Avatar"
              //     className="user-avatar min-w-12 min-h-12"
              //   />
              // </div>
              <div className="post flex-col w-full pl-2">
                <div className="user-info flex">
                  <NavLink
                    to={{
                      pathname: `/profile/${tweetDetails.username}`
                    }}
                    className="text-slate-700 p-0 m-0 dark:text-gray-400"
                  >
                    @{tweetDetails?.username} &nbsp;· {getTimeDisplay(tweetDetails?.created_at)}
                  </NavLink>
                </div>
                <div>
                  <p className="p-0 m-0 dark:text-white">{tweetDetails.content}</p>
                  {tweetDetails.img_url && (
                    <Image
                      src={tweetDetails.img_url}
                      alt="Tweet Image"
                      className="tweet-image w-auto h-full"
                      style={{ borderRadius: "10px" }}
                    />
                  )}
                </div>
              </div>
            ) : (
              <p>Loading tweet details...</p>
            )}
          </div>
        </div>
      </div>
      <div className="sidebar-right w-1/4 ml-7 mt-2 pl-1 pr-2 hidden md:block">
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

export default TweetDetailsPage;
