import { Nav } from "@components/index";
import React, { useState } from "react";
import {
  TrendingTopics,
  WhoToFollow,
  Search,
  PostNotification,
  LikeNotification,
  Mention,
} from "@components/index";
import { Button } from "@nextui-org/react";
import { IoMdSettings } from "react-icons/io";
import {
  mockNotifications,
  mockLikedNotifications,
  mockMentions,
} from "mockData/mockData";

interface NotificationsProps {}
const Notifications: React.FC<NotificationsProps> = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [postnotifications] = useState<any[]>(mockNotifications);
  const [likedNotfications] = useState<any[]>(mockLikedNotifications);
  const [mentions] = useState<any[]>(mockMentions);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const getTimeDisplay = (timestamp: string) => {
    const currentTime = new Date();
    const parsedTimestamp = new Date(timestamp);

    const timeDiff = currentTime.getTime() - parsedTimestamp.getTime(); // Get time difference in milliseconds
    const minutesDiff = Math.floor(timeDiff / 60000); // Convert milliseconds to minutes

    let timeDisplay;
    if (minutesDiff < 60) {
      timeDisplay = `${minutesDiff}m`;
    } else {
      const hoursDiff = Math.floor(minutesDiff / 60); // Convert minutes to hours
      if (hoursDiff < 24) timeDisplay = `${hoursDiff}h`;
      else {
        const month = parsedTimestamp.toLocaleString("en-us", {
          month: "short",
        });
        const day = parsedTimestamp.getDate();
        timeDisplay = `${month} ${day}`;
      }
    }

    return timeDisplay;
  };
  return (
    <div className="container flex">
      <div className="nav flex justify-end w-1/4 m-0 p-0 mr-[3vh] pr-10">
        <Nav />
      </div>
      <div className="main-content w-2/5 m-0 p-0 border">
        <div className="flex flex-col w-full m-0 p-0 justify-center">
          {/* Notification Header */}
          <div className="flex justify-between items-center p-2">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <Button className="p-3 rounded-full border bg-white border-gray-300 items-center">
              <IoMdSettings className="mr-1" />
            </Button>
          </div>
          {/* Notifications Tabs */}
          <div className="flex w-full justify-around border-b border-gray-200 items-center">
            <div className="w-full">
              <div className="flex ">
                <button
                  className={`w-1/3 py-4 text-base font-semibold hover:bg-gray-200 ${
                    activeTab === "all" ? "text-blue-500" : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick("all")}
                >
                  All
                </button>
                <button
                  className={`w-1/3 py-4 text-base font-semibold hover:bg-gray-200 ${
                    activeTab === "verified" ? "text-blue-500" : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick("verified")}
                >
                  Verified
                </button>
                <button
                  className={`w-1/3 py-4 text-base font-semibold hover:bg-gray-200 ${
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
                    :{" "}
                    {likedNotfications.map((notification, index) => (
                      <LikeNotification
                        key={index}
                        id={index}
                        description={notification.message}
                        tweet={notification.tweet}
                        avatarUrl={notification.avatarUrl}
                      />
                    ))}{" "}
                    :{" "}
                    {mentions.map((mention, index) => (
                      <Mention
                        key={index}
                        id={index}
                        name={mention.Name}
                        username={mention.Username}
                        text={mention.Content}
                        imageUrl={mention.avatarUrl}
                        replyToUsername={mention.MentionedUser}
                        saves={1000}
                        comments={100}
                        retweets={100}
                        likes={100}
                        timeDisplay={getTimeDisplay(mention.Created_at)}
                      />
                    ))}
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
                {activeTab === "mentions" && (
                  <div>
                    {mentions.length === 0 ? (
                      <p className="text-center text-gray-500">
                        You have no mentions
                      </p>
                    ) : (
                      mentions.map((mention, index) => (
                        <Mention
                          key={index}
                          id={index}
                          name={mention.Name}
                          username={mention.Username}
                          text={mention.Content}
                          imageUrl={mention.avatarUrl}
                          replyToUsername={mention.MentionedUser}
                          saves={1000}
                          comments={100}
                          retweets={100}
                          likes={100}
                          timeDisplay={getTimeDisplay(mention.Created_at)}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-right w-1/4 ml-7 mt-2 pl-1 pr-2">
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
