// src/Pages/RepurposePage.js
import React from 'react';
import TopBar from '../Components/Topbar';
import Sidebar from '../Components/SideBar';
import Repurpose from '../Components/Repurpose';
import '../Styles/Repurpose.css';

const RepurposePage = () => {
  return (
    <div className="repurpose-page-container">
      <TopBar />
      <div className="main-content">
        <Sidebar />
        <Repurpose />
      </div>
    </div>
  );
};

export default RepurposePage;
