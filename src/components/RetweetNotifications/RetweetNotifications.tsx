import React from "react";
import { Avatar } from "@nextui-org/react";
import { FaRetweet } from "react-icons/fa6";
interface RetweetNotificationProp {
  id: number;
  description: string;
  tweet: string;
  avatarUrl: string;
}

const RetweetNotifications: React.FC<RetweetNotificationProp> = ({
  description,
  tweet,
  avatarUrl,
}) => {
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
      <div className="flex-col w-auto dark:text-white ">
        <FaRetweet color="#53A47F" />{" "}
      </div>
      <div>
        <div className="avatar mx-2 mb-2">
          <Avatar
            src={avatarUrl} // profile image url to be replaced
            alt="User Avatar"
            className="user-avatar min-w-10 min-h-10"
          />
        </div>
        <div className="post flex-col w-auto pl-2 dark:text-white">
          <div className="user-info flex">
            {/* This should display "User liked your post" */}
            <p className="font-semibold p-0 m-0 dark:text-white">{description}</p>
          </div>
          <div className="p-0 m-0">
            <p className="text-slate-500 p-0 m-0 dark:text-white">{tweet}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default RetweetNotifications;
