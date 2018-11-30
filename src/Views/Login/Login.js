import React, { Component } from "react";
import { Grid, Form, Card } from "semantic-ui-react";
import "./Login.css";

import AuthService from "../../Services/AuthService";

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
      history.push("/");
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
        history.replace("/");
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Grid className="loginForm" centered columns={2} textAlign="center" verticalAlign="middle">
        <Grid.Row centered>
          <Card>
            <Card.Header>Login</Card.Header>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Input
                fluid
                placeholder="Username goes here..."
                name="username"
                label="User Name"
                type="text"
                onChange={this.handleChange}
              />
              <Form.Input
                placeholder="Password goes here..."
                name="password"
                type="password"
                onChange={this.handleChange}
              />
              <Form.Button value="SUBMIT">Login</Form.Button>
            </Form>
          </Card>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Login;
