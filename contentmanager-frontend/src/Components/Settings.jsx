import React from 'react';
import '../Styles/Settings.css';

function Settings() {
  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      <div className="settings-content">
        <p className="settings-description">Manage your settings, privacy preferences, and more.</p>
        <button className="settings-btn">Update Settings</button>
      </div>
    </div>
  );
}

export default Settings;