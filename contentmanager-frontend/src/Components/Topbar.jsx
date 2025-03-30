import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentIcon from '@mui/icons-material/Payment';
import '../Styles/Topbar.css';

function Topbar() {
  const navigate = useNavigate();

  const account = () => navigate('/account');
  const settings = () => navigate('/settings');
  const billing = () => navigate('/billing');

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="logo-wrapper">
          <img src="https://assets.zyrosite.com/AGB64283QWu6aw0Q/logo-1-AGB64zvPrZHwL6pq.svg" alt="SocioWizz Logo" className="brand-logo" />
        </div>
      </div>

      <div className="topbar-right">
        <List className="topbar-list">
        <ListItem className="topbar-list-item" onClick={billing}>
            <PaymentIcon className="topbar-icon" />
          </ListItem>

          <ListItem className="topbar-list-item" onClick={settings}>
            <SettingsIcon className="topbar-icon" />
          </ListItem>

          <ListItem className="topbar-list-item" onClick={account}>
            <AccountCircleIcon className="topbar-icon" />
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default Topbar;
