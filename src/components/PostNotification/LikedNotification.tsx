import React from "react";
import { Avatar } from "@nextui-org/react";
import { RiHeart3Fill } from "react-icons/ri";
interface LikeNotificationProp {
  id: number;
  description: string;
  tweet: string;
  avatarUrl: string;
}

const LikeNotification: React.FC<LikeNotificationProp> = ({
  description,
  tweet,
  avatarUrl,
}) => {
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4">
      <div className="flex-col w-auto">
        <RiHeart3Fill />
      </div>
      <div className="avatar">
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
        <div className="p-0 m-0">
          <p className="text-slate-700 p-0 m-0">{tweet}</p>
        </div>
      </div>
    </div>
  );
};

export default LikeNotification;
