import React, { Component } from 'react';

import Post from '../Components/Post';
import './Feed.css';

export default class Feed extends Component {
  render() {
    const { chirps } = this.props;
    return (
      <div className="feed" data-testid="feed">
        {chirps
          ? chirps.map((chirp, index) => (
              <Post key={index} chirp={chirp} id={chirp.uuid} />
            ))
          : null}
      </div>
    );
  }
}
