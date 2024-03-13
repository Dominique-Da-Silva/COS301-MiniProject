import React from "react";
import Tweet from "../../components/Tweet/Tweet";
import TrendingTopics from "../../components/TrendingTopics/TrendingTopics";
import WhoToFollow from "../../components/WhoToFollow/WhoToFollow";
import "./HomePage.css";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-item">
          <svg viewBox="0 0 24 24"></svg>
          Home
        </div>
        <div className="sidebar-item">
          <svg viewBox="0 0 24 24"></svg>
          Explore
        </div>
        <div className="sidebar-item">
          <svg viewBox="0 0 24 24"></svg>
          Notifications
        </div>
        <div className="sidebar-item">
          <svg viewBox="0 0 24 24"></svg>
          Bookmarks
        </div>
        <div className="sidebar-item">
          <svg viewBox="0 0 24 24"></svg>
          Profile
        </div>
        <div className="sidebar-item">
          <svg viewBox="0 0 24 24"></svg>
          More
        </div>
      </div>
      <div className="main-content">
        <div className="tweet-composer"> <div className="tweet-input">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="User Avatar"></img>
        <input type="text" placeholder="What's happening?"></input>
        <button>Tweet</button>
      </div>
      </div>
        <Tweet
          name="Devon Lane"
          username="@johndoe"
          text="Tom is in a big hurry."
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/d/de/Nokota_Horses_cropped.jpg"
        />
        <Tweet
          name="Darlene Robertson"
          username="@johndoe"
          text="Tom is in a big hurry."
          imageUrl="https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg"
        />
      </div>
      <div className="right-sidebar">
        <TrendingTopics />
        <WhoToFollow />
      </div>
    </div>
  );
};

export default HomePage;
