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
    this.setState({ user: user });
  };

  filteredPosts = (filter, filterBy) => {
    let filteredChrips = this.state.chirps;
    this.setState({ searchedChirps: filteredChrips });
    filteredChrips = filteredChrips.filter(chirp =>
      chirp.message.toLowerCase().includes(filter.toLowerCase()) ? null : chirp
    );
    this.setState({ searchedChirps: filteredChrips });
  };

  render() {
    const { chirps, user, searchedChirps } = this.state;
    const passedChirps = searchedChirps.length !== 0 ? searchedChirps : chirps;
    return (
      <Router>
        <div className="App">
          <Header filteredPosts={this.filteredPosts} user={user.attributes} />
          <Feed chirps={passedChirps} />
        </div>
      </Router>
    );
  }
}

export default withAuthenticator(App);
