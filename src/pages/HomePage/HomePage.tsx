import React,{useState,useEffect} from "react";
import {supabase} from '@config/supabase';
import Tweet from "../../components/Tweet/Tweet";
import TrendingTopics from "../../components/TrendingTopics/TrendingTopics";
import WhoToFollow from "../../components/WhoToFollow/WhoToFollow";
import "./HomePage.css";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch tweets
    const fetchTweets = async () => {
      try {
        const { data: tweetsData, error } = await supabase.from('Tweets').select('*');
        if (error) {
          throw error;
        }
        console.log(tweetsData);
        setTweets(tweetsData);
      } catch (error) {
        console.error('Error fetching tweets:', error.message);
      }
    };

    // Fetch users
    const fetchUsers = async () => {
      try {
        const { data: usersData, error } = await supabase.from('User').select('*');
        if (error) {
          throw error;
        }
        console.log(usersData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    // Call both fetch functions when the component mounts
    fetchTweets();
    fetchUsers();
  }, []);
  
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
          <div className="tweet-input">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="User Avatar"></img>
            <input type="text" placeholder="What's happening?"></input>
            <button>Tweet</button>
          </div>
          {tweets.map(tweet => {
          const user = users.find(u => u.User_Id === tweet.User_Id); // Assuming there's a user_id in tweets data
          return (
            <Tweet
              key={tweet.Tweet_Id}
              name={user ? user.Name : 'Unknown User'}
              username={user ? `@${user.Username}` : ''}
              text={tweet.Content}
              imageUrl={tweet.Img_Url}
            />
          );
        })}
      </div>
      <div className="sidebar-right">
        <TrendingTopics />
        <WhoToFollow />
      </div>
    </div>
  );
};

export default HomePage;
