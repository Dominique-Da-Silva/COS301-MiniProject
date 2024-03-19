import React from "react";
import { FaRegComment } from "react-icons/fa"; // comment icon
import { MdSaveAlt } from "react-icons/md"; //save icon import
import { PiHeartBold } from "react-icons/pi";
import { LuRepeat2 } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa6";
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/react";


interface TweetProps {
  name: string;
  username: string;
  text: string;
  imageUrl?: string;
  timeDisplay:string;
  likes?: number | string;
  retweets?: number| string ;
  comments?: number|string ;
  saves?: number|string;
}

const Tweet: React.FC<TweetProps> = ({name, username, text, imageUrl, timeDisplay, likes, retweets, comments, saves,}) => {
  return (
    <div className="tweet flex border">
      <div className="avatar p-3">
        <Avatar
          src={imageUrl} // profile image url to be replaced
          alt="User Avatar"
          className="user-avatar min-w-12 min-h-12 p"
          // style={{ minWidth: '48px', minHeight: '48px' }}
        />
      </div>
      <div className="post flex-col w-full">
        <div className="user-info flex-col gap-3 p-3">   
          <div className="flex">
            <h4 className="font-semibold">{name}&nbsp;</h4>
            <p className="text-slate-700">{username} · {timeDisplay}</p>
          </div>
          <p>{text}</p>
            {imageUrl && (
              <img src={imageUrl} alt="Tweet Image" className="tweet-image" style={{ borderRadius: '10px' }} />
            )}
        </div>
        <div className="tweet-actions flex flex-row justify-around col text-slate-700">
          <span className="action flex items-center cursor-pointer hover:text-blue-500 "><FaRegComment className="w-4 h-4" /> &nbsp;{comments} </span> {/* Reply icon */}
          <span className="action flex items-center cursor-pointer hover:text-green-500"><LuRepeat2 className="w-4 h-4"/> &nbsp;{retweets} </span> {/* Retweet icon */}
          <span className="action flex items-center cursor-pointer hover:text-red-500"><PiHeartBold className="w-4 h-4"/>&nbsp;{likes} </span> {/* Like icon */}
          <span className="action flex items-center cursor-pointer hover:text-blue-500"><FaRegBookmark className="w-4 h-4"/> &nbsp;{saves} </span> {/* Share icon */}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
