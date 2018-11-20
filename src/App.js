import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import aws_exports from "./aws-exports";

import * as chirps from "./dummy_data/chirps";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Feed from "./Views/Feed";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
<<<<<<< HEAD
      <div className="App">
        <header className="App-header" />
        <Feed chirps={chirps} />
      </div>
=======
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
          <Feed chirps={chirps} />
        </div>
      </Router>
>>>>>>> 0fad51276734916007541a2208a894536d41a273
    );
  }
}

export default withAuthenticator(App);
