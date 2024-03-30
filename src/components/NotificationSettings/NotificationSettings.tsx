import React from "react";
import { IoFilterOutline } from "react-icons/io5";
const NotificationSettings = () => {
  return (
    <div className="bg-white text-gray-800">
      <div className="p-4 border-b border-gray-300">
        <h4 className="text-gray-600">Notifications</h4>
        <p className="text-gray-500 mt-2">
          Select the kinds of notifications you get about your activities,
          interests, and recommendations.
        </p>
      </div>
      <div className="p-4">
        <div className="hover:bg-gray-100 p-2 rounded-md flex justify-between items-center">
          <div>
            <p className="font-semibold">Filters</p>
            <p className="text-gray-500">
              Choose the notifications you'd like to see — and those you don't.
            </p>
          </div>
          <svg
            className="h-6 w-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md flex justify-between items-center">
          <div>
            <p className="font-semibold">Preferences</p>
            <p className="text-gray-500">
              Select your preferences by notification type.
            </p>
          </div>
          <svg
            className="h-6 w-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
