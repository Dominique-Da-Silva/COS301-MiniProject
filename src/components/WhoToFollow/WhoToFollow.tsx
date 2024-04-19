import React, { useEffect, useState } from "react";
import { Avatar, Button, button, user } from "@nextui-org/react";
import { fetchUsers } from "@services/index";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { isUserLoggedIn } from "@services/index";

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
              <div
                key={user.User_Id}
                className="flex items-center hover:bg-slate-200 p-3"
              >
                <Avatar
                  src={user.avatarUrl}
                  alt={user.Name}
                  size="md"
                  className="p-0 m-0"
                />
                <div className="ml-4">
                  <h3 className="text-base font-medium p-0 m-0">{user.Name}</h3>
                  <p className="text-gray-500 p-0 m-0">@{user.Username}</p>
                </div>
                {userAuthStatus ? (
                  <Button
                    className="ml-auto font-bold text-white bg-black h-7"
                    radius="full"
                    onClick={isFollowing ? () => unFollowUser(user) : () => followUser(user)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {buttonText}
                  </Button>
                ) : (
                  <Button
                    className="ml-auto font-bold text-white bg-black h-7"
                    radius="full"
                    isDisabled
                  >
                    Follow
                  </Button>
                )}
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
