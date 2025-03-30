import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { IconButton } from '@mui/material';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TabletIcon from '@mui/icons-material/Tablet';
import LaptopIcon from '@mui/icons-material/Laptop';
import '../Styles/PostPreview.css';

const PostBox = ({ content, reactionsImg, linkedinImg, profileImg, worldIcon }) => {
  const [device, setDevice] = useState('mobile');

  const sanitizedContent = DOMPurify.sanitize(content);

  const handleDeviceChange = (deviceType) => {
    setDevice(deviceType);
  };

  return (
    <>
      {/* Post Preview Header Box */}
      <div className="preview-header-box">
        <div className="preview-header">
          <h3 className="preview-title">Post Preview</h3>
          <div className="device-icons-container">
          <span className="device-label">Devices :</span>
            <IconButton
              onClick={() => handleDeviceChange('mobile')}
              size="small"
              className={`device-icon ${device === 'mobile' ? 'selected' : ''}`}
            >
              <SmartphoneIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => handleDeviceChange('tablet')}
              size="small"
              className={`device-icon ${device === 'tablet' ? 'selected' : ''}`}
            >
              <TabletIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => handleDeviceChange('laptop')}
              size="small"
              className={`device-icon ${device === 'laptop' ? 'selected' : ''}`}
            >
              <LaptopIcon fontSize="small" />
            </IconButton>

          </div>
        </div>
      </div>

      {/* Post Content Box */}
      <div className="post-content-box">
        <div className={`post-box ${device}`}>
          <div className="post-header">
            <div className="profile-container">
              <img src={profileImg} alt="Profile" className="profile-image" />
              <img src={linkedinImg} alt="LinkedIn" className="linkedin-icon" />
            </div>
            <div className="post-info">
              <span className="time-text">Now</span>
              <img src={worldIcon} alt="World Icon" className="world-icon" />
            </div>
          </div>
          <div className={`content ${device}`}>
            <div className="text-display" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
          <div className="post-footer">
            <div className="reactions-comments">
              <img src={reactionsImg} alt="Reactions" className="reactions-image" />
              <span>88</span>
            </div>
            <div className="comments-repost">
              <span>4 comments</span> • <span>1 repost</span>
            </div>
          </div>
          <hr className="solid-line" />
          <div className="interaction-buttons">
            <button className="preview-action-button">Like</button>
            <button className="preview-action-button">Comment</button>
            <button className="preview-action-button">Share</button>
            <button className="preview-action-button">Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostBox;
