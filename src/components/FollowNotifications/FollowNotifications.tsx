import React from "react";
import { Avatar } from "@nextui-org/react";
import { FaUser } from "react-icons/fa6";
interface PostNotificationProp {
  id: number;
  description: string;
  avatarUrl: string;
}

const FollowNotifications: React.FC<PostNotificationProp> = ({
  description,
  avatarUrl,
}) => {
  return (
    <div className="tweet w-full flex border-t-1 m-0 p-4 dark:border-neutral-800">
      <div className="flex-col w-auto dark:text-white">
        <FaUser color="#1DA1F2" style={{ marginRight: "10px" }}/>{" "}
      </div>
      <div> 
        <div className="flex-col w-auto pl-2 dark:text-white -mx-2 -mt-1 mb-2">
              <p className="font-semibold p-0 m-0 dark:text-white">{description}</p>
        </div>
        <div>
          <div className="info-box border border-gray-300 rounded-lg p-4">
            <div className="avatar mb-2">
              <Avatar
                src={avatarUrl} // profile image url to be replaced
                alt="User Avatar"
                className="user-avatar min-w-10 min-h-10"
              />
            </div>
            {/* display the name of the user */}
            <p className="font-bold ">User</p>
            {/* display the username of the user */}
            <p className="text-gray-500">@Username</p>
            {/* display bio if needed otherwise can be removed*/}
            <p className="font-semibold">This is my bio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowNotifications;
