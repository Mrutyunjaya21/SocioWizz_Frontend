import React from 'react';
import Sidebar from '../Components/SideBar';
import TopBar from '../Components/Topbar';
import Account from '../Components/Account';
import '../Styles/Account.css';

const AccountPage = () => {
    return (
        <div className="account-page-container">
            {/* Top Bar */}
            <TopBar />

            {/* Main Content */}
            <div className="main-content">
                {/* Sidebar */}
                <Sidebar />

                {/* Account Content */}
                <Account />
            </div>
        </div>
    );
};

export default AccountPage;
