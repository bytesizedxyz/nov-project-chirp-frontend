import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import aws_exports from "./aws-exports";

import * as chirps from "./dummy_data/chirps";
import Header from "./Components/Header";
import Feed from "./Views/Feed";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
Amplify.configure(aws_exports);
library.add(faPlus);

class App extends Component {
  state = {
    chirps: chirps.default,
    user: [],
    searchedChirps: []
  };

  componentDidMount = async () => {
    const user = await Auth.currentAuthenticatedUser();
    let chirps = await fetch("https://nov-chirp-backend.herokuapp.com/chirp");
    console.log("chirps", chirps)
    chirps = await chirps.body.json();
    console.log(chirps)
    console.log(user.attributes)
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

  filteredPosts = (filter = "") => {
    console.log("FP filter",filter)
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
          { chirps? <Feed chirps={this.filteredPosts()} /> : null}
        </div>
      </Router>
    );
  }
}

export default withAuthenticator(App);
