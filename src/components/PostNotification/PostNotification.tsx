import React from "react";
import { Avatar } from "@nextui-org/react";
import { PiStarFourFill } from "react-icons/pi";
interface PostNotificationProp {
  id: number;
  avatarUrl: string;
}

const PostNotification: React.FC<PostNotificationProp> = ({
  avatarUrl,
}) => {
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
      <div className="flex-col w-auto dark:text-white">
        <PiStarFourFill color="#774CC5"/>{" "}
      </div>
      <div>
        <div className="avatar mb-2 mx-2">
          <Avatar
            src={avatarUrl} // profile image url to be replaced
            alt="User Avatar"
            className="user-avatar min-w-10 min-h-10"
          />
        </div>
        {/* Display the name of the user of the post */}
        <p className="font-bold">Name</p>
        {/* Display the tweet */}
        <p className="text-slate-500 mx-2">Tweet</p>
      </div>
    </div>
  );
};

export default PostNotification;
