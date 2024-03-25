// import React from "react";
import { FaRegComment } from "react-icons/fa"; // comment icon
import { PiHeartBold } from "react-icons/pi";
import { LuRepeat2 } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa6";
import {Image} from "@nextui-org/react";
import {Avatar} from "@nextui-org/react";


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
    <div className="tweet flex border-t-1 m-0 p-4">
       <div className="avatar">
        <Avatar
          // src={imageUrl} // profile image url to be replaced
          alt="User Avatar"
          className="user-avatar min-w-12 min-h-12"
          // style={{ minWidth: '48px', minHeight: '48px' }}
        />
      </div>
      <div className="post flex-col w-full pl-2">
        <div className="user-info flex">   
            <p className="font-semibold p-0 m-0">{name}&nbsp;</p><p className="text-slate-700 p-0 m-0">{username} · {timeDisplay}</p>
        </div>
        <div>
          <p className="p-0 m-0">{text}</p> 
            {imageUrl && (
              <Image isZoomed src={imageUrl} alt="Tweet Image" className="tweet-image min-w-[520px] h-full" style={{ borderRadius: '10px' }} />
            )}
        </div>
        <div className="tweet-actions flex flex-row justify-around col text-slate-700">
          <span className="action flex items-center cursor-pointer hover:text-blue-500 "><FaRegComment className="w-4 h-4" /> &nbsp;{comments} </span> 
          <span className="action flex items-center cursor-pointer hover:text-green-500"><LuRepeat2 className="w-4 h-4"/> &nbsp;{retweets} </span> 
          <span className="action flex items-center cursor-pointer hover:text-red-500"><PiHeartBold className="w-4 h-4"/>&nbsp;{likes} </span> 
          <span className="action flex items-center cursor-pointer hover:text-blue-500"><FaRegBookmark className="w-4 h-4"/> &nbsp;{saves} </span> 
        </div>
      </div>



    </div>
  );
};

export default Tweet;
