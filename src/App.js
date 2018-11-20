import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Feed from "./Views/Feed";
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';

import * as chirps from './dummy_data/chirps';
import Header from './Components/Header';
import Login from './Components/Login';
import Feed from './Views/Feed';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
Amplify.configure(aws_exports);
library.add(faPlus);

class App extends Component {
  state = {
    chirps: chirps.default
  };

  componentDidMount = async () => {
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
  };
  render() {
    const { chirps } = this.state;
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
          <Feed chirps={chirps} />
        </div>
      </Router>
    );
  }
}

export default withAuthenticator(App);
