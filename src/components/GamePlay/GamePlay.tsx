import React, { useState } from 'react';
import { Card, Button, Link } from "@nextui-org/react";
import { FaTwitter } from 'react-icons/fa';
import GameResult from '@components/GameResults/GameResults';

interface FollowerData {
  id: string;
  name: string;
  photo: string;
  isCorrect: boolean; 
}

const followerData: FollowerData[] = [
  { id: 'a', name: 'Dominique da Silva', photo: 'images/IMG-20240312-WA0081.jpg', isCorrect: false },
  { id: 'b', name: 'Kyle Marshall', photo: 'images/IMG-20240312-WA0073.jpg', isCorrect: false },
  { id: 'c', name: 'Quintin d\'Hotman', photo: 'images/IMG-20240312-WA0077.jpg', isCorrect: false },
  { id: 'd', name: 'Yashvitha Kanaparthy', photo: 'images/IMG-20240312-WA0076.jpg', isCorrect: false },
];

const questions = [ //This will be populated with the real questions
  "Question 1",
  "Question 2",
  "Question 3",
  "Question 4",
  "Question 5",
];

const GamePlay = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false); // Track if "Submit" button has been clicked
  const [questionNumber, setQuestionNumber] = useState<number>(0); // Track current question number
  const [correctCount, setCorrectCount] = useState<number>(0); // Track number of correct answers

  const handleOptionChange = (option: string) => {
    if (!submitted) {
      setSelectedOption(option);
    }
  };

  const determineCorrectAnswer = () => { //this will invoke the function that determines the correct answer for that specific question, we will probably need to appropriate this 
    const correctIndex = Math.floor(Math.random() * followerData.length);
    followerData.forEach((follower, index) => {
      follower.isCorrect = index === correctIndex;
    });
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      alert('Please select an answer.');
    } else {
      setSubmitted(true); // Mark as submitted
      setShowNext(true);
      determineCorrectAnswer(); // Placeholder for determining correct answer
      const isCorrect = selectedOption === followerData.find((follower) => follower.isCorrect)?.id;
      setFeedback(isCorrect ? 'correct' : 'incorrect');
      if (isCorrect) {
        setCorrectCount(correctCount + 1); // Increment correct count if answer is correct
      }
    }
  };

  const handleNext = () => {
    if (questionNumber < questions.length - 1) {
      setQuestionNumber(questionNumber + 1); // Go to next question
      setSelectedOption('');
      setShowNext(false);
      setFeedback(null);
      setSubmitted(false); // Reset submitted state
    } else {
      setShowResult(true); // If no more questions, show results
    }
  };

  return (
    <Card className="w-full h-screen flex flex-col items-center justify-center">
      {!showResult ? (
        <>
          <h2 className="mb-6 text-3xl font-bold">
            Twivia
          </h2>
          <FaTwitter style={{ fontSize: '2rem', color: '#1DA1F2', marginBottom: '1rem' }} />
          <p className="text-base">{questions[questionNumber]}</p>
          <div className="mt-4 flex flex-col">
            {followerData.map((follower) => (
              <div
                key={follower.id}
                className={`flex items-center space-x-2 border rounded-full p-2 mt-2 mb-4 transition-transform transform-gpu ${
                  selectedOption === follower.id && !submitted
                    ? 'hover:scale-105 cursor-pointer border-sky-500'
                    : submitted && follower.isCorrect
                      ? 'bg-white text-green-500 border-green-500'
                      : submitted && selectedOption === follower.id
                        ? 'bg-red-500 text-white border-white'
                          : selectedOption !== follower.id && !submitted 
                          ? 'hover:scale-105 cursor-pointer border-gray-300'
                            : ''
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
                  disabled={submitted} // Disable radio button when submitted
                />
                <img src={follower.photo} alt={follower.name} className="w-8 h-8 rounded-full mr-2" />
                <span className="text-base font-medium">{follower.name}</span>
              </div>
            ))}
          </div>
          {feedback !== null && (
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
        <GameResult correctCount={correctCount} totalQuestions={questions.length} />
      )}
    </Card>
  );
};

export default GamePlay;
