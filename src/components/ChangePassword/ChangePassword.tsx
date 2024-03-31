// import React from 'react';

const ChangePassword = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Change your password</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Current password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
          Forgot password?
        </a>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">New password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Confirm password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
        Save
      </button>
    </div>
  );
};

export default ChangePassword;