import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem } from '@mui/material';
import CreateIcon from '@mui/icons-material/CallReceived';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import '../Styles/Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const create_post = () => navigate('/post');
  const calendar = () => navigate('/calendar');
  const ai_post_generator = () => navigate('/generate');
  const carousel = () => navigate('/slide');
  const account = () => navigate('/account'); // Added navigation function for Account Page

  return (
    <div className="sidebar">
      {/* Create Post Button */}
      <div className="create-post-btn" onClick={create_post}>
        <div className="btn-content">
          <div className="create-icon-wrapper">
            <CreateIcon className="create-icon" />
          </div>
          <div className="create-text">Create Post</div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <List className="sidebar-list">
        <ListItem className="sidebar-list-item" onClick={calendar}>
          <div className="icon-wrapper">
            <CalendarTodayIcon className="sidebar-icon" />
          </div>
          <div className="text-wrapper">
            <span className="sidebar-text">Calendar</span>
          </div>
        </ListItem>

        <ListItem className="sidebar-list-item" onClick={carousel}>
          <div className="icon-wrapper">
            <ViewCarouselIcon className="sidebar-icon" />
          </div>
          <div className="text-wrapper">
            <span className="sidebar-text">Carousel</span>
          </div>
        </ListItem>

        <ListItem className="sidebar-list-item">
          <div className="icon-wrapper">
            <AnalyticsIcon className="sidebar-icon" />
          </div>
          <div className="text-wrapper">
            <span className="sidebar-text">Analytics</span>
          </div>
        </ListItem>

        <ListItem className="sidebar-list-item" onClick={ai_post_generator}>
          <div className="icon-wrapper">
            <AutoFixHighIcon className="sidebar-icon" />
          </div>
          <div className="text-wrapper">
            <span className="sidebar-text">AI Post Generator</span>
          </div>
        </ListItem>

        <ListItem className="sidebar-list-item" style={{ marginBottom: '56px' }}>
          <div className="icon-wrapper">
            <CheckCircleIcon className="sidebar-icon" />
          </div>
          <div className="text-wrapper">
            <span className="sidebar-text">Repurpose</span>
          </div>
        </ListItem>
      </List>

      {/* Accounts & Settings at the Bottom */}
      <div className="sidebar-bottom">
        <ListItem className="sidebar-list-item" onClick={account}> {/* Updated onClick */}
          <div className="icon-wrapper">
            <AccountCircleIcon className="sidebar-icon" />
          </div>
          <div className="text-wrapper">
            <span className="sidebar-text">Account</span>
          </div>
        </ListItem>

        <ListItem className="sidebar-list-item">
          <div className="icon-wrapper">
            <SettingsIcon className="sidebar-icon" />
          </div>
          <div className="text-wrapper">
            <span className="sidebar-text">Settings</span>
          </div>
        </ListItem>
      </div>
    </div>
  );
}

export default Sidebar;
