import React from "react";
import { Avatar } from "@nextui-org/react";
import { GoHeartFill } from "react-icons/go";
interface LikeNotificationProp {
  id: number;
  description: string;
  tweet: string;
  avatarUrl: string;
}

const LikedNotification: React.FC<LikeNotificationProp> = ({
  description,
  tweet,
  avatarUrl,
}) => {
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
      <div className="flex-col w-auto dark:text-white ">
        <GoHeartFill color="#E61C84" />{" "}
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
            {/* Tweet is not rendering */}
            <p className="text-slate-700 p-0 m-0 dark:text-white">{tweet}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default LikedNotification;
