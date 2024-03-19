import React, { useState } from "react";
import { Avatar, Button } from "@nextui-org/react";
import { IoMdPersonAdd } from "react-icons/io";
import { supabase } from "@config/supabase";

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
  const [users, setUsers] = useState<any[]>([]);
  // Function is not fetching the users from the User table
  const fetchUsers = async () => {
    try {
      const { data: usersData, error } = await supabase
        .from("User")
        .select("*")
        .limit(3);
      if (error) {
        throw error;
      }
      //console.log(usersData);
      if (usersData) {
        setUsers(usersData);
      } else {
        console.log("No users found");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // fetchUsers();
  return (
    <div className="bg-white p-4 shadow rounded-md">
      <h2 className="text-lg font-bold mb-4">Who to follow</h2>
      <div className="space-y-4">
        {" "}
        {users.map((user) => (
          <div key={user.user_id} className="flex items-center">
            <Avatar src={user.avatarUrl} alt={user.name} size="md" />
            <div className="ml-4">
              <h3 className="text-base font-medium">{user.name}</h3>
              <p className="text-gray-500">@{user.username}</p>
            </div>
            <Button size="sm" className="ml-auto">
              <IoMdPersonAdd className="mr-1" />
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhoToFollow;