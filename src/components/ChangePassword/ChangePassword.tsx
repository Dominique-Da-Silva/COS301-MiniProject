// import React from 'react';
import React, { useState } from 'react';
import { changePassword } from '@services/index';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSavePassword = async () => {
    // Check if new password and confirm password match
    /*if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }*/

    const result = await changePassword(oldPassword, newPassword);
    if (result === 'success') {
      alert('Password changed successfully!');
    } else {
      alert('Failed to change password. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Change your password</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Current password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
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
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Confirm password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" onClick={handleSavePassword} >
        Save
      </button>
    </div>
  );
};

export default ChangePassword;