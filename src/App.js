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
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
Amplify.configure(aws_exports);
library.add(faPlus, faSearch);

class App extends Component {
  state = {
    chirps: chirps.default,
    user: [],
    filter: ""
  };

  componentDidMount = async () => {
    const user = await Auth.currentAuthenticatedUser();
    let chirps = await fetch("https://nov-chirp-backend.herokuapp.com/chirp");
    chirps = await chirps.json();
    console.log("chirps", chirps, "user", user)
    this.setState({ user, chirps });

  };

  handleFilter = e => {
    const { value } = e.target;
    this.setState({
      filter: value
    });
  };

  addPost = async post => {
    // const newPost = await fetch("https://nov-chirp-backend.herokuapp.com/chirp", {method:"POST", body:{
    //   message:post,
    //   username:this.state.user.email
    // }})
    // const reply = newPost.json();
    console.log("reply", {
      message:post,
      username:this.state.user.username
    })
  };

  render() {
    const { chirps, user, filter } = this.state;
    const searchedChirps = chirps.filter(chirp =>
      chirp.message.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <Router>
        <div className="App">
          <Header
            handleFilter={this.handleFilter}
            addPost={this.addPost}
            user={user.attributes}
            filter={filter}
          />
          {searchedChirps ? <Feed chirps={searchedChirps} /> : null}
        </div>
      </Router>
    );
  }
}

export default withAuthenticator(App);
