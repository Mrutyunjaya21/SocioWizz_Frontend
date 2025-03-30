import React from 'react';
import Sidebar from '../Components/SideBar';
import TopBar from '../Components/Topbar';
import AnalyticsTab from '../Components/AnalyticsTab'; // Import the AnalyticsTab component
import '../Styles/AnalyticsTab.css'; // Import the corresponding CSS file

const AnalyticsPage = () => {
    return (
        <div className="analytics-page-container">
            {/* Top Bar */}
            <TopBar />

            {/* Main Content */}
            <div className="main-content">
                {/* Sidebar */}
                <Sidebar />

                {/* Analytics Content */}
                <AnalyticsTab />
            </div>
        </div>
    );
};

export default AnalyticsPage;