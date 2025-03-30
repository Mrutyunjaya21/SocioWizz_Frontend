import React from 'react';
import Sidebar from '../Components/SideBar'; 
import TopBar from '../Components/Topbar';
import PostGenerator from '../Components/PostGenerator';
import '../Styles/PostGenerator.css';

const AiPost = () => {
    return (
        <div className="generate-post-container">
            {/* Top Bar */}
            <TopBar />

            {/* Main Content */}
            <div className="main-content">
                {/* Sidebar */}
                <Sidebar />

                {/* AI Post Generator */}
                <PostGenerator />
            </div>
        </div>
    );
};

export default AiPost;
