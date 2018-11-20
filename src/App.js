import React, { Component } from 'react';
import './App.css';
import Feed from './Views/Feed';

/*
 * DUMMY DATA; REPLACE
 */
import * as chirps from './dummy_data/chirps';
import * as users from "./dummy_data/users";

class App extends Component {
  state={
    chirps: chirps.default,
    users: users.default
  }
  render() {
    const {chirps} = this.state;
    return (
      <div className="App">
        <header className="App-header" />
        <Feed chirps={chirps}/>
      </div>
    );
  }
}

export default App;
