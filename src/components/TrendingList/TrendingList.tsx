import { useState, useEffect } from 'react';
// import { mockTrending } from '../../mockData/mockData';
import { MdOutlineMoreHoriz } from "react-icons/md";
import { getTrendingTopics } from '@services/index';


interface Topic {
    Trending_Id: string;
    TagName: string;
    NumPosts: number;
  }

 interface ExploreProps {}


const formatCount = (count: number): string | number => {
  if (count < 1000) {
  return count; // Return as it is if less than 1000
  } else if (count < 1000000) {
  // Convert to K format
  return (count / 1000).toFixed(1) + "K";
  } else {
  // Convert to M format
  return (count / 1000000).toFixed(1) + "M";
  }
};


    
const TrendingList: React.FC<ExploreProps> = () => {
  const [topics, setTopics] = useState<any[]>([]);

  useEffect(() => {
    const fetchTagsData = async () => {
      try {
        const tagsData = await getTrendingTopics();
        setTopics(tagsData);
        // console.log(tagsData);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    }
    fetchTagsData();
  }, []);

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const tagsData = await getTrendingTopics();
//         setTags(tagsData);
//         // console.log(tagsData);
//       } catch (error) {
//         console.error('Error fetching tags:', error);
//       }
//     }

//     fetchTopics();
//   },[]);
//     console.log(Tags);

  return (
    <div>
        {topics.slice(0, 5).map((topic: Topic) => (
        <div key={topic.Tag_Id} className="items-center justify-between p-3 hover:bg-gray-100 dark:bg-neutral-900">
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] font-medium">#{topic.Tag_Name}</h3>
            <div className="h-10 w-10 flex justify-center rounded-full align-middle items-center hover:text-sky-600 hover:bg-blue-100 p-0 m-0 cursor-pointer">
                <MdOutlineMoreHoriz size={20}/>
            </div>
          </div>
        <p className="text-[13.5px] text-gray-500 -mt-1">{formatCount(topic.tweet_count)} posts</p>
        </div>
      ))} 
    </div>  
  )
};

export default TrendingList;