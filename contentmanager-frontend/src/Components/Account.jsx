import React from 'react';
import '../Styles/Account.css';

const Account = () => {
    return (
        <div className="account-container">
            {/* Profile Section */}
            <div className="profile-section">
                <img 
                    src="https://via.placeholder.com/150" 
                    alt="Profile" 
                    className="profile-picture" 
                />
                <div className="user-info">
                    <h2 className="user-name">John Doe</h2>
                    <p className="user-username">@johndoe</p>
                </div>
            </div>

            {/* Linked Accounts Section */}
            <div className="linked-accounts">
                <h3>Connected Accounts</h3>
                <div className="account-item">
                    <span>LinkedIn:</span> 
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        John Doe
                    </a>
                </div>
                <div className="account-item">
                    <span>X:</span> 
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                        @johndoe
                    </a>
                </div>
            </div>

            {/* Actions Section */}
            <div className="account-actions">
                <button className="action-button logout-button">Log Out</button>
                <button className="action-button delete-account-button">Delete Account</button>
            </div>
        </div>
    );
};

export default Account;
