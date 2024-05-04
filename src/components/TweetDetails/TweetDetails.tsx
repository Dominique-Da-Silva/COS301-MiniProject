import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Nav, TrendingTopics, Search, WhoToFollow} from '@components/index';
import { getComments, getTweet } from '@services/index';
import { FaRegComment, FaComment } from "react-icons/fa";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import { LuRepeat2 } from "react-icons/lu";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { Image } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import CreateCommentInput from "../CreateCommentInput/CreateCommentInput";
import CreateComment from "../CreateComment/CreateComment";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

interface Comment {
  Comment_Id: number;
  Content: string;
  Created_at: string;
  Tweet_Id: number;
  User_Id: number;
}


const TweetDetailsPage = () => {
  const { tweetId = '0' } = useParams();
  const [tweetDetails, setTweetDetails] = useState<any>(null);
  const [commentColor, setCommentColor] = useState(false);
  const [retweetColor, setRetweetColor] = useState(false);
  const [likeColor, setLikeColor] = useState(false);
  const [bookmarkColor, setBookmarkColor] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const { isOpen, onOpenChange, onOpen } = useDisclosure();


  const [commentCount, setCommentCount] = useState(0);
  const [retweetCount, setRetweetCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [saveCount, setSaveCount] = useState(0);



  const handleCommentClick = () => {
    setCommentColor((prevState) => !prevState);
    setCommentCount((prevCount) => (commentColor ? prevCount - 1 : prevCount + 1));
    onOpen();
  };

  const handleRetweetClick = () => {
    setRetweetColor((prevState) => !prevState);
    setRetweetCount((prevCount) => (retweetColor ? prevCount - 1 : prevCount + 1));

    // Call the toggleRetweet function with tweetid and username
    toggleRetweet(tweetid, userid);
  };

  const handleLikeClick = () => {
    setLikeColor((prevState) => !prevState);
    setLikeCount((prevCount) => (likeColor ? prevCount - 1 : prevCount + 1));

    // Call the toggleLike function with tweetid and username
    toggleLike(tweetid, userid);
  };

  const handleBookmarkClick = () => {
    setBookmarkColor((prevState) => !prevState);
    setSaveCount((prevCount) => (bookmarkColor ? prevCount - 1 : prevCount + 1));

    // Call the toggleSave function with tweetid and username
    toggleSave(tweetid, userid);
  };

  const getTimeDisplay = (timestamp: string) => {
    const currentTime = new Date();
    const parsedTimestamp = new Date(timestamp);

    const timeDiff = currentTime.getTime() - parsedTimestamp.getTime(); // Get time difference in milliseconds
    const minutesDiff = Math.floor(timeDiff / 60000); // Convert milliseconds to minutes

    let timeDisplay;
    if (minutesDiff < 60) {
      timeDisplay = `${minutesDiff}m`;
    } else {
      const hoursDiff = Math.floor(minutesDiff / 60); // Convert minutes to hours
      if (hoursDiff < 24) timeDisplay = `${hoursDiff}h`;
      else {
        const month = parsedTimestamp.toLocaleString("en-us", {
          month: "short",
        });
        const day = parsedTimestamp.getDate();
        timeDisplay = `${month} ${day}`;
      }
    }

    return timeDisplay;
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getComments(parseInt(tweetId));
        if (!commentsData) return; // Handle case where data is empty or undefined
  
        // Filter comments based on tweetId
        const filteredComments = commentsData.filter(comment => comment.Tweet_Id === parseInt(tweetId));
  
        setComments(filteredComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchComments();
  }, [tweetId]);

  useEffect(() => {
    const fetchTweetDetails = async () => {
      try {
        const tweet = await getTweet(parseInt(tweetId));
        setTweetDetails(tweet);
        // console.log(tweetId);
        console.log(tweet);
      } catch (error) {
        console.error('Error fetching tweet details:', error);
      }
    };

    fetchTweetDetails();
  }, [tweetId]);
  console.log(tweetDetails?.name);
  
  return (
    <div className="w-full h-full flex justify-center align-middle">
      <div className="container flex w-full justify-center dark:bg-black">
        <div className="nav flex justify-end w-1/5 m-0 p-0 mr-[2vh] pr-10">
          <Nav />
        </div>
        <div className="main-content w-2/5 m-0 p-0 border dark:border-neutral-800 dark:bg-black">
          <div className="flex flex-col m-0 p-0 justify-center">
            <h1 className="font-bold text-xl mb-4 mt-4 flex items-center">
              <Link to="/Home">
                <AiOutlineArrowLeft className='w-4 h-4 mr-2 ml-4'/> 
              </Link>
              <span className='ml-4'>Post</span>
            </h1>
            <div>
              {tweetDetails ? (
                <>
                  <div className="post flex-col w-full mt-2">
                    <div className="user-info flex items-center">
                      <Avatar
                        src={tweetDetails?.profile_img}
                        alt="User Avatar"
                        className="user-avatar min-w-12 min-h-12 ml-2"
                      />
                      <div>
                        <p>
                          <NavLink
                            to={{
                              pathname: `/profile/${tweetDetails.username}`
                            }}
                            className="text-slate-700 p-0 m-0 font-bold ml-2"
                          >
                            {tweetDetails?.name}
                          </NavLink>
                        </p>
                        <p>
                          <NavLink
                            to={{
                              pathname: `/profile/${tweetDetails.username}`
                            }}
                            className="text-slate-700 p-0 m-0 dark:text-gray-400 ml-2"
                          >
                            @{tweetDetails?.username}
                          </NavLink>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="p-3 m-0 dark:text-white">{tweetDetails.content}</p>
                      {tweetDetails.img_url && (
                        <div className='p-4'>
                          <Image
                            src={tweetDetails.img_url}
                            alt="Tweet Image"
                            className="tweet-image w-auto h-full"
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                      )}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">
                        {getTimeDisplay(tweetDetails?.created_at)}
                    </span>
                    <hr className='mt-4 mb-3'></hr>
                  </div>
                </>
              ) : (
                <p>Loading tweet details...</p>
              )}
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {() => (
                  <ModalBody>
                    <CreateComment
                      tweet_id={tweetDetails.tweet_id}
                      user_id={tweetDetails.loggedUserId}
                      name={tweetDetails.name}
                      username={tweetDetails.username}
                      text={tweetDetails.content}
                      imageUrl={tweetDetails.imageUrl}
                      profileimageurl={tweetDetails.profile_img}
                      timeDisplay={tweetDetails.timeDisplay}
                    ></CreateComment>
                  </ModalBody>
                )}
              </ModalContent>
            </Modal>
            <div className="tweet-actions flex flex-row justify-around col text-slate-700">
              <span
                className={`action flex items-center cursor-pointer z-3 ${
                  commentColor ? "text-blue-500" : "hover:text-blue-500"
                }`}
                onClick={handleCommentClick}
              >
                {commentColor ? <FaComment className="w-4 h-4" /> : <FaRegComment className="w-4 h-4" />} &nbsp;{tweetDetails?.comments}
              </span>
              <span
                className={`action flex items-center cursor-pointer ${
                  retweetColor ? "text-green-500" : "hover:text-green-500"
                }`}
                onClick={handleRetweetClick}
              >
                {retweetColor ? <LuRepeat2 className="w-4 h-4" /> : <LuRepeat2 className="w-4 h-4" />} &nbsp;{tweetDetails?.retweets}
              </span>
              <span
                className={`action flex items-center cursor-pointer ${
                  likeColor ? "text-red-500" : "hover:text-red-500"
                }`}
                onClick={handleLikeClick}
              >
                {likeColor ? <PiHeartFill className="w-4 h-4" /> : <PiHeartBold className="w-4 h-4" />} &nbsp;{tweetDetails?.likes}
              </span>
              <span
                className={`action flex items-center cursor-pointer ${
                  bookmarkColor ? "text-orange-500" : "hover:text-orange-500"
                }`}
                onClick={handleBookmarkClick}
              >
                {bookmarkColor ? (
                  <FaBookmark className="w-4 h-4" />
                ) : (
                  <FaRegBookmark className="w-4 h-4" />
                )}{" "}
                &nbsp;{tweetDetails?.saves}
              </span>
            </div>
            <hr className='mt-4 mb-3'></hr>
            <CreateCommentInput username={tweetDetails?.username} ></CreateCommentInput>
            <hr className='mb-3'></hr>
            <div>
              <p className="p-3 m-0 dark:text-white">
                {comments.map((comment) => (
                  <div key={comment.Comment_Id}>
                    <p>{comment.Content}</p>
                    <hr className='mt-4 mb-3'></hr>
                  </div>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className="sidebar-right w-1/4 ml-7 mt-2 pl-1 pr-2 hidden md:block">
          <div className="mb-3">
            <Search />
          </div>
          <TrendingTopics />
          <WhoToFollow users={[]} />
        </div>
      </div>
    </div>
  );
  
};

export default TweetDetailsPage;
