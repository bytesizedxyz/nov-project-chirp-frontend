import React, { Component } from "react";
import { Grid, Form, Card, Container, Button } from "semantic-ui-react";
import "./SignUp.css";

import AuthService from "../../Services/AuthService";

class SignUp extends Component {
  constructor() {
    super();

    this.Auth = new AuthService();

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    console.log("Submitting signup form");
    const { email, username, password } = this.state;
    this.Auth.signUp(email, username, password)
      .then(() => {
        console.log("inside then signupform");
        const { history } = this.props;
        history.replace("/Login");
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
                <Form.Button value="SUBMIT" style={{ marginBottom: "20px" }}>
                  Sign Up
                </Form.Button>
                <Button href="/Login" style={{ marginBottom: "30px" }}>
                  Login
                </Button>
              </Form>
            </Card>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default SignUp;
