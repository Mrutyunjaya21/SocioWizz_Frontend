import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/SignIn.css';
import linkedinLogo from '../Assets/linkedin_logo.png';
import xLogo from '../Assets/x_logo.png';
import googleLogo from '../Assets/google_logo.png';
import { useGoogleLogin } from '@react-oauth/google';

const SignInPage = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);

    const initiateGoogleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${response.access_token}` },
                });
                const email = res.data.email;
    
                // Save email in a cookie
                document.cookie = `email_cookie=${email}; path=/`;
    
                // Check user status in the database
                const statusResponse = await axios.post('http://localhost:8000/check-user-status/', { email });
                const { status } = statusResponse.data;
    
                // Navigate based on the status
                if (status === 'mapped') {
                    navigate('/post');
                } else if (status === 'no_linkedin') {
                    navigate('/link');
                } else if (status === 'no_email') {
                    // Save email if not already in the database
                    await axios.post('http://localhost:8000/save-email/', { email });
                    navigate('/form');
                }
            } catch (error) {
                console.error(error);
            }
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="container-wrapper">
            <div className="container">
                <div className="left">
                    <div className="content">
                        <h1>Welcome to <span>SocioWizz</span></h1>
                        <p>Now repurpose your posts in one click!</p>

                        {!isSignUp ? (
                            <>
                                <div className="social-buttons">
                                    <button className="continue-google" onClick={initiateGoogleLogin}>
                                        <img src={googleLogo} alt="Google Logo" className="icon" />
                                    </button>
                                    <button className="continue-linkedin">
                                        <img src={linkedinLogo} alt="LinkedIn Logo" className="icon" />
                                    </button>
                                    <button className="continue-x">
                                        <img src={xLogo} alt="Twitter Logo" className="icon" />
                                    </button>
                                </div>

                                <div className="or-separator">
                                    <div className="line"></div>
                                    <div className="or">OR</div>
                                    <div className="line"></div>
                                </div>

                                <div className="login-form">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                id="login-email"
                                                type="email"
                                                name="email"
                                                placeholder="Your Email"
                                                autoComplete="email"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                id="login-password"
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                required
                                            />
                                        </div>
                                    </form>
                                    <div className="buttons">
                                        <button className="login">Log in</button>
                                    </div>
                                    <p className="signup-text">
                                        Don't have an account?{" "}
                                        <a href="#" onClick={() => setIsSignUp(true)}>
                                            Sign Up
                                        </a>
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="signup-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            id="signup-name"
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            id="signup-email"
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            id="signup-password"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            id="signup-confirm-password"
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="submit">Sign Up</button>
                                </form>
                                <p className="signup-text">
                                    Already have an account?{" "}
                                    <a href="#" onClick={() => setIsSignUp(false)}>
                                        Log in
                                    </a>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="right">
                    <h1>Time to go Social.<br />All at once!</h1>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
