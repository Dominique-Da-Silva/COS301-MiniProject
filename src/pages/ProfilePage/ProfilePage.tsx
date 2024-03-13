import React from "react";
import "./ProfilePage.css";
import TrendingTopics from "../../components/TrendingTopics/TrendingTopics";
import WhoToFollow from "../../components/WhoToFollow/WhoToFollow";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import CreateTweet from "../../components/CreateTweet/CreateTweet";
import Tweet from "../../components/Tweet/Tweet";

interface ProfileProps {
  name?: string;
  tweetCount?: number;
  profilePicture?: string;
  coverPicture?: string;
  username?: string;
  location?: string;
  joinDate?: string;
  following?: number;
  followers?: number;
  tweets?: {
    username: string;
    tweetTime: string;
    text: string;
    image: string;
    retweets: number;
    quoteTweets: number;
    likes: number;
  }[];
  suggestedUsers?: {
    name: string;
    username: string;
    profilePicture: string;
  }[];
  trends?: {
    title: string;
    description: string;
  }[];
}

const ProfilePage: React.FC<ProfileProps> = ({
  name = "Davide Biscuso",
  tweetCount = 9,
  profilePicture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  coverPicture = "https://media.istockphoto.com/id/160306021/photo/jeans-background-xxxl.webp?b=1&s=170667a&w=0&k=20&c=KfnwuxchS7dMXOADP4K_XafVq92RDNP4lCXdHe-JlaY=",
  username = "@biscuttu",
  location = "London",
  joinDate = "September 2011",
  following = 569,
  followers = 72,
  tweets = [
    {
      username: "Devon Lane",
      tweetTime: "23s",
      text: "Tom is in a big hurry.",
      image: "https://example.com/tweet-image.jpg",
      retweets: 61,
      quoteTweets: 12,
      likes: 6200,
    },
  ],
  suggestedUsers = [
    {
      name: "Bessie Cooper",
      username: "@alessandrovorenezi",
      profilePicture: "https://example.com/user1.jpg",
    },
    {
      name: "Jenny Wilson",
      username: "@gabrielcantarin",
      profilePicture: "https://example.com/user2.jpg",
    },
  ],
  trends = [
    {
      title: "COVID19",
      description:
        "England's Chief Medical Officer says the UK is at the most dangerous time of the pandemic",
    },
    {
      title: "US news",
      description:
        "Parler may go offline following suspensions by Amazon, Apple and Google",
    },
  ],
}) => {
  return (
    <div className="profile-page">
      <SideNavbar />
      <div className="main-content">
        <div className="profile-header">
          <img src={coverPicture} alt="Cover" className="cover-picture" />
          <div className="profile-info">
            <img
              src={profilePicture}
              alt="Profile"
              className="profile-picture"
            />
            <h2>{name}</h2>
            <h3>{username}</h3>
          </div>
        </div>
        <div className="profile-details">
          <h3>Product Designer</h3>
          <p>
            . {location} . Joined {joinDate}
          </p>
          <p>
            <span>{following} Following</span>{" "}
            <span>{followers} Followers</span>
          </p>
        </div>
        <div className="profile-tabs">
          <button className="active">Tweets</button>
          <button>Tweets & replies</button>
          <button>Media</button>
          <button>Likes</button>
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
      <div className="side-content">
        <TrendingTopics />
        <WhoToFollow />
      </div>
    </div>
  );
};

export default ProfilePage;
