import React, { useState , useEffect } from 'react';
import { format, addDays, isSameDay, parseISO, startOfDay } from 'date-fns';
import '../Styles/Calendar.css';
import linkedinIcon from '../Assets/linkedin_logo.png';
import x1Icon from '../Assets/twitter-logo.png';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import PostModal from './PostModal';

const Calendar = () => {
  const [currentDay, setCurrentDay] = useState(startOfDay(new Date()));
  const [activeFilters, setActiveFilters] = useState({ Twitter: true, LinkedIn: true });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [open, setOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [scheduledPosts, setScheduledPosts] = useState([]);



  useEffect(() => {
    fetchScheduledPosts();
  }, []);

  const fetchScheduledPosts = async () => {

    const email = getCookie('email_cookie');
    try {
      const response = await fetch('http://localhost:8000/get-scheduled-posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.scheduledPosts);
        setScheduledPosts(data.scheduledPosts);
      } else {
        console.error('Failed to fetch scheduled posts');
      }
    } catch (error) {
      console.error('Error fetching scheduled posts:', error);
    }
  };

  const handleDateTimeChange = (e) => {
    setSelectedDateTime(e.target.value);
  };

  const isLinkedInChecked = activeFilters.LinkedIn;
  const isTwitterChecked = activeFilters.Twitter;

  const toggleFilter = (platform) => {
    setActiveFilters(prev => ({ ...prev, [platform]: !prev[platform] }));
  };

  const handleMoreClick = (e, post) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setSelectedPost(post);
  };

  const handleMenuClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleReschedule = (e) => {
    e.stopPropagation();
    setOpen(true);
    handleMenuClose(e);
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }
    return null;
  };

  const handleDeleteTweet = async () => {
    const email = getCookie('email_cookie');

    if (selectedPost) {
      try {
        const response = await fetch('http://localhost:8000/delete-scheduled-tweet/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            scheduledTime: selectedPost.scheduledTime,
          }),
        });

        if (response.ok) {
          console.log('Post deleted successfully');
        } else {
          console.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
    
  };

  const handleDeleteLinkedIn = async () => {
    const email = getCookie('email_cookie');

    if (selectedPost) {
      try {
        const response = await fetch('http://localhost:8000/delete-scheduled-linkedin/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            scheduledTime: selectedPost.scheduledTime,
          }),
        });

        if (response.ok) {
          console.log('Post deleted successfully');
        } else {
          console.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }       
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      // Posting to multiple platforms based on user selection
      if (selectedPost.platforms.includes('Twitter') && selectedPost.platforms.includes('LinkedIn')) {
        await handleDeleteLinkedIn();
        await handleDeleteTweet();
      } else if (selectedPost.platforms.includes('LinkedIn')) {
        await handleDeleteLinkedIn();
      } else if (selectedPost.platforms.includes('Twitter')) {
        await handleDeleteTweet();
      }
    } catch (error) {
      // Display an alert on failure
      alert('Failed to post content. Please try again.');
    }  
    handleMenuClose(e);
  };

  const handleRescheduleTwitter = async () => {
    const email = getCookie('email_cookie');

    if (selectedPost) {
      try {
        const response = await fetch('http://localhost:8000/reschedule-tweet/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            oldScheduledTime: selectedPost.scheduledTime,
            newScheduledTime: selectedDateTime,
            content : selectedPost.content,
            images : selectedPost.images,
            id : selectedPost.id,
          }),
        });

        if (response.ok) {
          console.log('Post deleted successfully');
        } else {
          console.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleRescheduleLinkedin = async () => {
    const email = getCookie('email_cookie');

    if (selectedPost) {
      try {
        const response = await fetch('http://localhost:8000/reschedule-linkedin/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            oldScheduledTime: selectedPost.scheduledTime,
            newScheduledTime: selectedDateTime,
            content : selectedPost.content,
            images : selectedPost.images,
            id : selectedPost.id,
          }),
        });

        if (response.ok) {
          console.log('Post deleted successfully');
        } else {
          console.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleRescheduleConfirm = async (e) => {
    e.stopPropagation();
    try {
      // Posting to multiple platforms based on user selection
      if (selectedPost.platforms.includes('Twitter') && selectedPost.platforms.includes('LinkedIn')) {
        await handleRescheduleLinkedin();
        await handleRescheduleTwitter();
      } else if (selectedPost.platforms.includes('LinkedIn')) {
        await handleRescheduleLinkedin();
      } else if (selectedPost.platforms.includes('Twitter')) {
        await handleRescheduleTwitter();
      }
    } catch (error) {
      // Display an alert on failure
      alert('Failed to post content. Please try again.');
    }  
    handleMenuClose(e);
  };

  const handlePostClick = (e, post) => {
    if (!e.target.closest('.more-button')) {
      setSelectedPost(post);
      setShowPreview(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setShowPreview(false);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < 4; i++) {
      const day = addDays(currentDay, i);
      days.push(
        <div key={i} className="day-column">
          <h3 className="day-header">{format(day, 'EEE d')}</h3>
          {renderPostsForDay(day)}
        </div>
      );
    }
    return days;
  };

  const renderPostsForDay = (day) => {
    return scheduledPosts
      .filter(post => isSameDay(parseISO(post.scheduledTime), day))
      .filter(post => {
        const platforms = Array.isArray(post.platforms) ? post.platforms : [post.platforms];
        return platforms.some(platform => activeFilters[platform]);
      })
      .map(post => {
        const platforms = Array.isArray(post.platforms) ? post.platforms : [post.platforms];
        return (
          <div
            key={post.id}
            className="post-card"
            onClick={(e) => handlePostClick(e, post)}
          >
            <div className="post-header">
              <div className="post-card-icons">
                {platforms.includes('Twitter') && (
                  <img src={x1Icon} alt="Twitter" className="card-icon twitter" />
                )}
                {platforms.includes('LinkedIn') && (
                  <img src={linkedinIcon} alt="LinkedIn" className="card-icon linkedin" />
                )}
              </div>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton
                  size="small"
                  className="more-button"
                  sx={{
                    padding: 0,
                    margin: 0,
                    '& .MuiSvgIcon-root': {
                      fontSize: '1.25rem',
                    },
                  }}
                  onClick={(e) => handleMoreClick(e, post)}
                >
                  <MoreHorizIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  slotProps={{
                    style: {
                      padding: '0',
                      minWidth: '120px',
                    },
                  }}
                >
                  <MenuItem onClick={handleReschedule} style={{ color: 'black' }}>
                    Reschedule
                  </MenuItem>
                  <MenuItem onClick={(e) => handleDelete(e)} style={{ color: 'red' }}>
                    Delete
                  </MenuItem>
                </Menu>
              </Box>
            </div>
            <div className="post-content">{post.content}</div>
          </div>
        );
      });
  };

  const handlePreviousDays = () => {
    setCurrentDay(addDays(currentDay, -4));
  };

  const handleNextDays = () => {
    setCurrentDay(addDays(currentDay, 4));
  };

  const isAnyPlatformActive = isLinkedInChecked || isTwitterChecked;

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <p className="calendar-title">Calendar</p>

        <div className="platform-legend">
          <img
            src={x1Icon}
            alt="Twitter Icon"
            className="platform-icon twitter"
            onClick={() => toggleFilter('Twitter')}
            style={{
              cursor: 'pointer',
              filter: isTwitterChecked ? 'none' : 'grayscale(100%) brightness(50%)',
            }}
          />
          <img
            src={linkedinIcon}
            alt="LinkedIn Icon"
            className="platform-icon linkedin"
            onClick={() => toggleFilter('LinkedIn')}
            style={{
              cursor: 'pointer',
              filter: isLinkedInChecked ? 'none' : 'grayscale(100%) brightness(50%)',
            }}
          />
        </div>
      </div>

      <hr className="calendar-line" />

      {isAnyPlatformActive ? (
        <div className="calendar-navigation">
          <button className="nav-button" onClick={handlePreviousDays}>
            ←
          </button>

          <div className="week-view">{renderDays()}</div>

          <button className="nav-button" onClick={handleNextDays}>
            →
          </button>
        </div>
      ) : (
        <div className="no-platform-message">
          <p>Please select a platform</p>
        </div>
      )}
      {showPreview && selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} />
      )}

      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Select Date and Time</h2>
            <div className="modal-input-container">
              <label htmlFor="datetime-picker" className="modal-label">
                Date And Time Picker
              </label>
              <input
                type="datetime-local"
                id="datetime-picker"
                value={selectedDateTime}
                onChange={handleDateTimeChange}
                className="modal-input"
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleClose} className="modal-button cancel">
                Cancel
              </button>
              <button onClick={handleRescheduleConfirm} className="modal-button confirm">
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
