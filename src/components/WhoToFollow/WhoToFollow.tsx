import React, { useEffect, useState } from "react";
import { Avatar, Button, button, user } from "@nextui-org/react";
import { fetchUsers } from "@services/index";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { isUserLoggedIn } from "@services/index";
import {UserCard} from "@components/index";

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
  const [user, setUser] = useState<User>();
  const [userAuthStatus, setUserAuthStatus] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Follow");

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersData = await fetchUsers();
        console.log("Users Data:");
        console.log(usersData);
        setUsers(randomUsers(usersData as any[])); // Add type assertion here
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersData();
  }, []);

  const randomUsers = (users: any[]) => {
    const randomUsers = [];
    for (let i = 0; i < 3; i++) {
      randomUsers.push(users[Math.floor(Math.random() * users.length)]);
    }
    return randomUsers;
  };

  const followUser = (user: User) => {
    console.log("Followed", user);
    setIsFollowing(true);
  };

  const unFollowUser = (user: User) => {
    console.log("Unfollowed", user);
    setButtonText("Follow");
    setIsFollowing(false);
  };

  const handleMouseEnter = () => {
    if (isFollowing) {
      setButtonText("Unfollow");
    }
  };

  const handleMouseLeave = () => {
    if (isFollowing) {
      setButtonText("Following");
    }
  };

  useEffect(() => {
    // this is necessary for checking if the user is signed in
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      setUserAuthStatus(result);
    };

    // Call the async function
    checkUser();
  }, []);

  return (
    <div>
      <Card className="bg-gray-50 dark:bg-neutral-900 shadow-none mt-8 w-11/12">
        <CardHeader className="flex gap-1 pl-3 !pb-0">
          <h2 className="text-lg font-bold mb-4">Who to follow</h2>
        </CardHeader>
        <CardBody className="m-0 p-0">
          <div className="m-0 p-0">
            {" "}
            {users.map((user) => (
              <UserCard
              key={user.user_id}
              logged_in_user_id={1}
              user_id={user.user_id}
              name={user.name}
              username={user.username}
              avatarUrl={user.avatarUrl}
              />
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
