import React, { useState } from "react";
import { FaRegComment, FaComment } from "react-icons/fa";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import { LuRepeat2 } from "react-icons/lu";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
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
  bookmarked?: boolean;
}

const Tweet: React.FC<TweetProps> = ({
  name,
  username,
  text,
  imageUrl,
  profileimageurl,
  timeDisplay,
  likes,
  retweets,
  comments,
  saves,
  bookmarked,
}) => {
  const [commentColor, setCommentColor] = useState(false);
  const [retweetColor, setRetweetColor] = useState(false);
  const [likeColor, setLikeColor] = useState(false);
  const [bookmarkColor, setBookmarkColor] = useState(bookmarked || false);

  const [commentCount, setCommentCount] = useState(Number(comments) || 0);
  const [retweetCount, setRetweetCount] = useState(Number(retweets) || 0);
  const [likeCount, setLikeCount] = useState(Number(likes) || 0);
  const [saveCount, setSaveCount] = useState(Number(saves) || 0);

  const handleCommentClick = () => {
    setCommentColor((prevState) => !prevState);
    setCommentCount((prevCount) => (commentColor ? prevCount - 1 : prevCount + 1));
  };

  const handleRetweetClick = () => {
    setRetweetColor((prevState) => !prevState);
    setRetweetCount((prevCount) => (retweetColor ? prevCount - 1 : prevCount + 1));
  };

  const handleLikeClick = () => {
    setLikeColor((prevState) => !prevState);
    setLikeCount((prevCount) => (likeColor ? prevCount - 1 : prevCount + 1));
  };

  const handleBookmarkClick = () => {
    setBookmarkColor((prevState) => !prevState);
    setSaveCount((prevCount) => (bookmarkColor ? prevCount - 1 : prevCount + 1));
  };

  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
      <div className="avatar">
        <Avatar
          src={profileimageurl}
          alt="User Avatar"
          className="user-avatar min-w-12 min-h-12"
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
            className="font-semibold p-0 m-0 dark:text-white"
          >
            {name}&nbsp;
          </NavLink>
          <NavLink
            to={{
              pathname: `/profile/${username.substring(1)}`,
              //state: { username: username.substring(1) } -> is this valid, please verify
            }}
            className="text-slate-700 p-0 m-0 dark:text-gray-400"
          >
            @{username.substring(1)} &nbsp;· {timeDisplay}
          </NavLink>
        </div>
        <div>
          <p className="p-0 m-0 dark:text-white">{text}</p>
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
          <span
            className={`action flex items-center cursor-pointer ${
              commentColor ? "text-blue-500" : "hover:text-blue-500"
            }`}
            onClick={handleCommentClick}
          >
            {commentColor ? <FaComment className="w-4 h-4" /> : <FaRegComment className="w-4 h-4" />} &nbsp;{commentCount}{" "}
          </span>
          <span
            className={`action flex items-center cursor-pointer ${
              retweetColor ? "text-green-500" : "hover:text-green-500"
            }`}
            onClick={handleRetweetClick}
          >
            {retweetColor ? <LuRepeat2 className="w-4 h-4" /> : <LuRepeat2 className="w-4 h-4" />} &nbsp;{retweetCount}{" "}
          </span>
          <span
            className={`action flex items-center cursor-pointer ${
              likeColor ? "text-red-500" : "hover:text-red-500"
            }`}
            onClick={handleLikeClick}
          >
            {likeColor ? <PiHeartFill className="w-4 h-4" /> : <PiHeartBold className="w-4 h-4" />} &nbsp;{likeCount}{" "}
          </span>
          <span
            className={`action flex items-center cursor-pointer ${
              bookmarkColor ? "text-orange-500" : "hover:text-orange-500"
            }`}
            onClick={handleBookmarkClick}
          >
            {bookmarkColor ? (
              <FaBookmark className="w-4 h-4" />
            ) : (
              <FaRegBookmark className="w-4 h-4" />
            )}{" "}
            &nbsp;{saveCount}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
