<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';
=======
import React, { Component } from "react";
>>>>>>> 0244c79addbaa0828da022abf5f48c96cc21c777

import Post from '../Post';
import './Feed.css';
import { ThemeContext } from '../../ThemeProvider';

<<<<<<< HEAD
export default function Feed(props) {
  const { chirps } = props;
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div
          className={`
=======
export default class Feed extends Component {
  render() {
    const { chirps, user } = this.props;
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div
            className={`
>>>>>>> 0244c79addbaa0828da022abf5f48c96cc21c777
            feed
            ${theme.blackBackground}
            ${theme.lightBlueBackground}
            `}
<<<<<<< HEAD
          data-testid="feed"
        >
          {chirps
            ? chirps.map(chirp => <Post key={chirp.id} chirp={chirp} id={chirp.uuid} />)
            : null}
        </div>
      )}
    </ThemeContext.Consumer>
  );
=======
            data-testid="feed"
          >
            {chirps
              ? chirps.map((chirp, index) => (
                  <Post key={index} user={user} chirp={chirp} id={chirp.uuid} />
                ))
              : null}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
>>>>>>> 0244c79addbaa0828da022abf5f48c96cc21c777
}

Feed.defaultProps = {
  chirps: [],
};

Feed.propTypes = {
  chirps: PropTypes.arrayOf(PropTypes.object),
};
