import React, { useState } from "react";
import { Avatar, Button } from "@nextui-org/react";
import { IoMdPersonAdd } from "react-icons/io";
// import { supabase } from "@config/supabase";
import { whoToFollow } from "mockData/mockData";

interface User {
  user_id: number;
  name: string;
  username: string;
  avatarUrl: string;
}
interface WhoToFollowProps {
  users: User[];
}

const WhoToFollow: React.FC<WhoToFollowProps> = () => {
  const [users, setUsers] = useState<any>(whoToFollow);
  // Function is not fetching the users from the User table
  // const fetchUsers = async () => {
  //   try {
  //     const { data: usersData, error } = await supabase
  //       .from("User")
  //       .select("*")
  //       .limit(3);
  //     if (error) {
  //       throw error;
  //     }
  //     //console.log(usersData);
  //     if (usersData) {
  //       setUsers(usersData);
  //     } else {
  //       console.log("No users found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  // fetchUsers();
  return (
    <div className="bg-white p-4 shadow rounded-md">
      <h2 className="text-lg font-bold mb-4">Who to follow</h2>
      <div className="space-y-4">
        {Array.from(users.values()).map((user) => (
          <div
            key={(user as User).user_id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <Avatar
                src={(user as User).avatarUrl}
                alt={(user as User).name}
                size="sm"
              />
              <div>
                <h3 className="font-semibold">{(user as User).name}</h3>
                <p className="text-gray-500">@{(user as User).username}</p>
              </div>
            </div>
            <Button size="sm" className="text-white bg-primary">
              <IoMdPersonAdd className="mr-2" />
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhoToFollow;
