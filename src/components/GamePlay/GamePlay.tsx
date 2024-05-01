import React, { useState } from 'react';
import { Card, Button, Link } from "@nextui-org/react";
import { GameResults } from "@components/index";
import { FaTwitter } from 'react-icons/fa';

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
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      alert('Please select an answer.');
    } else {
      /*Real logic will possibly look sometjing like this:
      const correctOption = followerData.find((follower) => follower.isCorrect);
      const isCorrect = selectedOption === correctOption?.id; 
      setFeedback(isCorrect ? 'correct' : 'incorrect');   //Set feedback based on correctness */

      /*Placeholder logic for checking correctness (replace with actual logic)*/
      const isCorrect = Math.random() < 0.5; // Randomly assign true or false
      setFeedback(isCorrect ? 'correct' : 'incorrect'); // Set feedback based on randomness (placeholder)
      //setFeedback('incorrect'); //just tested the right thing displayed according to feedback's value.
      setShowNext(true);
    }
  };


  const handleNext = () => {
    setSelectedOption(''); 
    setShowNext(false);
    setShowResult(true);
    setFeedback(null); 
  };


  return (
    <Card className="w-full h-screen flex flex-col items-center justify-center">
      {!showResult ? (
        <>
          <h2 className="mb-6 text-3xl font-bold">
            Twivia
          </h2>
          <FaTwitter style={{ fontSize: '2rem', color: '#1DA1F2', marginBottom: '1rem' }} />
          <p className="text-base">1. Who has been following you the longest?</p>
          <div className="mt-4 flex flex-col">
            {followerData.map((follower) => (
              <div
                key={follower.id}
                className={`flex items-center space-x-2 border rounded-full p-2 mt-2 mb-4 transition-transform transform-gpu hover:scale-105 cursor-pointer ${selectedOption === follower.id ? 'border-sky-500' : 'border-gray-300'
                  }`}
                onClick={() => handleOptionChange(follower.id)}
              >
                <input
                  type="radio"
                  id={follower.id}
                  value={follower.id}
                  checked={selectedOption === follower.id}
                  onChange={() => handleOptionChange(follower.id)}
                  className="mr-2"
                />
                <img src={follower.photo} alt={follower.name} className="w-8 h-8 rounded-full mr-2" />
                <span className="text-base font-medium">{follower.name}</span>
              </div>
            ))}
          </div>
          {feedback !== null && ( // Display feedback only if provided
            <p className={`text-lg ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
              {feedback === 'correct' ? 'Correct!' : 'Incorrect!'}
            </p>
          )}



          <div className="flex justify-center space-x-20 mb-4">
            <Link href="/twivia" className="mt-6">
              <Button className={`flex items-center space-x-2 border border-gray-300 rounded-full p-2 mt-2`}>
                Quit
              </Button>
            </Link>
            {showNext ? (
              <Link href="#" className="mt-6">
                <Button className={`flex items-center space-x-2 border border-gray-300 rounded-full p-2 mt-2`} onClick={handleNext}>
                  Next
                </Button>
              </Link>
            ) : (
              <Link href="#" className="mt-6">
                <Button className={`flex items-center space-x-2 border border-gray-300 rounded-full p-2 mt-2`} onClick={handleSubmit}>
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
