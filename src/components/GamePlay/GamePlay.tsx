import React, { useState } from 'react';
import { Card, Button, Link } from "@nextui-org/react";
import { GameResults } from "@components/index";

interface FollowerData {
  id: string;
  name: string;
  photo: string;
}

const followerData: FollowerData[] = [
  { id: 'a', name: 'Dominique da Silva', photo: 'images/IMG-20240312-WA0081.jpg' },
  { id: 'b', name: 'Kyle Marshall', photo: 'images/IMG-20240312-WA0073.jpg' },
  { id: 'c', name: 'Quintin d\'Hotman', photo: 'images/IMG-20240312-WA0077.jpg' },
  { id: 'd', name: 'Yashvitha Kanaparthy', photo: 'images/IMG-20240312-WA0076.jpg' },
];

const GamePlay = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      alert('Please select an answer.');
    } else {
      setShowNext(true);
    }
  };
  

  const handleNext = () => {
    setShowNext(false);
    setShowResult(true);
  };

  return (
    <Card className="w-full h-screen flex flex-col items-center justify-center">
      {!showResult ? (
        <>
          <h2 className="mb-6 text-2xl font-bold">
            Twivia
          </h2>
          <p className="text-base">1. Who has been following you the longest?</p>
          <div className="mt-4 flex flex-col space-y-2">
            {followerData.map((follower) => (
              <div key={follower.id} className="flex items-center">
                <input
                  type="radio"
                  id={follower.id}
                  value={follower.id}
                  checked={selectedOption === follower.id}
                  onChange={() => handleOptionChange(follower.id)}
                  className="mr-2 border-gray-300 focus:ring-primary-500 focus:ring-offset-2"
                />
                <label htmlFor={follower.id} className="flex items-center space-x-2">
                  <img src={follower.photo} alt={follower.name} className="w-8 h-8 rounded-full mr-2" />
                  <span className="text-base font-medium">{follower.name}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-between w-full mt-6">
  <Link href="/twivia" className="mt-6">
    <Button auto>
      Quit
    </Button>
  </Link>
  {showNext ? (
    <Link href="#" className="mt-6">
      <Button auto onClick={handleNext}>
        Next
      </Button>
    </Link>
  ) : (
    <Link href="#" className="mt-6">
      <Button auto onClick={handleSubmit}>
        Submit
      </Button>
    </Link>
  )}
</div>


        </>
      ) : (
        <GameResults />
      )}
    </Card>
  );
};

export default GamePlay;
