import React from 'react';
import { Nav } from '@components/index';

const Notifications = () => {
  return (
    <div className="notifications-page flex">
      < Nav />
      <div className="main-content flex-grow ml-72">
        <h1 className="text-2xl font-bold p-4">Notifications</h1>
        <p className="p-4">This is the Notifications page content.</p> 
    </div>
    </div>
  );
};

export default Notifications;
