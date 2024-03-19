import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { supabase } from "@config/supabase";
interface Topic {
  name: string;
  description: string;
  timePosted: string;
  avatarUrl: string;
}
interface TrendingTopicsProps {}

const TrendingTopics: React.FC<TrendingTopicsProps> = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const fetchTopics = async () => {
    try {
      const { data: topicData, error } = await supabase
        .from("Topics")
        .select("*")
        .limit(3);
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
  // fetchTopics();
  return (
    <div>
      <div className="bg-white p-4 shadow rounded-md">
        <h2 className="text-lg font-bold mb-4">Trending Topics</h2>
        <div className="space-y-4">
          {" "}
          {topics.map((topic: Topic) => (
            <div key={topic.name} className="flex items-center">
              <div className="ml-4">
                <img
                  src={topic.avatarUrl}
                  alt={topic.name}
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium">{topic.name}</h3>
                <p className="text-gray-500">{topic.description}</p>
                <p className="text-gray-500">{topic.timePosted}</p>
              </div>
              <Button size="lg" className="ml-auto p-3">
                <span className="whitespace-nowarap">More Tweets</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;