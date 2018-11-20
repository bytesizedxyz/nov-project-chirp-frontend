import React, { Component } from 'react';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';
import * as chirps from "./dummy_data/chirps";
Amplify.configure(aws_exports);

class App extends Component {

  state={
    chirps: chirps.default
  }

  componentDidMount = async () => {
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
  };
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

export default withAuthenticator(App);
