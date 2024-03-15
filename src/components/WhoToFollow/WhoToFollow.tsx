import React from 'react';
import './WhoToFollow.css';

interface WhoToFollowProps {}

const WhoToFollow: React.FC<WhoToFollowProps> = () => {
  return (
    <div className="who-to-follow">
    <h3>Who to follow</h3>
    <div className="follow-suggestion">
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="User Avatar"></img>
      <div>
        <h4>Bessie Cooper</h4>
        <p>@alessandroveroneschi</p>
      </div>
      <button>Follow</button>
    </div>
    <div className="follow-suggestion">
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="User Avatar"></img>
      <div>
        <h4>Jenny Wilson</h4>
        <p>@gabrielcantarin</p>
      </div>
      <button>Follow</button>
    </div>
    <p>Show more</p>
  </div>
  );
};

export default WhoToFollow;