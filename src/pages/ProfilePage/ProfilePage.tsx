import React, { useState, useEffect, Suspense } from "react";
import "./ProfilePage.css";
import TrendingTopics from "../../components/TrendingTopics/TrendingTopics";
import WhoToFollow from "../../components/WhoToFollow/WhoToFollow";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import Tweet from "../../components/Tweet/Tweet";
import { supabase } from "@config/supabase"; // Import supabase client

const ProfileDetails = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileDetails, setProfileDetails] = useState<any>(null);
  const [Created_at, setCreated_at] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: userData, error: userError } = await supabase
            .from("User")
            .select()
            .eq("auth_id", user?.id)
            .single();
          if (userError) {
            throw userError;
          }
          setUserProfile(userData);
          const createdDate = new Date(userData.Created_at);
          const formattedDate = createdDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
          setCreated_at(formattedDate);
          
          if (userData?.User_Id) {
            const { data: profileData, error: profileError } = await supabase
              .from("Profile")
              .select()
              .eq("User_Id", userData.User_Id)
              .single();
            if (profileError) {
              throw profileError;
            }
            setProfileDetails(profileData);
          } else {
            console.error("User data ID is undefined");
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", (error as any).message);
      }
    };
    
    fetchUserProfile();
  }, []);

  if (!profileDetails || !userProfile) {
    return <div>Loading...</div>; // Render loading indicator until data is fetched
  }

  return (
    <div className="profile-page">
      <SideNavbar />
      <div className="main-content">
        <div className="profile-header">
          <img src={profileDetails.Banner_Url} alt="Cover" className="cover-picture" />
          <div className="profile-info">
            <img
              src={profileDetails.Img_Url}
              alt="Profile"
              className="profile-picture"
            />
            <h2>{userProfile.Name}</h2>
            <h3>{userProfile.Username}</h3>
          </div>
        </div>
        <div className="profile-details">
          <h3>{profileDetails.Profile_Type}</h3>
          <p>{profileDetails.Bio}</p>
          <p>
            . {userProfile.location} . Joined {Created_at}
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
      <div className="side-content">
        <TrendingTopics />
        <WhoToFollow />
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileDetails />
    </Suspense>
  );
};

export default ProfilePage;
