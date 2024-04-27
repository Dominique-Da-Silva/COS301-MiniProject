import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Nav, TrendingTopics, Search, WhoToFollow, Tweet } from '@components/index';
import { getTweet } from '@services/index';

const TweetDetailsPage = () => {
  const { tweetId = '0' } = useParams();
  const [tweetDetails, setTweetDetails] = useState<any>(null);

  useEffect(() => {
    const fetchTweetDetails = async () => {
      try {
        const tweet = await getTweet(parseInt(tweetId));
        setTweetDetails(tweet[0]);
      } catch (error) {
        console.error('Error fetching tweet details:', error);
      }
    };

    fetchTweetDetails();
  }, [tweetId]);

  return (
    <div className="w-full flex justify-center align-middle">
    <div className="container flex w-full justify-center dark:bg-black">
      <div className="nav flex justify-end w-1/5 pr-5">
        <Nav /> {/* Include the navbar component */}
      </div>
      <div className="main-content flex flex-col w-full md:w-3/5 m-0 p-0 border dark:border-neutral-800">
        <div className="flex flex-col m-0 p-0 justify-center">
          <div>
            {tweetDetails ? ( 


              <Tweet  tweetid={tweetDetails.Tweet_Id}  userid={tweetDetails.User_Id} name={tweetDetails.User.Name} username={tweetDetails.User.Username} text={tweetDetails.Content} imageUrl={tweetDetails.Img_Url} profileimageurl={tweetDetails.User.Profile?.[0].Img_Url} timeDisplay={tweetDetails.timeDisplay} likes={tweetDetails.likes} retweets={tweetDetails.retweets} comments={tweetDetails.comments} saves={tweetDetails.saves} bookmarked={tweetDetails.bookmarked} author={tweetDetails.User.author} ></Tweet>
            ) : (
              <p>Loading tweet details...</p>
            )}
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
