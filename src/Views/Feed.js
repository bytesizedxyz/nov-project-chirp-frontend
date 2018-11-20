import React, { Component } from 'react';

import Post from '../Components/Post';
import "./Feed.css"

export default class Feed extends Component {

  render() {
      
      const {chirps} = this.props;

    return (
      <div>
          <div className="feed">
            {chirps? chirps.map((chirp, index) => <Post key={index} chirp={chirp}/>) : null}
          </div>
      </div>
    )
  }
}
