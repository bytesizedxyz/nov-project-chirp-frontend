import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext, themes } from "./ThemeProvider";
import Login from "./Views/Login";
import SignUp from "./Views/SignUp";
import Home from "./Views/Home/Home";
import "./Components/Header/header.css";

library.add(faPlus, faSearch);

class App extends Component {
  constructor() {
    super();

    this.state = {
      chirps: [],
      user: {},
      filter: "",
      theme: themes.dark
    };

    this.toggleTheme = this.toggleTheme.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.addPost = this.addPost.bind(this);
    this.getChirps = this.getChirps.bind(this);
  }

  async getChirps() {
    console.log("get the chirps");
    if (localStorage.getItem("id_token").length > 0) {
      console.log("token got");
      let chirps = await fetch("https://nov-chirp-backend.herokuapp.com/chirp", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("id_token")
        }
      });
      console.log("chirps status", chirps.status);
      if (chirps.status === 200 || chirps.status === 304) {
        chirps = await chirps.json();
        chirps = chirps.reverse();
        const user = JSON.parse(localStorage.getItem("_user_prof"));
        this.setState({ chirps, user });
      } else if (chirps.status === 500) {
        localStorage.setItem("id_token", "");
        this.props.history.replace("/login", {
          err: "You have been logged out"
        });
      }
    } else {
      console.log("am confused");
    }
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

    const newPost = await fetch("https://nov-chirp-backend.herokuapp.com/chirp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("id_token")
      },
      body: JSON.stringify({
        message: `${post}`,
        username: `${user.username}`
      })
    });
    const reply = await newPost.json();
    this.setState(prevState => {
      prevState.chirps.unshift(reply);
      return prevState;
    });
  }

  updateChirp = (reaction, chirpUUID) => {
    const objKeys = Object.keys(reaction);
    this.setState(prevState => {
      console.log(prevState);
      let newChirps = prevState.chirps.map(chirp => {
        if (chirp.uuid === chirpUUID) {
          if (objKeys[0].includes("like")) {
            console.log("prev chirp", chirp);
            chirp.likes = reaction.likesCount;
            console.log("after Chirp", chirp);
            return chirp;
          } else if (objKeys[0].includes("hate")) {
            chirp.hates = reaction.hatesCount;
            console.log("inside hate");
            return chirp;
          } else if (objKeys[0].includes("favor")) {
            chirp.favorites = reaction.favoritesCount;
            console.log("inside favorite");
            return chirp;
          } else {
            return chirp;
          }
        } else {
          return chirp;
        }
      });
      console.log(newChirps);
      prevState.chirps = newChirps;

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
      chirp.message ? chirp.message.toLowerCase().includes(filter.toLowerCase()) : false
    );
    if (user > 0) {
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
                  getChirps={this.getChirps}
                  chirps={searchedChirps}
                  user={user}
                  filter={filter}
                  addPost={this.addPost}
                  handleFilter={this.handleFilter}
                  updateChirp={this.updateChirp}
                />
              )}
            />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/SignUp" component={SignUp} />
          </>
        </Router>
      </ThemeContext.Provider>
    );
  }
}

export default App;
