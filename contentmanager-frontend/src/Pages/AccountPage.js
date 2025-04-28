import React from 'react';
import Sidebar from '../Components/SideBar';
import Account from '../Components/Account';
import '../Styles/Account.css';

const AccountPage = () => {
    return (
        <div className="account-page-container">
            {/* Sidebar */}
            <div className="sidebar-container">
                <Sidebar />
            </div>
            
            {/* Account Content */}
            <div className="account-content">
                <Account />
            </div>
        </div>
    );
};

export default AccountPage;