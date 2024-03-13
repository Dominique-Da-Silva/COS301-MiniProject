import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import TrendingTopics from "../../components/TrendingTopics/TrendingTopics";
import WhoToFollow from "../../components/WhoToFollow/WhoToFollow";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import CreateTweet from "../../components/CreateTweet/CreateTweet";
import Tweet from "../../components/Tweet/Tweet";
import { supabase } from "@config/supabase"; // Import supabase client


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

const ProfilePage: React.FC<ProfileProps> = () => {
  const [userProfile, setUserProfile] = useState<any>(null); // State to store user profile

  useEffect(() => {
    // Function to fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser(); // Get current logged-in user
        console.log(user);
        if (user) {
          const { data, error } = await supabase
            .from("User")
            .select()
            .eq("auth_id", user?.id)
            .single(); // Fetch user profile data from 'profiles' table where user_id matches
          if (error) {
            throw error;
          }
          console.log(data);
          setUserProfile(data); // Set user profile data in state
        }
      } catch (error) {
        console.error("Error fetching user profile:", (error as any).message);
      }
    };

    fetchUserProfile(); // Call the fetchUserProfile function when component mounts
  }, []);

  return (
    <div className="profile-page">
      <SideNavbar />
      <div className="main-content">
        {userProfile && ( // Check if userProfile state has data
          <div>
            <div className="profile-header">
              <img src={userProfile.cover_picture} alt="Cover" className="cover-picture" />
              <div className="profile-info">
                <img
                  src={userProfile.profile_picture}
                  alt="Profile"
                  className="profile-picture"
                />
                <h2>{userProfile.Name}</h2>
                <h3>{userProfile.Username}</h3>
              </div>
            </div>
            <div className="profile-details">
            <h3>Product Designer</h3>
              <p>
               . {userProfile.location} . Joined {userProfile.Created_at}
              </p>
              <p>
                <span>{userProfile.following} Following</span>{" "}
                <span>{userProfile.followers} Followers</span>
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
        )}
      </div>
      <div className="side-content">
        <TrendingTopics />
        <WhoToFollow />
      </div>
    </div>
  );
};

export default ProfilePage;
