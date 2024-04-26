import { Nav } from "@components/index";
import React, { useEffect, useState } from "react";
import { Card, Button, Link } from "@nextui-org/react";
import { TrendingTopics, WhoToFollow, Search, GamePlay } from "@components/index";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "@services/index";

interface TwiviaProps {}

const Twivia: React.FC<TwiviaProps> = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [showGamePlay, setShowGamePlay] = useState(false);

  const handlePlay = () => {
    setShowGamePlay(true);
  };

  useEffect(() => {
    // this is necessary for checking if the user is signed in
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      if (!result) {
        navigate("/home"); // Redirect to home page if user is not logged in
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="w-full h-full flex justify-center align-middle">
      <div className="container flex w-full justify-center dark:bg-black">
        <div className="nav flex justify-end w-1/5 m-0 p-0 mr-[2vh] pr-10">
          <Nav />
        </div>
        <div className="main-content w-2/5 m-0 p-0 border dark:border-neutral-800">
          <div className="flex flex-col w-full m-0 p-0 justify-center">
            <Card className="w-full h-screen flex flex-col items-center justify-center">
              {!showGamePlay ? (
                <>
                  <h1 style={{ fontSize: '60px', background: '#1DA1F2 ', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Welcome to Twivia!
                  </h1>
                  <p style={{ fontSize: '18px' }}>Where Twitter meets trivia. How well do you know your followers?</p>
                  <p style={{ fontSize: '18px' }}>Press Play to find out...</p>
                  <Button auto size="lg" className="mt-6" onClick={handlePlay}>
                    Play
                  </Button>
                  <Link href="/home" className="mt-4 text-sm">
                    Back to Home
                  </Link>
                </>
              ) : (
                <GamePlay />
              )}
            </Card>
          </div>
        </div>
        <div className="sidebar-right w-1/4 ml-7 mt-2 pl-1 pr-2">
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

export default Twivia;
