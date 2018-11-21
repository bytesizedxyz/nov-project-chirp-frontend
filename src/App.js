import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import aws_exports from "./aws-exports";

import * as chirps from "./dummy_data/chirps";
import Header from "./Components/Header";
import Feed from "./Views/Feed";
import { ThemeContext, themes } from "./ThemeProvider";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
Amplify.configure(aws_exports);
library.add(faPlus, faSearch);

class App extends Component {
  state = {
    chirps: chirps.default,
    user: [],
    filter: "",
    theme: themes.dark
  };

  componentDidMount = async () => {
    const user = await Auth.currentAuthenticatedUser();
    this.setState({ user: user });
  };

  toggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark
    }));
    console.log(this.state.theme);
  };

  handleFilter = e => {
    const { value } = e.target;
    this.setState({
      filter: value
    });
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

  render() {
    const { chirps, user, filter, theme } = this.state;
    const themeChange = {
      theme,
      toggleTheme: this.toggleTheme
    };
    const searchedChirps = chirps.filter(chirp =>
      chirp.message.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <ThemeContext.Provider value={themeChange}>
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
      </ThemeContext.Provider>
    );
  }
}

export default withAuthenticator(App);
