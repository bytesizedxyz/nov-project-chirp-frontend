// {"userId":7,"message":"Distributed solution-oriented contingency","deleted":true,"likes":16,"dislikes":33,"favorites":73,"created_at":"8/25/2001"},
import React from 'react';
import './Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faStar,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../ThemeProvider';
import Comment from '../Comment';

export default function Post(props) {
  const { chirp } = props;
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <div
          className={`
          post
          ${theme.brownBackground}
          ${theme.blueBackground}
          `}
        >
          <span className="profile-info">
            <img
              className="chirp-profile-image"
              src="https://media.licdn.com/dms/image/C5603AQELTaav4xJOkQ/profile-displayphoto-shrink_200_200/0?e=1548892800&v=beta&t=mC4qkBGQZDv4dJsJ3686-Ev7w1XJhVudOIVChTpZR-Q"
              alt="User"
            />
            <h3>Users Name</h3>
          </span>
          <span className="content">{chirp.message}</span>
          <span className="stats">
            <span className="votes">
              <span>
                {chirp.likes}{' '}
                <FontAwesomeIcon color={theme.iconColor} icon={faThumbsUp} />
              </span>
              <span>
                {chirp.hates}{' '}
                <FontAwesomeIcon color={theme.iconColor} icon={faThumbsDown} />
              </span>
              <span>
                {chirp.favorites}{' '}
                <FontAwesomeIcon color={theme.iconColor} icon={faStar} />
              </span>
            </span>
            <span className="date">
              {new Date(chirp.created_at).toLocaleDateString()}{' '}
              <FontAwesomeIcon color={theme.iconColor} icon={faClock} />
            </span>
          </span>
          <span className="comment-span">
            <Comment userName="MyUser" />
          </span>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}
