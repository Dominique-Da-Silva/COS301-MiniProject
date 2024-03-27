import { Nav } from "@components/index";
import React, { useState } from "react";
import {
  TrendingTopics,
  WhoToFollow,
  Search,
  PostNotification,
  LikeNotification,
} from "@components/index";
import { Button } from "@nextui-org/react";
import { IoMdSettings } from "react-icons/io";
import { mockNotifications, mockLikedNotifications } from "mockData/mockData";

interface NotificationsProps {}
const Notifications: React.FC<NotificationsProps> = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [postnotifications] = useState<any[]>(mockNotifications);
  const [likedNotfications] = useState<any[]>(mockLikedNotifications);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="container flex">
      <div className="nav flex justify-end w-1/4 m-0 p-0 mr-[3vh] pr-10">
        <Nav />
      </div>
      <div className="main-content flex 1 max-w-full m-0 p-0 border">
        <div className="flex flex-col w-full m-0 p-0 justify-center">
          {/* Notification Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <Button className="p-3 rounded-full border bg-white border-gray-300 items-center">
              <IoMdSettings className="mr-1" />
            </Button>
          </div>
          {/* Notifications Tabs */}
          <div className="flex justify-around border-b border-gray-200">
            <div>
              <div className="flex gap-4">
                <button
                  className={`px-4 py-2 text-base font-semibold hover:bg-gray-200 ${
                    activeTab === "all" ? "text-blue-500" : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick("all")}
                >
                  All
                </button>
                <button
                  className={`px-4 py-2 text-base font-semibold hover:bg-gray-200 ${
                    activeTab === "verified" ? "text-blue-500" : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick("verified")}
                >
                  Verified
                </button>
                <button
                  className={`px-4 py-2 text-base font-semibold hover:bg-gray-200 ${
                    activeTab === "mentions" ? "text-blue-500" : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick("mentions")}
                >
                  Mentions
                </button>
              </div>
              <div>
                {activeTab === "all" && (
                  <div>
                    {postnotifications.length === 0 ? (
                      <p className="text-center text-gray-500">
                        You have no notifications
                      </p>
                    ) : (
                      postnotifications.map((notification, index) => (
                        <PostNotification
                          key={index}
                          id={index}
                          description={notification.message}
                          avatarUrl={notification.avatarUrl}
                        />
                      ))
                    )}
                  </div>
                )}
                {activeTab === "verified" && (
                  <div>
                    {likedNotfications.length === 0 ? (
                      <p className="text-center text-gray-500">
                        You have no notifications
                      </p>
                    ) : (
                      likedNotfications.map((notification, index) => (
                        <LikeNotification
                          key={index}
                          id={index}
                          description={notification.message}
                          tweet={notification.tweet}
                          avatarUrl={notification.avatarUrl}
                        />
                      ))
                    )}
                  </div>
                )}
                {activeTab === "mentions" && <div></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-right w-1/4 mr-32 ml-7 pl-1 pr-2">
        <div className="mb-3">
          <Search />
        </div>
        <TrendingTopics />
        <WhoToFollow users={[]} />
      </div>
    </div>
  );
};

export default Notifications;
