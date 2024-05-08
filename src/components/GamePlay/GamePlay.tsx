import React, { useState, useEffect } from 'react';
import { Card, Button, Link } from "@nextui-org/react";
import { FaTwitter } from 'react-icons/fa';
import GameResult from '@components/GameResults/GameResults';
import Confetti from 'react-confetti';
import './shake.css';
import {
  whoMadeThisTweetGame,
  matchAvatarGame,
  whoMadeThisTweetonDateGame,
  getOldestFollowing,
  getNewestFollowing,
  countFollowing,
} from '@services/index';

const GamePlay = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [questionData, setQuestionData] = useState<any>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [shakeScreen, setShakeScreen] = useState<boolean>(false);
  const [followingCount, setFollowingCount] = useState<number>(0); // State to store following count

  useEffect(() => {
    startGame(); // Call startGame function when component mounts
  }, []);

  const fetchFollowingCount = async () => {
    try {
      const userId = ''; // Replace with the user's ID
      const count = await countFollowing(userId);
      setFollowingCount(count as number);
    } catch (error) {
      console.error('Error fetching following count:', error);
    }
  };

  const startGame = () => {
    fetchFollowingCount(); // Fetch following count when starting the game
    if (followingCount >= 5) {
      fetchQuestionData(); // Start the game if the user follows at least 5 users
    } else {
      alert('You need to follow at least 5 users to play the game.' + 'You are currently following ' + followingCount + ' users.'); // Show an alert if the user follows less than 5 users
      window.location.href = "/home"; // Redirect to the home page
    }
  };

  const fetchQuestionData = async () => {
    try {
      // Fetch question data based on the current question number
      let questionFunction;
      switch (questionNumber) {
        case 0:
          questionFunction = whoMadeThisTweetGame;
          break;
        case 1:
          questionFunction = matchAvatarGame;
          break;
        case 2:
          questionFunction = whoMadeThisTweetonDateGame;
          break;
        case 3:
          questionFunction = getOldestFollowing;
          break;
        case 4:
          questionFunction = getNewestFollowing;
          break;
        default:
          questionFunction = null;
      }
      if (questionFunction) {
        const questionData = await questionFunction();
        setQuestionData(questionData);
      } else {
        // No more questions, show results
        setShowResult(true);
      }
    } catch (error) {
      console.error('Error fetching question data:', error);
    }
  };

  const handleOptionChange = (option: string) => {
    if (!submitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      alert('Please select an answer.');
    } else {
      setSubmitted(true); // Mark as submitted
      setShowNext(true);
      const isCorrect = selectedOption === questionData.answer_user_id;
      setFeedback(isCorrect ? 'correct' : 'incorrect');
      if (isCorrect) {
        setCorrectCount(correctCount + 1); // Increment correct count if answer is correct
      } else {
        setShakeScreen(true); // Trigger screen shake if answer is incorrect
      }
    }
  };

  const handleNext = () => {
    if (questionNumber < 4) {
      setQuestionNumber(questionNumber + 1); // Go to next question
      setSelectedOption('');
      setShowNext(false);
      setFeedback(null);
      setSubmitted(false); // Reset submitted state
      setShakeScreen(false); // Reset screen shake state
      fetchQuestionData(); // Fetch data for the next question
    } else {
      setShowResult(true); // If no more questions, show results
    }
  };

  return (
    <div className={shakeScreen ? 'shake-screen w-full h-screen flex flex-col px-8' : 'w-full h-screen flex flex-col px-8'}>
      {feedback === 'correct' && <Confetti />} {/* Add Confetti for correct answer */}
      {!showResult && questionData && (
        <>
          <div className='flex justify-center'>
            <h2 className="py-6 text-3xl font-bold">
              Twivia
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <FaTwitter style={{ fontSize: '2rem', color: '#1DA1F2', marginBottom: '1rem' }} />
          </div>
          <div className="flex items-center justify-center font-bold">
            {questionData.candidate_question.question}
          </div>
          <div className="mt-4 flex flex-col">
            {questionData.list_options.map((option: any) => (
              <div
                key={option.id}
                className={`flex items-center space-x-2 border rounded-full p-2 mt-2 mb-4 transition-transform transform-gpu ${selectedOption === option.id && !submitted
                  ? 'hover:scale-105 cursor-pointer border-sky-500'
                  : submitted && option.isCorrect
                    ? 'bg-white text-green-500 border-green-500'
                    : submitted && selectedOption === option.id
                      ? 'bg-red-500 text-white border-white'
                      : selectedOption !== option.id && !submitted
                        ? 'hover:scale-105 cursor-pointer border-gray-300'
                        : ''
                  }`}
                onClick={() => handleOptionChange(option.id)}
              >
                <input
                  type="radio"
                  id={option.id}
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => handleOptionChange(option.id)}
                  className="mr-2"
                  disabled={submitted} // Disable radio button when submitted
                />
                <img src={option.photo} alt={option.name} className="w-8 h-8 rounded-full mr-2" />
                <span className="text-base font-medium">{option.name}</span>
              </div>
            ))}
          </div>
          {feedback !== null && (
            <div className='flex justify-center font-bold'>
              <p className={`text-lg ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                {feedback === 'correct' ? 'Correct!' : 'Incorrect!'}
                {feedback === 'correct' && <Confetti numberOfPieces={100} />}
              </p>
            </div>
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
      )}
      {showResult && (
        <GameResult correctCount={correctCount} totalQuestions={5} />
      )}
    </div>
  );
};

export default GamePlay;