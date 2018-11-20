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
    
      let {users, chirps} = this.state;
          users = users.default;
          chirps = chirps.default;

    return (
      <div>
          <div style={{display:"flex"}}>
            {chirps? chirps.map((chirp, index) => <Post key={index} chirps={chirp}/>) : null}
          </div>
      </div>
    )
  }
}
