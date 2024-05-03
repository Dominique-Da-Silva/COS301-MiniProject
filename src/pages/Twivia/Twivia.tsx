import { Nav } from "@components/index";
import React, { useEffect, useState } from "react";
import { Card, Button, Link } from "@nextui-org/react";
import { TrendingTopics, WhoToFollow, Search, GamePlay } from "@components/index";
import { useNavigate } from "react-router-dom";
import { FaTwitter } from 'react-icons/fa';
import { isUserLoggedIn } from "@services/index";

interface TwiviaProps { }

const Twivia: React.FC<TwiviaProps> = () => {
  // const navigate = useNavigate(); // COMMENT BACK WHEN DONE TESTING

  const [showGamePlay, setShowGamePlay] = useState(false);

  const handlePlay = () => {
    setShowGamePlay(true);
  };

  /* useEffect(() => { COMMENT BACK WHEN DONE TESTING
    // this is necessary for checking if the user is signed in
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      if (!result) {
        navigate("/home"); // Redirect to home page if user is not logged in
      }
    };
    checkUser();
  }, [navigate]); */

  return (
    <div className="w-full h-full flex justify-center align-middle">
      <div className="container flex w-full justify-center dark:bg-black">
        <div className="nav flex justify-end w-1/5 m-0 p-0 mr-[2vh] pr-10">
          <Nav />
        </div>
        <div className="main-content w-2/5 m-0 p-0 border dark:border-neutral-800 flex justify-center items-center h-screen">
          <div className="w-full flex flex-col items-center justify-center">
            {!showGamePlay ? (
              <>
                <h1 style={{ fontSize: '3vw', background: '#1DA1F2', WebkitBackgroundClip: 'text', marginBottom: '1rem', fontWeight: 650, color: 'black !important' }}>
                  Welcome to Twivia!
                </h1>
                <FaTwitter style={{ fontSize: '2rem', color: '#1DA1F2', marginBottom: '1rem' }} />
                <p style={{ fontSize: '1rem', marginBottom: '0rem', color: "GrayText" }}>Where Twitter meets Trivia! How well do you know your followers?</p>
                <p style={{ fontSize: '1rem', marginBottom: '1rem', color: "GrayText" }}>Press Play to find out...</p>
                <Button
                  auto
                  size="lg"
                  className={`sidebar-item cursor-pointer flex items-center justify-center w-12 h-12 rounded-full my-0 hover:bg-gray-200 bg-sky-500`}
                  onClick={handlePlay}
                  style={{ fontWeight: 600, color: '#FFFFFF' }}
                >
                  Play
                </Button>
                <Link href="/home" className="mt-4 text-sm">
                  Back to Home
                </Link>
              </>
            ) : (
              <GamePlay />
            )}
          </div>
        </div>



        <div className="sidebar-right w-1/4 ml-7 mt-2 pl-1 pr-2">
          {
            /* COMMENT BACK WHEN DONE TESTING
            <div className="mb-3">
              <Search />
            </div>
            <TrendingTopics />
            <WhoToFollow users={[]} /> 
            */
          }
        </div>
      </div>
    </div>
  );
};

export default Twivia;
