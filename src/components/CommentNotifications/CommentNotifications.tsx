import React from "react";
import { Avatar } from "@nextui-org/react";
interface CommentNotificationProp {
  id: number;
  avatarUrl: string;
}

const CommentNotification: React.FC<CommentNotificationProp> = ({
  avatarUrl,
}) => {
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
        <div>
            <div className="avatar">
            <Avatar
                src={avatarUrl} // profile image url to be replaced
                alt="User Avatar"
                className="user-avatar min-w-12 min-h-12"
            />
            </div>
        </div>
        {/* Display the name of the user of the post */}
        <p className="font-bold mx-2">Name</p>
        <div>
            {/* Display the Username of user that is replying*/}
            <p className="text-slate-500 ">@Username</p>
            <p className="text-slate-500 -mx-12">Replied to your post</p>
            {/* Display comment */}
            <p className="-mx-12">Comment</p>
            
        </div>
        
    </div>
  );
};

export default CommentNotification;
