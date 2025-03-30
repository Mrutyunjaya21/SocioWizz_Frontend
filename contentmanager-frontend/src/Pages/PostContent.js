import React, { useState } from 'react';
import '../Styles/CreatePost.css';
import TopBar from '../Components/Topbar';
import Sidebar from '../Components/SideBar'; // Adjust the path as necessary
import WritePost from '../Components/WritePost';
import PostBox from '../Components/PostPreview';
import reactionsImg from '../Assets/reactions.png';
import linkedinImg from '../Assets/linkedin_logo.png';
import profileImg from '../Assets/google_logo.png';
import worldIcon from '../Assets/download.png';

const PostContent = () => {
  const [editorContent, setEditorContent] = useState('');

  // Handles the editor's text state
  const handleEditorStateChange = (editorState) => {
    setEditorContent(editorState); // Store the raw content as string
  };

  return (
    <div className="create-post-container">
      {/* Top Bar */}
      <TopBar />
      <div className='sidebar-postpage'>
        <Sidebar />
      </div> {/* Sidebar component is now included here */}
      <div className="main-content">
        <WritePost onEditorStateChange={handleEditorStateChange} />
        <div className="post-preview-area">
          {/* Pass the HTML content to the PostBox for preview */}
          <PostBox 
            content={editorContent}
            reactionsImg={reactionsImg}
            linkedinImg={linkedinImg}
            profileImg={profileImg}
            worldIcon={worldIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default PostContent;
