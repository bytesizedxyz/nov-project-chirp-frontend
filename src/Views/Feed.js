import React, { Component } from 'react';

import Post from '../Components/Post';
import './Feed.css';
import { ThemeContext } from '../ThemeProvider';

export default class Feed extends Component {
  render() {
    const { chirps } = this.props;
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div
            className={`
            feed
            ${theme.blackBackground}
            ${theme.lightBlueBackground}
            `}
            data-testid="feed"
          >
            {chirps
              ? chirps.map((chirp, index) => (
                  <Post key={index} chirp={chirp} id={chirp.uuid} />
                ))
              : null}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
