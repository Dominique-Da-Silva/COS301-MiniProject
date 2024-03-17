import React from 'react';
import './TrendingTopics.css';

interface TrendingTopicsProps {}

const TrendingTopics: React.FC<TrendingTopicsProps> = () => {
  return (
    <div className="trending-topics">
        <h3>What's happening</h3>
        <div className="trending-topic">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Trending Topic Icon"></img>
          <div>
            <h4>COVID19 · Last night</h4>
            <p>England's Chief Medical Officer says the UK is at the most "dangerous" time of the pandemic.</p>
          </div>
        </div>
        <div className="trending-topic">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Trending Topic Icon"></img>
          <div>
            <h4>US news · 4h ago</h4>
            <p>Parler may go offline following suspensions by Amazon, Apple and Google</p>
          </div>
        </div>
        <div className="trending-topic">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Trending Topic Icon"></img>
          <div>
            <h4>India · 1h ago</h4>
            <p>India vs Australia: India hold on to earn a draw on Day 5 in Sydney Test</p>
          </div>
        </div>
        <p>Show more</p>
      </div>
  );
};

export default TrendingTopics;