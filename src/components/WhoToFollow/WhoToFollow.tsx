import React from 'react';
import './WhoToFollow.css';

interface WhoToFollowProps {}

const WhoToFollow: React.FC<WhoToFollowProps> = () => {
  return (
    <div className="who-to-follow">
      <h3>Who to follow</h3>
      {/* Render suggested users to follow */}
    </div>
  );
};

export default WhoToFollow;