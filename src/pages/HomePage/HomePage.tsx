import React from "react";
import Tweet from "../../components/Tweet/Tweet";
import TrendingTopics from "../../components/TrendingTopics/TrendingTopics";
import WhoToFollow from "../../components/WhoToFollow/WhoToFollow";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import CreateTweet from "../../components/CreateTweet/CreateTweet";
import "./HomePage.css";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="container">
      <SideNavbar />
      <div className="main-content">
        <CreateTweet />
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
      <div className="sidebar-right">
        <TrendingTopics />
        <WhoToFollow />
      </div>
    </div>
  );
};

export default HomePage;
