import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';

import * as chirps from './dummy_data/chirps';
import Header from './Components/Header';
import Feed from './Views/Feed';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
Amplify.configure(aws_exports);
library.add(faPlus, faSearch);

class App extends Component {
  state = {
    chirps: chirps.default,
    user: [],
    searchedChirps: []
  };

  componentDidMount = async () => {
    const user = await Auth.currentAuthenticatedUser();
    this.setState({ user: user });
  };

  addPost = post => {
    let newPost = {
      message: post,
      likes: 0,
      dislikes: 0,
      favorites: 0,
      created_at: new Date().toLocaleDateString()
    };
    this.setState(prevState => {
      prevState.chirps.unshift(newPost);
      return prevState;
    });
  };

  // {"userId":8,"message":"Monitored 24 hour time-frame","deleted":true,"likes":59,"dislikes":67,"favorites":77,"created_at":"7/3/2003"},

  filteredPosts = (filter = '') => {
    console.log('FP filter', filter);
    return this.state.chirps.filter(chirp =>
      chirp.message.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { chirps, user, searchedChirps } = this.state;
    // const passedChirps = search"edChirps.length !== 0 ? searchedChirps : chirps;
    return (
      <Router>
        <div className="App">
          <Header
            filteredPosts={this.filteredPosts}
            addPost={this.addPost}
            user={user.attributes}
          />
          {chirps ? <Feed chirps={this.filteredPosts()} /> : null}
        </div>
      </Router>
    );
  }
}

export default withAuthenticator(App);
