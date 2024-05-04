import React from "react";
import { Avatar } from "@nextui-org/react";
import { PiBellFill } from "react-icons/pi";
interface PostNotificationProp {
  id: number;
  description: string;
  avatarUrl: string;
  dateCreated: string;
}

const PostNotification: React.FC<PostNotificationProp> = ({
  description,
  avatarUrl,
  dateCreated,
}) => {
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
      <div className="flex-col w-auto dark:text-white">
        <PiBellFill />
      </div>
      <div className="avatar">
        <Avatar
          src={avatarUrl} // profile image url to be replaced
          alt="User Avatar"
          className="user-avatar min-w-12 min-h-12"
        />
      </div>
      <div className="post flex-col w-auto pl-2 dark:text-white">
        <div className="user-info flex">
          <p className="font-semibold p-0 m-0 dark:text-white">{description}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{dateCreated}</p>
        </div>
      </div>
    </div>
  );
};

export default PostNotification;
