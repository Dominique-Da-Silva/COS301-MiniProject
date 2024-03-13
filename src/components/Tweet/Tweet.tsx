import React from "react";
import "./Tweet.css";

interface TweetProps {
  name: string;
  username: string;
  text: string;
  imageUrl?: string;
}

const Tweet: React.FC<TweetProps> = ({ name, username, text, imageUrl }) => {
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
          <p>{username}</p>
        </div>
      </div>
      <p>{text}</p>
      {imageUrl && (
        <img src={imageUrl} alt="Tweet Image" className="tweet-image" />
      )}
      <div className="tweet-actions">
        {/* Render tweet actions (reply, retweet, like, share) */}
      </div>
    </div>
  );
};

export default Tweet;
