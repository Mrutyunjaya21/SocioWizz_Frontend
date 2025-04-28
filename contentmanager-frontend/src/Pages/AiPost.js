import React, { useState } from 'react';
import Sidebar from '../Components/SideBar'; 
import PostGenerator from '../Components/PostGenerator';
import '../Styles/PostGenerator.css';


const AiPost = () => {


    return (
        <div className="generate-post-container">
            <div className='sidebar-generator'>
                <Sidebar />
            </div>
            <div className="AiPost">
                <PostGenerator />
            </div>
        </div>
    );
};

export default AiPost;
