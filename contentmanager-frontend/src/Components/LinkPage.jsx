import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/LinkPage.css';
import linkedinIcon from '../Assets/linkedin_logo.png';
import xIcon from '../Assets/x-logo.png';
import instagramIcon from '../Assets/instagram_logo.png';
import facebookIcon from '../Assets/facebook_logo.png';
import threadsIcon from '../Assets/threads_logo.png';


const LinkPage = () => {

const [showTwitterModal, setShowTwitterModal] = useState(false);
const [pin, setPin] = useState('');
const [resourceOwnerKey, setResourceOwnerKey] = useState('');
const [resourceOwnerSecret, setResourceOwnerSecret] = useState('');
 

const navigate = useNavigate();
const homeredirect = () => {
  navigate ('/post');
  
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
  const handleLinkedInSignIn = async () => {

    const email = getCookie('email_cookie');

    try {
      const response = await fetch('http://localhost:8000/linkedin/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }), // Include the email in the request
        });
      if (!response.ok) {
        throw new Error('Failed to sign in with LinkedIn');
      }
      const data = await response.json();
      const { success, access_token, user_id } = data;
      if (success) {
        // Set session data in cookies
        document.cookie = `token-id_cookie=${access_token}; path=/`;
        document.cookie = `user-id_cookie=${user_id}; path=/`;       
      } else {
        console.log('Sign-in with LinkedIn failed');
      }
    } catch (error) {
      console.error('Error signing in with LinkedIn:', error);
    }
  };

  const handleTwitterSignInInitiate = async () => {
    try {
      const response = await fetch('http://localhost:8000/twitter/signin/initiate');
      if (!response.ok) {
        throw new Error('Failed to initiate Twitter sign-in');
      }
      const data = await response.json();
      setResourceOwnerKey(data.resource_owner_key);
      setResourceOwnerSecret(data.resource_owner_secret);
      setShowTwitterModal(true); // Open the Twitter sign-in modal
    } catch (error) {
      console.error('Error initiating Twitter sign-in:', error);
      // Handle error
    }
  };

  const handleTwitterSignInSubmit = async () => {
    const email = getCookie('email_cookie');

    if (!pin || !resourceOwnerKey || !resourceOwnerSecret) {
      console.error('PIN, resource owner key, and resource owner secret are required');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/twitter/signin/complete?verifier=${pin}&resource_owner_key=${resourceOwnerKey}&resource_owner_secret=${resourceOwnerSecret}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
            }),
        });
      if (!response.ok) {
        throw new Error('Failed to complete Twitter sign-in');
      }
      const data = await response.json();
      const { access_token, access_token_secret } = data;

      // Save access token and access token secret in cookies
      document.cookie = `twitter_access_token=${access_token}; path=/`;
      document.cookie = `twitter_access_token_secret=${access_token_secret}; path=/`;
      setShowTwitterModal(false); // Close the Twitter sign-in modal
      setPin(''); // Reset PIN input
    } catch (error) {
      console.error('Error completing Twitter sign-in:', error);
      // Handle error
    }
  };
  
  const handleCloseTwitterModal = () => {
    setShowTwitterModal(false);
    setPin(''); // Reset PIN input
  };


  return (
    <div className="LinkPage">
      <div className="button-container">
        <button className="social-button linkedin" onClick={handleLinkedInSignIn}>
          <img src={linkedinIcon} alt="LinkedIn" /> Connect to LinkedIn
        </button>
        <button className="social-button X" onClick={handleTwitterSignInInitiate}>
          <img src={xIcon} alt="X" /> Connect to X
        </button>
        <button className="social-button instagram">
          <img src={instagramIcon} alt="Instagram" /> Connect to Instagram
        </button>
        <button className="social-button facebook">
          <img src={facebookIcon} alt="Facebook" /> Connect to Facebook
        </button>
        <button className="social-button threads">
          <img src={threadsIcon} alt="Threads" /> Connect to Threads
        </button>
        <button className="continue-button" onClick={homeredirect}>Continue</button>
        {showTwitterModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseTwitterModal}>&times;</span>
            <h2>Enter PIN for Twitter Sign In</h2>
            <input
              type="text"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <button onClick={handleTwitterSignInSubmit}>Submit</button>
            <button onClick={handleCloseTwitterModal}>Cancel</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default LinkPage;
