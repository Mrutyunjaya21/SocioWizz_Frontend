import React from 'react';
import Sidebar from '../Components/SideBar';
import TopBar from '../Components/Topbar';
import Billings from '../Components/Billings';  // Component
import '../Styles/Billings.css';

const BillingPage = () => {
  return (
    <div className="billing-page-container">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <Sidebar />

        {/* Billing Component */}
        <Billings />
      </div>
    </div>
  );
};

export default BillingPage;
