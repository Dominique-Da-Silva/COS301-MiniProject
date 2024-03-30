import { Nav, AccountInfo, NotificationSettings,DisplaySettings } from "@components/index";
import React, { useState } from "react";
import { Link, Spacer } from "@nextui-org/react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const renderSettingsContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountInfo />;
      case "Notifications":
        return <NotificationSettings />;
      case "Display":
        return <DisplaySettings/>;
      // Add cases for other tabs
      default:
        return null;
    }
  };

  return (
    <div className="container flex">
      <div className="nav flex justify-end w-1/4 m-0 p-0 mr-[3vh] pr-10">
        <Nav />
      </div>
      <div className="main-content flex w-2/5 m-0 p-0 border">
        <div className="flex flex-col m-0 p-0">
          <div className="p-4 border-b border-gray-300">
            <h2 className="text-gray-600 font-semibold">SETTINGS</h2>
          </div>
          <div className="mt-4">
            <div className="hover:bg-gray-100 p-2 rounded-md">
              <Link href="#" onClick={() => setActiveTab("account")}>
                <p className="font-semibold">Your account</p>
              </Link>
            </div>
            <div className="hover:bg-gray-100 p-2 rounded-md">
              <Link href="#" onClick={() => setActiveTab("Notifications")}>
                <p className="font-semibold">Notification settings</p>
              </Link>
            </div>
            <div className="hover:bg-gray-100 p-2 rounded-md">
              <Link
                href="#"
                onClick={() =>
                  setActiveTab("Display")
                }
              >
                <p className="font-semibold">
                Display
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-right w-1/4 ml-7 mt-2 pl-1 pr-2">
        {renderSettingsContent()}
      </div>
    </div>
  );
};

export default Settings;
