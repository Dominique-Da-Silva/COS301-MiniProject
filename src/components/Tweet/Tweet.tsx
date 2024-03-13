import React from "react";
import { FaRegComment } from "react-icons/fa"; // comment icon
import { MdSaveAlt } from "react-icons/md"; //save icon import
import { IoMdHeartEmpty } from "react-icons/io"; // heart icon import
import { AiOutlineRetweet } from "react-icons/ai"; // retweet icon
import "./Tweet.css";

interface TweetProps {
  name: string;
  username: string;
  text: string;
  imageUrl?: string;
  timeDisplay:string;
}

const Tweet: React.FC<TweetProps> = ({ name, username, text, imageUrl,timeDisplay }) => {
  return (
    <div className="tweet">
      <div className="user-info">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt="User Avatar"
          className="user-avatar"
        />
        <div>
          <h4>{name}</h4>
          <p>{username} · {timeDisplay}</p>
        </div>
      </div>
      <p>{text}</p>
      {imageUrl && (
        <img src={imageUrl} alt="Tweet Image" className="tweet-image" />
      )}
      <div className="tweet-actions">
        <span className="action"><FaRegComment /> xyz </span> {/* Reply icon */}
        <span className="action"><AiOutlineRetweet /> xyz </span> {/* Retweet icon */}
        <span className="action"><IoMdHeartEmpty /> xyz </span> {/* Like icon */}
        <span className="action"><MdSaveAlt /> xyz </span> {/* Share icon */}
      </div>
    </div>
  );
};

export default Tweet;
