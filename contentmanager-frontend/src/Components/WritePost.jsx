import React, { useState, useRef, useEffect , useContext} from 'react';
import { Box, Button, Grid, IconButton, Modal, TextField,Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { EmojiEmotions, FileCopy, Image, VideoLibrary, AttachFile, FormatBold, FormatItalic } from '@mui/icons-material';
import EmojiPicker from 'emoji-picker-react';
import '../Styles/WritePost.css';
import linkedinIcon from '../Assets/linkedin_logo.png';
import xIcon from '../Assets/x_logo.png';
import { TextContext } from '../Context/TextContext';
import {useScheduledPosts} from '../Context/ScheduleContext';


const WritePost = ({ onEditorStateChange }) => {
  const [content, setContent] = useState(''); 
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiButtonPosition, setEmojiButtonPosition] = useState({ top: 0, left: 0 });
  const [image, setImage] = useState(null);
  const [videos, setVideos] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isLinkedInChecked, setIsLinkedInChecked] = useState(false);
  const [isTwitterChecked, setIsTwitterChecked] = useState(false);
  const [lastEditedTime, setLastEditedTime] = useState(null);


  
  const { generatedText } = useContext(TextContext);
  const { addScheduledPost } = useScheduledPosts();
  const contentRef = useRef(null);
  
  const updateLastEditedTime = () => {
    setLastEditedTime(new Date());
  };
  const formatLastEditedTime = (date) => {
    if (!date) return '';
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  useEffect(() => {
    if (contentRef.current) {
        contentRef.current.innerHTML = generatedText;
        setContent(generatedText);
        updateLastEditedTime();
    }
}, [generatedText]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDateTimeChange = (e) => {
    setSelectedDateTime(e.target.value);
  };


  const applyStyle = (command) => {
    document.execCommand(command, false, null);
    contentRef.current.focus();
  };

  const toggleBold = () => {
    setIsBold((prev) => !prev);
    applyStyle('bold');
  };

  const toggleItalic = () => {
    setIsItalic((prev) => !prev);
    applyStyle('italic');
  };

  const copyToClipboard = () => {
    const editorContent = contentRef.current.innerHTML;
    navigator.clipboard.writeText(editorContent);
    alert('Copied to clipboard!');
  };

 const handleEmojiClick = (emojiData) => {
  const { emoji } = emojiData;
  const editor = contentRef.current;
  contentRef.current.innerHTML += emoji;
  editor.focus();
  const newContent = content + emoji;
  setShowEmojiPicker(false);
  setContent(newContent);
};
  const handleEmojiButtonClick = (event) => {
    const { top, left, height } = event.currentTarget.getBoundingClientRect();
    setEmojiButtonPosition({ top: top + height + window.scrollY, left: left + window.scrollX });
    setShowEmojiPicker((prev) => !prev);
  };

  useEffect(() => {
    if (onEditorStateChange) {
      onEditorStateChange(content);
      updateLastEditedTime();
    }
  }, [content, onEditorStateChange]); // Removed contentRef.current from the dependencies

  const handleImageInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = handleImageChange;
    input.click();
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const imageFiles = files[0];
      setImage(imageFiles);
    }
  };

  const handleVideoInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.multiple = true;
    input.onchange = handleVideoChange;
    input.click();
  };

  const handleVideoChange = (e) => {
    const files = e.target.files;
    if (files) {
      const videoFiles = files[0];
      setVideos(videoFiles);
    }
  };

  const handleDocumentInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.multiple = true;
    input.onchange = handleDocumentChange;
    input.click();
  };

  const handleDocumentChange = (e) => {
    const files = e.target.files;
    if (files) {
      const documentFiles = files[0];
      setDocuments(documentFiles);
    }
  };

  const handlePost = async () => {
    const email = getCookie('email_cookie');
    const content = contentRef.current.innerHTML
  
    // Ensure image data is properly read
    const imageData = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      if (image) {
        reader.readAsDataURL(image); // Ensure 'image' is defined before reading
      } else {
        resolve(null); // Handle case when no image is selected
      }
    });
  
    // Create the payload with content and image data
    const payload = JSON.stringify({
      email: email,
      content: content,
      images: imageData ? [imageData] : [], // Ensure images is an array, even if empty
    });
  
    try {
      // Posting to multiple platforms based on user selection
      if (isLinkedInChecked && isTwitterChecked) {
        await handleLinkedInPost(payload);
        await handleTwitterPost(payload);
      } else if (isLinkedInChecked) {
        await handleLinkedInPost(payload);
      } else if (isTwitterChecked) {
        await handleTwitterPost(payload);
      }
    } catch (error) {
      // Display an alert on failure
      alert('Failed to post content. Please try again.');
    }    
  };

  const handleSchedule = async () => {
    const email = getCookie('email_cookie');
    const content = contentRef.current.innerHTML;
  
    const imageData = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      if (image) {
        reader.readAsDataURL(image);
      } else {
        resolve(null);
      }
    });
  
    const payload = JSON.stringify({
      id: Date.now(),
      email: email,
      content: content,
      images: imageData ? [imageData] : [],
      scheduledTime: selectedDateTime,
      platforms: [isLinkedInChecked ? 'LinkedIn' : '', isTwitterChecked ? 'Twitter' : ''].filter(Boolean),
    });
  
    const newScheduledPost = {
      id: Date.now(),
      email: email,
      images: imageData ? [imageData] : [],
      content: content,
      scheduledTime: selectedDateTime,
      platforms: [isLinkedInChecked ? 'LinkedIn' : '', isTwitterChecked ? 'Twitter' : ''].filter(Boolean),
    };
  
    console.log(newScheduledPost);
  
    // Parallel execution using Promise.all
    try {
      const platformPromises = [];
  
      // Schedule to LinkedIn
      if (isLinkedInChecked) {
        platformPromises.push(handleLinkedInSchedule(payload));
        console.log('LinkedIn scheduled');
      }
  
      // Schedule to Twitter
      if (isTwitterChecked) {
        platformPromises.push(handleTwitterSchedule(payload));
      }
  
      // Add schedule-post API call to the list of promises
      platformPromises.push(
        fetch('http://localhost:8000/schedule-post/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
        })
      );
  
      // Wait for all promises to resolve
      const responses = await Promise.all(platformPromises);
  
      // Check the server response for the API call
      const apiResponse = responses[responses.length - 1]; // last response from the fetch API call
  
      if (!apiResponse.ok) {
        throw new Error('Failed to schedule post on the server.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      alert('Failed to post content. Please try again.');
    }
  };
  

  

  const handleLinkedInPost = async (payload) => {
    try {
      const response = await fetch('http://localhost:8000/linkedin/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error('Failed to post content on LinkedIn');
      }

      const data = await response.json();
      if (data.success) {
        console.log('Content posted successfully on LinkedIn');
      } else {
        throw new Error('Failed to post content on LinkedIn');
      }
    } catch (error) {
      console.error('Error handling LinkedIn post:', error);
      throw error;
    }
  };
  const handleLinkedInSchedule = async (payload) => {
    try {
      
      const response = await fetch('http://localhost:8000/linkedin/schedulepost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });


      if (!response.ok) {
        throw new Error('Failed to schedule post');
      }

      const data = await response.json();
      if (data.success) {
        console.log('Post scheduled successfully');
      } else {
        throw new Error('Failed to schedule post');
      }
    } catch (error) {
      console.error('Error scheduling post:', error);
      alert('Failed to schedule post. Please try again.');
    }
  };


  const handleTwitterPost = async (payload) => {
    try {
      const response = await fetch('http://localhost:8000/twitter/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });
      
      console.log(payload);
  
      if (!response.ok) {
        throw new Error('Failed to post tweet on Twitter');
      }
  
      const data = await response.json();
      console.log('Tweet posted successfully on Twitter:', data);
    } catch (error) {
      console.error('Error posting tweet on Twitter:', error);
      throw error;
    }
  };
  const handleTwitterSchedule = async (payload) => {
    try {
      const response = await fetch('http://localhost:8000/twitter/schedulepost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to schedule post');
      }
  
      const data = await response.json();
      if (data.success) {
        console.log('Post scheduled successfully');
      } else {
        throw new Error('Failed to schedule post');
      }
    } catch (error) {
      console.error('Error scheduling post:', error);
      alert('Failed to schedule post. Please try again.');
    }
  };
  


  const handleIconClick = (platform) => {
    if (platform === 'both') {
      const newState = !(isLinkedInChecked && isTwitterChecked);
      setIsLinkedInChecked(newState);
      setIsTwitterChecked(newState);
    } else if (platform === 'linkedin') {
      setIsLinkedInChecked(!isLinkedInChecked);
    } else if (platform === 'twitter') {
      setIsTwitterChecked(!isTwitterChecked);
    }
  };
  const isPostButtonDisabled = !isLinkedInChecked && !isTwitterChecked;

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

  return (
    <div className="write-post-container">
      <div className="write-post-header">
        <span className="write-post-title">Write Post</span>
        <div className="write-post-icons">
          <img src={linkedinIcon} alt="LinkedIn" className='logo' onClick={() => handleIconClick('linkedin')} style={{
            cursor: 'pointer',
            filter: isLinkedInChecked ? 'none' : 'grayscale(100%) brightness(50%)',
          }}/>
          <img src={xIcon} alt="X" className='logo-x' onClick={() => handleIconClick('twitter')} 
          style={{
            cursor: 'pointer',
            filter: isTwitterChecked ? 'none' : 'grayscale(100%) brightness(50%)',
          }}/>
        </div>
      </div>

      <hr className="write-post-line" />

      <div className={`editor-container`}>
        <div className="editor-toolbar" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, auto)', gap: '10px' }}>
          <IconButton onClick={toggleBold} className={isBold ? 'active' : ''} size="small">
            <FormatBold fontSize="small" />
          </IconButton>
          <IconButton onClick={toggleItalic} className={isItalic ? 'active' : ''} size="small">
            <FormatItalic fontSize="small" />
          </IconButton>
          <IconButton onClick={handleEmojiButtonClick} size="small">
            <EmojiEmotions fontSize="small" />
          </IconButton>
          <IconButton onClick={copyToClipboard} size="small">
            <FileCopy fontSize="small" />
          </IconButton>
          <IconButton onClick={handleImageInput} size="small">
            <Image fontSize="small" />
          </IconButton>
          <IconButton onClick={handleVideoInput} size="small">
            <VideoLibrary fontSize="small" />
          </IconButton>
          <IconButton onClick={handleDocumentInput} size="small">
            <AttachFile fontSize="small" />
          </IconButton>
        </div>

        <hr className="write-post-line" />

        <div
          contentEditable="true"
          ref={contentRef}
          className="editor-text-area"
          style={{
            padding: '10px',
            minHeight: '200px',
            border: 'none',
            outline: 'none',
            width: '100%',
            whiteSpace: 'pre-wrap',
          }}
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
        ></div>
      </div>

      {showEmojiPicker && (
        <div
          className="emoji-picker-container"
          style={{ top: emojiButtonPosition.top, left: emojiButtonPosition.left }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <hr className="semi-solid-line" />

      <div className="timestamp">
        {lastEditedTime ? `Last Edited on ${formatLastEditedTime(lastEditedTime)}` : 'Not edited yet'}
      </div>

      <hr className="write-post-line" />

      <div className="button-container">
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ display: 'inline-block' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#F5F5F5',
                  color: 'black',
                  borderRadius: '8px',
                  padding: '6px 16px',
                  height: '36px',
                  minWidth: '130px',
                  fontSize: '14px',
                  textTransform: 'none',
                }}
              >
                Save as Draft
              </Button>
            </div>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ display: 'inline-block', marginRight: '10px' }}>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderColor: '#D1D5DB',
                  borderRadius: '8px',
                  padding: '6px 16px',
                  height: '36px',
                  minWidth: '100px',
                  fontSize: '14px',
                  textTransform: 'none',
                }}
                onClick={handleOpen} 
              >
                Schedule
              </Button>

            </div>
            <div style={{ display: 'inline-block' }}>
              <Button
                onClick={handlePost}
                variant="contained"
                sx={{
                  backgroundColor: '#6366F1',
                  color: 'white',
                  borderRadius: '8px',
                  padding: '6px 16px',
                  height: '36px',
                  minWidth: '130px',
                  fontSize: '14px',
                  textTransform: 'none',
                }}
              >
                Publish →
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
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
              <button onClick={handleSchedule} className="modal-button confirm">
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritePost;