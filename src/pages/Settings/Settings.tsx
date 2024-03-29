import { Nav, AccountInfo } from "@components/index";
import React, { useState } from "react";
import {  Link, Spacer } from "@nextui-org/react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const renderSettingsContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountInfo />;
      case 'monetization':
        return <div>Monetization settings</div>;
      case 'premium':
        return <div>Premium settings</div>;
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
        <div className="flex flex-col m-0 p-0 justify-center">
          <h3>Settings</h3>
          <div className="mt-4">
            <Link href="#" onClick={() => setActiveTab('account')}>
              <p>Your account</p>
            </Link>
            <Spacer y={0.5} />
            <Link href="#" onClick={() => setActiveTab('monetization')}>
              <p>Monetization</p>
            </Link>
            <Spacer y={0.5} />
            <Link href="#" onClick={() => setActiveTab('premium')}>
              <p>Premium</p>
            </Link>
            {/* Add more links for other settings */}
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
