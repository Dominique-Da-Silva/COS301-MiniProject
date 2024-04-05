import React, { useState } from "react";
// import { supabase } from "@config/supabase";
import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import { mockTopics } from '../../mockData/mockData';
import TrendingList from "@components/TrendingList/TrendingList";

interface Topic {
  name: string;
  description: string;
  timePosted: string;
  avatarUrl: string;
}
interface TrendingTopicsProps {}

const TrendingTopics: React.FC<TrendingTopicsProps> = () => {
  return (
    <div>
      <Card className="bg-gray-50 shadow-none w-11/12">
        <CardHeader className="flex gap-1 pb-0">
          <h2 className="text-lg font-bold mb-4">Trending Topics</h2>
        </CardHeader>
        <TrendingList />
        <CardFooter className="cursor-pointer text-sky-500 hover:bg-slate-200">
          Show more
        </CardFooter>
      </Card>          
    </div>
  );
};

export default TrendingTopics;
