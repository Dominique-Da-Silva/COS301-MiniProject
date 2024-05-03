import React from 'react';
import { Card, Button, Link } from "@nextui-org/react";
import { FaTwitter } from 'react-icons/fa';

interface GameResultProps {
  correctCount: number;
  totalQuestions: number;
}

interface EmojiData {
  name: string;
  emoji: string; 
}

const emojiData: EmojiData[] = [
  { name: 'Stalker', emoji: 'images/busts_in_silhouette.png'},
  { name: 'Day One', emoji: 'images/handshake.png'},
  { name: 'Classic Old Pal', emoji: 'images/slightly_smiling_face.png'},
  { name: 'Bad Friend', emoji: 'images/skull.png'},
  { name: 'Removed Acquaintance', emoji: 'images/bust_in_silhouette.png'},
  { name: 'Stranger', emoji: 'images/question.png'},
];



function getSkillLevel(score: number) {
  if (score >= 100) {
    return { level: 'Stalker', text1: 'We strongly suggest taking a break from the platform.', text2: 'In fact, we beg you: please close the app.' };
  } else if (score >= 80) {
    return { level: 'Day One', text1: 'You\'re a seasoned user!', text2: 'You know the platform like the back of your hand.' };
  } else if (score >= 60) {
    return { level: 'Classic Old Pal', text1: 'You\'re getting there!', text2: 'You\'re familiar with the platform, but there\'s still more to learn.' };
  } else if (score >= 40) {
    return { level: 'Bad Friend', text1: 'You know a thing or two, but there\'s room for improvement.', text2: 'Keep exploring the platform.' };
  } else if (score >= 20) {
    return { level: 'Removed Acquaintance', text1: 'You\'ve got some catching up to do.', text2: 'Try to spend some more time on the platform.' };
  } else {
    return { level: 'Stranger', text1: 'Are you sure you\'re on the right platform?', text2: 'Maybe you should try again.' };
  }
}

const GameResult: React.FC<GameResultProps> = ({ correctCount, totalQuestions }) => {
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const { level, text1, text2 } = getSkillLevel(percentage);
  const emoji = emojiData.find(e => e.name === level);

  return (
    <Card className="w-full h-screen flex flex-col items-center justify-center">
      <h2 className="mb-6 text-3xl font-bold">
        Twivia
      </h2>
      <FaTwitter style={{ fontSize: '2rem', color: '#1DA1F2', marginBottom: '1rem' }} />
      <h3 className="text-xl mb-2">
        Your result:
      </h3>
      <h1 className="text-4xl font-display tracking-widest">
        {percentage}%
      </h1>
      <h3 className="text-xl mb-2">
        Congratulations, your skill level is:
      </h3>
      <h2 className="text-4xl font-display tracking-widest">
       {level}
      </h2>
      {emoji && <img src={emoji.emoji} alt={emoji.name} style={{ width: '100px', height: '100px' }} />}
      <div className="flex flex-col items-center space-y-2 mt-4">
        <p className="text-base">
          {text1}
        </p>
        <p className="text-base">{text2}</p>
      </div>
      <Link href="/twivia" className="mt-6">
        <Button size="lg">
          Play Again
        </Button>
      </Link>
    </Card>
  );
};

export default GameResult;