// AccountInfo.tsx
// import React from "react";

const AccountInfo = () => {
  return (
    <div className="bg-white text-gray-800">
      <div className="p-4 border-b border-gray-300">
        <h4 className="text-gray-600 font-semibold">Account information</h4>
      </div>
      <div className="p-4">
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Username</p>
          <p className="text-gray-500">@TessaEngel22</p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Phone</p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Email</p>
          <p className="text-gray-500">tessa.engelbrecht@gmail.com</p>
        </div>
        {/*<div className="h-1" />
         <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Verified</p>
          <p className="text-gray-500">
            No. <span className="text-blue-600 hover:underline cursor-pointer">Learn more</span>
          </p>
        </div> */}
        {/* <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Protected posts</p>
          <p className="text-gray-500">No</p>
        </div> */}
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Account creation</p>
          <p className="text-gray-500">Feb 23, 2024, 9:49:41 PM</p>
          <p className="text-gray-500">102.14.191.95 (South Africa)</p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Country</p>
          <p className="text-gray-500">South Africa</p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Languages</p>
          <p className="text-gray-500">English</p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Gender</p>
          <p className="text-gray-500">Female</p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Birth date</p>
          <p className="text-gray-500">Apr 15, 2003</p>
          <p className="text-gray-500">
            Add your date of birth to your profile.
          </p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Age</p>
          <p className="text-gray-500">20</p>
        </div>
        {/* <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Automation</p>
          <p className="text-gray-500">Manage your automated account.</p>
        </div> */}
      </div>
    </div>
  );
};

export default AccountInfo;
