import React, { Component } from 'react';
import './Login.css';

import AuthService from '../../Services/AuthService';

class Login extends Component {
  constructor() {
    super();

    this.Auth = new AuthService();

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }


  componentDidMount() {
    if (this.Auth.loggedIn()) {
      // eslint-disable-next-line react/prop-types
      const { history } = this.props;
      console.log(this.Auth.loggedIn());
      history.push('/');
    }
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.Auth.login(username, password)
      .then(() => {
        const { history } = this.props;
        history.replace('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Login</h1>
          <form>
            <input
              className="form-item"
              placeholder="Username goes here..."
              name="username"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <input className="form-submit" value="SUBMIT" type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
