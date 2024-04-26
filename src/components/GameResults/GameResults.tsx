import React from 'react';
import { Card, Button, Link } from "@nextui-org/react";

const GameResult = () => {
  return (
    <Card className="w-full h-screen flex flex-col items-center justify-center">
      <h2 className="mb-6 text-2xl font-bold">
        Twivia
      </h2>
      <h1 className="text-4xl font-display tracking-widest">
        100%
      </h1>
      <h3 className="text-xl mb-2">
        Congratulations, your skill level is:
      </h3>
      <h2 className="text-xl font-display tracking-widest">
        STALKER
      </h2>
      <div className="flex flex-col items-center space-y-2 mt-4">
        <p className="text-base">
          We strongly suggest taking a break from the platform.
        </p>
        <p className="text-base">In fact, we beg you: please close the app.</p>
      </div>
      <Link href="/twivia" className="mt-6">
        <Button auto size="lg">
          Play Again
        </Button>
      </Link>
    </Card>
  );
};

export default GameResult;
