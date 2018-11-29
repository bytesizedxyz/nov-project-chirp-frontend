import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';


import { ThemeContext, themes } from './ThemeProvider';
import Login from './Views/Login/Login';
import Home from './Views/Home/Home';
import './Components/Header/header.css';

library.add(faPlus, faSearch);

class App extends Component {
<<<<<<< HEAD
  constructor() {
    super();

    this.state = {
      chirps: [],
      user: [],
      filter: '',
      theme: themes.dark,
    };

    this.toggleTheme = this.toggleTheme.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.addPost = this.addPost.bind(this);
  }

  async componentWillMount() {
    let chirps = await fetch('https://nov-chirp-backend.herokuapp.com/chirp');
=======
  state = {
    chirps: [],
    user: [],
    filter: "",
    theme: themes.dark
  };

  componentDidMount = async () => {
    console.log("App mounted");
    let chirps = await fetch("https://nov-chirp-backend.herokuapp.com/chirp");
>>>>>>> 0244c79addbaa0828da022abf5f48c96cc21c777
    chirps = await chirps.json();
    chirps = chirps.reverse();
    // console.log('chirps', chirps);
    this.setState({ chirps });
  }

  toggleTheme() {
    this.setState(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark,
    }));
  }

  handleFilter(e) {
    const { value } = e.target;
    this.setState({
      filter: value,
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

    const newPost = await fetch('https://nov-chirp-backend.herokuapp.com/chirp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `${post}`,
        username: `${user.username}`,
      }),
    });
    const reply = await newPost.json();
    this.setState((prevState) => {
      prevState.chirps.unshift(reply);
      return prevState;
    });
  }

  // submitComment() {

  // }

<<<<<<< HEAD

=======
>>>>>>> 0244c79addbaa0828da022abf5f48c96cc21c777
  render() {
    const {
      chirps, user, filter, theme,
    } = this.state;
    const themeChange = {
      theme,
      toggleTheme: this.toggleTheme,
    };
    const searchedChirps = chirps.filter(
      chirp => (chirp.message ? chirp.message.toLowerCase().includes(filter.toLowerCase()) : false),
    );
<<<<<<< HEAD
=======
    console.log("app searched chirps", searchedChirps);
    if (user > 0) {
      console.log("user", user);
    }
>>>>>>> 0244c79addbaa0828da022abf5f48c96cc21c777
    return (
      <ThemeContext.Provider value={themeChange}>
        <Router>
          <>
<<<<<<< HEAD
            <Route exact path="/" render={() => <Home chirps={searchedChirps} user={user} filter={filter} addPost={this.addPost} handleFilter={this.handleFilter} />} />
=======
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
>>>>>>> 0244c79addbaa0828da022abf5f48c96cc21c777
            <Route exact path="/login" component={Login} />
          </>
        </Router>
      </ThemeContext.Provider>
    );
  }
}

export default App;
