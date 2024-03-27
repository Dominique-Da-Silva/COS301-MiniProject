import React from "react";
import { Avatar } from "@nextui-org/react";
import { PiBellFill } from "react-icons/pi";
interface PostNotificationProp {
  id: number;
  description: string;
  avatarUrl: string;
}

const PostNotification: React.FC<PostNotificationProp> = ({
  description,
  avatarUrl,
}) => {
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4">
      <div className="avatar">
        <PiBellFill />
        <Avatar
          src={avatarUrl} // profile image url to be replaced
          alt="User Avatar"
          className="user-avatar min-w-12 min-h-12"
        />
      </div>
      <div className="post flex-col w-auto pl-2">
        <div className="user-info flex">
          <p className="font-semibold p-0 m-0">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PostNotification;
