import React from "react";
import { FaRegComment } from "react-icons/fa"; // comment icon
import { MdSaveAlt } from "react-icons/md"; //save icon import
import { IoMdHeartEmpty } from "react-icons/io"; // heart icon import
import { AiOutlineRetweet } from "react-icons/ai"; // retweet icon
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
    <div className="tweet border">
      <div className="user-info flex gap-3 p-3">
        <Avatar
          src={imageUrl} // profile image url to be replaced
          alt="User Avatar"
          className="user-avatar min-w-12 min-h-12"
          // style={{ minWidth: '48px', minHeight: '48px' }}
        />
          <div className="info-block flex-col">
            <div className="flex">
              <h4 className="font-semibold">{name}&nbsp;</h4>
              <p className="text-slate-700">{username} · {timeDisplay}</p>
            </div>
            <p>{text}</p><br />
              {imageUrl && (
                <img src={imageUrl} alt="Tweet Image" className="tweet-image" style={{ borderRadius: '10px' }} />
              )}
        
              {/* ICOONS */}
            <div className="tweet-actions flex gap-10">
              <span className="action flex"><FaRegComment /> {comments} </span> {/* Reply icon */}
              <span className="action flex"><AiOutlineRetweet /> {retweets} </span> {/* Retweet icon */}
              <span className="action flex"><IoMdHeartEmpty /> {likes} </span> {/* Like icon */}
              <span className="action flex"><MdSaveAlt /> {saves} </span> {/* Share icon */}
            </div>
          </div>
      </div>
    </div>
  );
};

export default Tweet;
