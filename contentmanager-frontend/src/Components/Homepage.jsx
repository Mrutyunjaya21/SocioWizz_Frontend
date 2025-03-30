import React, { useState } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import "react-datetime/css/react-datetime.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Styles/Scheduler.css'; // Add custom styles
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const Homepage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [scheduledPosts, setScheduledPosts] = useState([]);

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleLinkedInPost = async (content, images) => {
    try {
      const accessToken = getCookie('token-id_cookie');
      const userId = getCookie('user-id_cookie');

      const imageData = await Promise.all(
        Array.from(images).map((file) => readFileAsDataURL(file))
      );

      const payload = JSON.stringify({
        content: content,
        images: imageData,
      });

      const response = await fetch('http://localhost:8000/linkedin/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'X-User-ID': userId,
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

  const scheduleTask = async () => {
    const selectedDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':').map(Number);
    selectedDateTime.setHours(hours);
    selectedDateTime.setMinutes(minutes);

    const now = new Date();
    const timeDifference = selectedDateTime.getTime() - now.getTime();

    if (timeDifference <= 0) {
      alert('Please select a future date and time.');
      return;
    }

    const imageData = await Promise.all(
      Array.from(images).map((file) => readFileAsDataURL(file))
    );

    const newPost = {
      datetime: selectedDateTime,
      content,
      images: imageData,
    };

    setScheduledPosts([...scheduledPosts, newPost]);

    setTimeout(() => {
      handleLinkedInPost(content, images);
    }, timeDifference);
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
  

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Schedule a LinkedIn Post</h1>
      <textarea
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: '100%', height: '100px', marginBottom: '10px' }}
      />
      <input
        type="file"
        multiple
        onChange={(e) => setImages(e.target.files)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
        />
        <TimePicker
          onChange={setSelectedTime}
          value={selectedTime}
          disableClock
        />
      </div>
      <button
        onClick={scheduleTask}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0073b1',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Schedule
      </button>
      <div className="calendar-preview">
        {scheduledPosts.map((post, index) => (
          <div key={index} className="calendar-preview-item">
            <div>
              <strong>{new Date(post.datetime).toLocaleString()}</strong>
            </div>
            <div>
              <p>{post.content}</p>
              {post.images.map((img, idx) => (
                <img key={idx} src={img} alt="Scheduled" style={{ width: '50px', height: '50px' }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
