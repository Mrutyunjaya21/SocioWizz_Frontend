import React, { useState } from 'react';
import Sidebar from '../Components/SideBar'; 
import Calendar from '../Components/Calendar';
import '../Styles/Calendar.css';

const CalendarPage = () => {

    return (
        <div className="calendar-page">
            <div className='sidebar-calendar'>
                <Sidebar />
            </div>
            <div className="calendar-main">
                <Calendar />
            </div>
        </div>
    );
}

export default CalendarPage;