import React from 'react';
import './Post.css';

export const Comment = () => {
  return (
    <div className="comment-body">
      <span>
        <span className="comment-header">
          <img
            className="comment-profile-image"
            src="https://www.neweurope.eu/wp-content/uploads/2018/02/h_53880267.jpg"
            alt="A user visual identifier."
          />
          <h4>Users Name:</h4>
          <p>Hi, I'm a comment!</p>
        </span>
        <span className="reply-bar">
          <p>Like</p>
          <p>Hate</p>
          <p>Reply</p>
        </span>
      </span>

      <span className="reply-input">
        <input type="text" />
        <p>Send</p>
      </span>

      {/* <span className="reply-header">
        <img
          className="reply-profile-image"
          src="https://www.neweurope.eu/wp-content/uploads/2018/02/h_53880267.jpg"
          alt="A user visual identifier."
        />
        <h4>Users Name:</h4>
        <p>Hi, I'm a comment!</p>
      </span> */}
    </div>
  );
};
