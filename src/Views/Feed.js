import React, { Component } from 'react';

import Post from '../Components/Post';

export default class Feed extends Component {

  render() {
      
      const {chirps} = this.props;
      console.log(chirps)

    return (
      <div>
          <div style={{display:"flex", flexWrap: "wrap", alignItems:"center", justifyContent:"center"}}>
            {chirps? chirps.map((chirp, index) => <Post key={index} chirp={chirp}/>) : null}
          </div>
      </div>
    )
  }
}
