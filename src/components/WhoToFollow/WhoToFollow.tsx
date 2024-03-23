import React, { useState } from "react";
import { Avatar, Button } from "@nextui-org/react";
// import { IoMdPersonAdd } from "react-icons/io";
// import { supabase } from "@config/supabase";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import { mockFollowSuggestions } from '../../mockData/mockData';

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
  const [users] = useState<any[]>(mockFollowSuggestions);

  // const [users, setUsers] = useState<any[]>([]);
  // // Function is not fetching the users from the User table
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
    <div>
      <Card className="max-w-[400px] bg-gray-50 shadow-none mt-8">
        <CardHeader className="flex gap-1 pl-3 !pb-0">
          <h2 className="text-lg font-bold mb-4">Who to follow</h2>
        </CardHeader>
        <CardBody className="m-0 p-0">
          <div className="m-0 p-0">
            {" "}
            {users.map((user) => (
              <div key={user.user_id} className="flex items-center hover:bg-slate-200 p-3">
                <Avatar src={user.avatarUrl} alt={user.name} size="md" className="p-0 m-0" />
                <div className="ml-4">
                  <h3 className="text-base font-medium p-0 m-0">{user.name}</h3>
                  <p className="text-gray-500 p-0 m-0">@{user.username}</p>
                </div>
                <Button className="ml-auto font-bold text-white bg-black h-7" radius="full">
                  Follow
                </Button>
            </div>
          ))}
          </div>
        </CardBody>
        <CardFooter className="cursor-pointer text-sky-500 hover:bg-slate-200">
            Show more
        </CardFooter>
      </Card>    
      
    </div>
  );
};

export default WhoToFollow;
