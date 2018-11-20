import React, { Component } from 'react';
import * as chirps from '../dummy_data/chirps';
import * as users from "../dummy_data/users";
import Post from '../Components/Post';

export default class Feed extends Component {

    state={}

    componentDidMount(){
        this.setState({
            users,
            chirps
        })
    }

  render() {
      const {users, chirps} = this.state;
    return (
      <div>
          <div style={{display:"flex"}}>
            {chirps && chirps.map((chirp, index) => <Post key={index} chirps={chirp}/>)}
          </div>
      </div>
    )
  }
}
