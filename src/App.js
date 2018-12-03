<<<<<<< Updated upstream
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as chirps from "./dummy_data/chirps";
import { ThemeContext, themes } from "./ThemeProvider";
import Login from "./Views/Login/Login";
import Home from "./Views/Home/Home";
import "./Components/Header/header.css";
=======
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

import { ThemeContext, themes } from './ThemeProvider';
import Login from './Views/Login/Login';
import Home from './Views/Home/Home';
import './Components/Header/header.css';
// import * as chirps from './dummy_data/chirps';
>>>>>>> Stashed changes

library.add(faPlus, faSearch);

class App extends Component {
  constructor() {
    super();

    this.state = {
      chirps: chirps.default,
      user: {},
<<<<<<< Updated upstream
      filter: "",
=======
      filter: '',
>>>>>>> Stashed changes
      theme: themes.dark
    };

    this.toggleTheme = this.toggleTheme.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.addPost = this.addPost.bind(this);
  }

  async componentWillMount() {
<<<<<<< Updated upstream
    let chirps = await fetch("https://nov-chirp-backend.herokuapp.com/chirp", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("id_token")
      }
    });
    chirps = await chirps.json();
    chirps = chirps.reverse();
    console.log('chirps', chirps);
    this.setState({ chirps });
=======
    let chirps = await fetch('https://nov-chirp-backend.herokuapp.com/chirp');
    console.log(chirps);
    // chirps = await chirps.json();
    // chirps = chirps.reverse();
    // console.log('chirps', chirps);
    // this.setState({ chirps });
>>>>>>> Stashed changes
  }

  toggleTheme() {
    this.setState(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark
    }));
  }

  handleFilter(e) {
    const { value } = e.target;
    this.setState({
      filter: value
    });
  }

  // handleComment(e) {
  //   const { value } = e.target;
  //   this.setState({
  //     commentValue: value,
  //   });
  // }

  async addPost(post) {
    const { user } = this.state;

<<<<<<< Updated upstream
    const newPost = await fetch("https://nov-chirp-backend.herokuapp.com/chirp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `${post}`,
        username: `${user.username}`
      })
    });
=======
    const newPost = await fetch(
      'https://nov-chirp-backend.herokuapp.com/chirp',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `${post}`,
          username: `${user.username}`
        })
      }
    );
>>>>>>> Stashed changes
    const reply = await newPost.json();
    this.setState(prevState => {
      prevState.chirps.unshift(reply);
      return prevState;
    });
  }

  // submitComment() {

  // }

  render() {
    const { chirps, user, filter, theme } = this.state;
    const themeChange = {
      theme,
      toggleTheme: this.toggleTheme
    };
<<<<<<< Updated upstream
    const searchedChirps = chirps.filter(
      chirp => (chirp.message ? chirp.message.toLowerCase().includes(filter.toLowerCase()) : false)
=======
    const searchedChirps = chirps.filter(chirp =>
      chirp.message
        ? chirp.message.toLowerCase().includes(filter.toLowerCase())
        : false
>>>>>>> Stashed changes
    );
    console.log('app searched chirps', searchedChirps);
    if (user > 0) {
      console.log('user', user);
    }
    return (
      <ThemeContext.Provider value={themeChange}>
        <Router>
          <>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  chirps={searchedChirps}
                  user={user}
                  filter={filter}
                  addPost={this.addPost}
                  handleFilter={this.handleFilter}
                />
              )}
            />
            <Route exact path="/login" component={Login} />
          </>
        </Router>
      </ThemeContext.Provider>
    );
  }
}

export default App;
