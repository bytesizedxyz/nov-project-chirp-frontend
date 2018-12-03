import React, { Component } from "react";
import { Grid, Form, Card, Container } from "semantic-ui-react";
import "./SignUp.css";

import AuthService from "../../Services/AuthService";

class SignUp extends Component {
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
      <Container fluid className="backgroundColorBlacck">
        <Grid className="loginForm" centered textAlign="center" verticalAlign="middle">
          <Grid.Row centered>
            <Card>
              <Card.Header style={{ margin: "20px" }}>Sign Up</Card.Header>
              <Form onSubmit={this.handleFormSubmit}>
                <Form.Input
                  fluid
                  placeholder="Email goes here..."
                  name="email"
                  label="Email"
                  type="text"
                  onChange={this.handleChange}
                />
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
                  label="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Group widths="equal">
                  <Form.Button value="SUBMIT" style={{ marginBottom: "20px" }}>
                    Sign Up
                  </Form.Button>
                  <Form.Button as="a" href="/Login" style={{ marginBottom: "20px" }}>
                    Login
                  </Form.Button>
                </Form.Group>
              </Form>
            </Card>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default SignUp;
