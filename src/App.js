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
    user: []
  };

  componentDidMount = async () => {
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
    this.setState({ user: user });
  };

  addPost = (post) => {
    let newPost = {
      message:post,
      likes:0,
      dislikes:0,
      favorites:0,
      created_at: (new Date()).toLocaleDateString()
    }
    this.setState(prevState => {
      prevState.chirps.unshift(newPost)
      return prevState
    })
  }

  filteredPosts = (filter, filterBy) => {
    let searchedChirps = this.state.chirps;
    searchedChirps = searchedChirps.filter(chirp => {
      console.log("chirp", chirp);
    });
  };

  // updatedList.filter(function(item){
  //   return item.toLowerCase().search(
  //     event.target.value.toLowerCase()) !== -1;
  // });

  render() {
    const { chirps, user } = this.state;
    return (
      <Router>
        <div className="App">
          <Header filteredPosts={this.filteredPosts} addPost={this.addPost} user={user.attributes} />
          <Feed chirps={chirps} />
        </div>
      </Router>
    );
  }
}

export default withAuthenticator(App);
