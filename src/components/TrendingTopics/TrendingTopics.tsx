import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { supabase } from "@config/supabase";
import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";

interface Topic {
  name: string;
  description: string;
  timePosted: string;
  avatarUrl: string;
}
interface TrendingTopicsProps {}

const excerptLength = 40;

const TrendingTopics: React.FC<TrendingTopicsProps> = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const fetchTopics = async () => {
    try {
      const { data: topicData, error } = await supabase
        .from("Topics")
        .select("*")
        .limit(5);
      if (error) {
        throw error;
      }
      //console.log(usersData);
      if (topicData) {
        setTopics(topicData);
      } else {
        console.log("No users found");
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };
  fetchTopics();
  return (
    <div>
      <Card className="max-w-[400px] bg-gray-200">
      <CardHeader className="flex gap-1 pb-0">
        <h2 className="text-lg font-bold mb-4">Trending Topics</h2>
      </CardHeader>
      <Divider/>
      <CardBody>
      <div className="space-y-4">
          {" "}
          {topics.map((topic: Topic) => (
            <div key={topic.name} className="flex-col items-center">
              <div className="flex">
                <div className="ml-4">
                <img
                  src={topic.avatarUrl}
                  alt={topic.name}
                  className="h-12 w-12 rounded-md"
                />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium">{topic.name}</h3>
                  <p className="text-gray-500">{topic.description && topic.description.slice(0, excerptLength) + (topic.description.length > excerptLength ? '...' : '')}</p>
                  <p className="text-gray-500">{topic.timePosted}</p>
                </div>
                <Button size="lg" className="ml-auto p-3">
                  <span className="whitespace-nowarap">Read More</span>
                </Button>
              </div>
              <Divider/>
            </div>
          ))}
          
        </div>
      </CardBody>
      <Divider/>
      <CardFooter className="cursor-pointer hover:text-sky-500">
          See More
      </CardFooter>
    </Card>        
        
      </div>
  );
};

export default TrendingTopics;
