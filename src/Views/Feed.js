import React, { Component } from "react";

import Post from "../Components/Post";
import "./Feed.css";
import { ThemeContext } from "../ThemeProvider";

export default class Feed extends Component {
  render() {
    const { chirps } = this.props;

    return (
      <div className="feed" data-testid="feed">
        {chirps ? chirps.map((chirp, index) => <Post key={index} chirp={chirp} />) : null}
      </div>
    );
  }
}
