import React from 'react';
import '../Styles/PostModal.css';
import linkedinIcon from '../Assets/linkedin_logo.png';
import x1Icon from '../Assets/twitter-logo.png';

const PostModal = ({ post, onClose }) => {
  const platforms = Array.isArray(post.platforms) ? post.platforms : [post.platforms];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icons">
            {platforms.includes('Twitter') && (
              <img src={x1Icon} alt="Twitter" className="modal-icon twitter" />
            )}
            {platforms.includes('LinkedIn') && (
              <img src={linkedinIcon} alt="LinkedIn" className="modal-icon linkedin" />
            )}
          </div>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostModal;