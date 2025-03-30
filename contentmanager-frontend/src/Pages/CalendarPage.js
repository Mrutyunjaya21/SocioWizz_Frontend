import React from 'react';
import Sidebar from '../Components/SideBar'; 
import TopBar from '../Components/Topbar';
import Calendar from '../Components/Calendar';
import '../Styles/Calendar.css';

const CalendarPage = () => {
    return (
        <div className="calendar-page-container">
            {/* Top Bar */}
            <TopBar />

            {/* Main Content */}
            <div className="main-content">
                {/* Sidebar */}
                <Sidebar />

                {/* Calendar Content */}
                <Calendar />
            </div>
        </div>
    );
};

export default CalendarPage;