import React, { Component } from 'react';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

class App extends Component {
  componentDidMount = async () => {
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
  };
  render() {
    return (
      <div className="App">
        <header className="App-header" />
      </div>
    );
  }
}

export default withAuthenticator(App);
