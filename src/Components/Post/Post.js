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
import { Card } from 'semantic-ui-react';
import { ThemeContext } from '../../ThemeProvider';
import Comment from '../Comments';
import Gravatar from 'gravatar-react';

export default function Post(props) {
  const email = JSON.parse(localStorage.getItem('_user_prof')).email;
  const user = JSON.parse(localStorage.getItem('_user_prof')).user;
  const { chirp, updateChirp } = props;
  const updateVotes = e => {
    const voteName = e.target.dataset.testid;
    const uuid = chirp.uuid;
    fetch(
      `https://nov-chirp-backend.herokuapp.com/chirp/reaction/${voteName}/${uuid}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        }
      }
    )
      .then(res => res.json())
      .then(res => {
        const objKeys = Object.keys(res.data);
        updateChirp({ [objKeys[0]]: res.data[objKeys[0]] }, uuid);
      })
      .catch(err => {
        console.log('error happened, printed below');
        console.log(err);
      });
  };
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <Card color={theme.brownBackground ? 'red' : 'white'}>
          <Card.Content>
            <Card.Header>
              <span className="profile-info">
                <Gravatar
                  email={email}
                  size={100}
                  rating="PG"
                  alt="Profile Avatar"
                  default="monsterid"
                  secure
                  style={{
                    borderRadius: '50%'
                  }}
                />
                <h3
                  style={{
                    fontSize: '24px',
                    position: 'relative',
                    bottom: '20px',
                    left: '20px'
                  }}
                >
                  {user}
                </h3>
              </span>
            </Card.Header>

            <Card.Description>
              <span>{chirp.message}</span>
              <span className="stats">
                <span className="votes">
                  <span data-testid="like" onClick={updateVotes}>
                    {chirp.likes}{' '}
                    <FontAwesomeIcon
                      color={theme.iconColor}
                      icon={faThumbsUp}
                    />
                  </span>
                  <span data-testid="hate" onClick={updateVotes}>
                    {chirp.hates}{' '}
                    <FontAwesomeIcon
                      color={theme.iconColor}
                      icon={faThumbsDown}
                    />
                  </span>
                  <span data-testid="favorite" onClick={updateVotes}>
                    {chirp.favorites}{' '}
                    <FontAwesomeIcon color={theme.iconColor} icon={faStar} />
                  </span>
                </span>
                <span className="date">
                  {new Date(chirp.created_at).toLocaleDateString() + ' '}
                  <FontAwesomeIcon color={theme.iconColor} icon={faClock} />
                </span>
              </span>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <span className="comment-span">
              <Comment chirp={chirp} />
            </span>
          </Card.Content>
        </Card>
      )}
    </ThemeContext.Consumer>
  );
}
