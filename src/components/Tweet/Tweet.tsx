import React from "react";
import { FaRegComment } from "react-icons/fa";
import { PiHeartBold } from "react-icons/pi";
import { LuRepeat2 } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa6";
import { Image } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

interface TweetProps {
  name: string;
  username: string;
  text: string;
  imageUrl?: string;
  profileimageurl?: string;
  timeDisplay: string;
  likes?: number | string;
  retweets?: number | string;
  comments?: number | string;
  saves?: number | string;
}

const Tweet: React.FC<TweetProps> = ({ name, username, text, imageUrl, profileimageurl, timeDisplay, likes, retweets, comments, saves, }) => {
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4">
      <div className="avatar">
        <Avatar
          src={profileimageurl} // profile image url to be replaced
          alt="User Avatar"
          className="user-avatar min-w-12 min-h-12"
        // style={{ minWidth: '48px', minHeight: '48px' }}
        />
      </div>
      <div className="post flex-col w-full pl-2">

        <div className="user-info flex">
          <NavLink
            to={{
              pathname: `/profile/${username.substring(1)}`, //sets the url path
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
            className="font-semibold p-0 m-0"
          >
            {name}&nbsp;
          </NavLink>
          <NavLink
            to={{
              pathname: `/profile/${username.substring(1)}`,
              //state: { username: username.substring(1) } -> is this valid, please verify
            }}
            className="text-slate-700 p-0 m-0"
          >
            @{username.substring(1)} &nbsp;· {timeDisplay}
          </NavLink>
        </div>

        <div>
          <p className="p-0 m-0">{text}</p>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Tweet Image"
              className="tweet-image w-auto h-full"
              style={{ borderRadius: "10px" }}
            />
          )}
        </div>
        <div className="tweet-actions flex flex-row justify-around col text-slate-700">
          <span className="action flex items-center cursor-pointer hover:text-blue-500 "><FaRegComment className="w-4 h-4" /> &nbsp;{comments}{" "}</span>
          <span className="action flex items-center cursor-pointer hover:text-green-500"><LuRepeat2 className="w-4 h-4" /> &nbsp;{retweets}{" "}</span>
          <span className="action flex items-center cursor-pointer hover:text-red-500"><PiHeartBold className="w-4 h-4" />&nbsp;{likes}{" "}</span>
          <span className="action flex items-center cursor-pointer hover:text-blue-500"><FaRegBookmark className="w-4 h-4" /> &nbsp;{saves}{" "}</span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
