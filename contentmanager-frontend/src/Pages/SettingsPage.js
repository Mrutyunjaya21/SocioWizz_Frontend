import React from 'react';
import Sidebar from '../Components/SideBar';
import TopBar from '../Components/Topbar';
import Settings from '../Components/Settings';
import '../Styles/Settings.css';

const SettingsPage = () => {
  return (
    <div className="settings-page-container">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <Sidebar />

        {/* Settings Content */}
        <Settings />
      </div>
    </div>
  );
};

export default SettingsPage;
