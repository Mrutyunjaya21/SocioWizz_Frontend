import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import profileImage from '../Assets/profile-image.jpeg';
import followersIcon from '../Assets/followers.svg';
import connectionsIcon from '../Assets/connections.svg';
import linkedinIcon from '../Assets/linkedin.svg';
import '../Styles/AnalyticsTab.css'; // Importing CSS styles

const dummyFollowersData = [
    { date: 'Nov 16', followers: 500, connections: 300 },
    { date: 'Nov 17', followers: 600, connections: 320 },
    { date: 'Nov 18', followers: 750, connections: 350 },
    { date: 'Nov 19', followers: 820, connections: 380 },
    { date: 'Nov 20', followers: 900, connections: 410 },
    { date: 'Nov 21', followers: 1020, connections: 450 }
];

const dummyEngagementData = [
    { date: 'Nov 16', reactions: 2000, comments: 100, reposts: 50 },
    { date: 'Nov 17', reactions: 2500, comments: 150, reposts: 75 },
    { date: 'Nov 18', reactions: 3000, comments: 170, reposts: 100 },
    { date: 'Nov 19', reactions: 5000, comments: 250, reposts: 130 },
    { date: 'Nov 20', reactions: 6000, comments: 290, reposts: 150 },
    { date: 'Nov 21', reactions: 5500, comments: 270, reposts: 140 }
];

const AnalyticsTab = () => {
    return (
        <div className="analytics-tab-container">
            {/* Header Section */}
            <div className="analytics-header">
                <h2>Analytics Overview</h2>
                <p>Track your content performance with key insights.</p>
            </div>

            {/* Analytics Content */}
            <div className="analytics-content">
                {/* Card 1: Total Followers & Connections */}
                <div className="profile-card">
                    <div className="profile-info">
                        <img src={profileImage} alt="Profile" className="profile-image" />
                        <div className="profile-details">
                            <h3>Mrutyunjaya Mohapatra</h3>
                            <p>AI Product Manager | Software Builder <br /> Building Products that impact on scale</p>
                        </div>
                    </div>

                    <div className="profile-metrics">
                        <div className="metric">
                            <div className="metric-icon">
                                <img src={followersIcon} alt="Followers" />
                            </div>
                            <div>
                                <span className="metric-label">Number of Followers</span>
                                <h2>12,340</h2>
                            </div>
                        </div>

                        <div className="metric">
                            <div className="metric-icon">
                                <img src={connectionsIcon} alt="Connections" />
                            </div>
                            <div>
                                <span className="metric-label">Connections</span>
                                <h2>8,760</h2>
                            </div>
                        </div>
                    </div>

                    <div className="linkedin-button">
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <img src={linkedinIcon} alt="LinkedIn" />
                        </a>
                    </div>
                </div>

                {/* Card 2: Followers & Connections Growth */}
                <div className="analytics-card">
                    <div className="analytics-header">
                        <h3>Followers & Connections Growth</h3>
                        <div className="calendar-picker">
                            <input type="date" />
                        </div>
                    </div>

                    {/* Growth Metrics */}
                    <div className="growth-metrics">
                        <div className="metric">
                            <div className="metric-icon">
                                <img src={followersIcon} alt="Followers" />
                            </div>
                            <div>
                                <span className="metric-label">Followers Growth</span>
                                <h2>225 <span className="growth-up">↑ 4.60%</span></h2>
                            </div>
                        </div>

                        <div className="metric">
                            <div className="metric-icon">
                                <img src={connectionsIcon} alt="Connections" />
                            </div>
                            <div>
                                <span className="metric-label">Connections Growth</span>
                                <h2>83 <span className="growth-down">↓ 1.20%</span></h2>
                            </div>
                        </div>
                    </div>

                    {/* Graph */}
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dummyFollowersData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="followers" stroke="#007bff" strokeWidth={2} />
                            <Line type="monotone" dataKey="connections" stroke="#28a745" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Card 3: Engagement Growth */}
                <div className="analytics-card">
                    <h3>Engagement Growth</h3>
                    <div className="calendar-picker">
                        <input type="date" />
                    </div>

                    <div className="growth-metrics">
                        <div className="metric-box">
                            <h4>Reactions Growth</h4>
                            <p className="metric-value">+4,842</p>
                            <span className="metric-trend positive">↑ 18.70%</span>
                        </div>
                        <div className="metric-box">
                            <h4>Comments Growth</h4>
                            <p className="metric-value">+393</p>
                            <span className="metric-trend negative">↓ 3.40%</span>
                        </div>
                        <div className="metric-box">
                            <h4>Reposts Growth</h4>
                            <p className="metric-value">+195</p>
                            <span className="metric-trend positive">↑ 7.20%</span>
                        </div>
                    </div>

                    {/* Graph */}
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dummyEngagementData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="reactions" stroke="#6f42c1" strokeWidth={2} />
                            <Line type="monotone" dataKey="comments" stroke="#17a2b8" strokeWidth={2} />
                            <Line type="monotone" dataKey="reposts" stroke="#e83e8c" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Card 4: Post Performance Table */}
                <div className="analytics-card">
                    <h3>Post Performance</h3>
                    <div className="calendar-picker">
                        <input type="date" />
                        <input type="date" />
                    </div>

                    <table className="analytics-table">
                        <thead>
                            <tr>
                                <th>Post</th>
                                <th>Type</th>
                                <th>Reactions</th>
                                <th>Comments</th>
                                <th>Reposts</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>"Exciting update..."</td>
                                <td>Text</td>
                                <td>340</td>
                                <td>120</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>"Launching soon..."</td>
                                <td>Image</td>
                                <td>620</td>
                                <td>230</td>
                                <td>45</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsTab;
