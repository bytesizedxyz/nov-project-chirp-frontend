import React, { Component } from "react";
import { Grid, Form, Card, Container, Message } from "semantic-ui-react";
import "./Login.css";

import AuthService from "../../Services/AuthService";

class Login extends Component {
  constructor() {
    super();

    this.state={
      err:''
    }

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
    } else if (this.props.location.state && this.props.location.state.err !== "") {
      this.setState({err: this.props.location.state.err })
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
        this.setState({
          err: "Invalid username and password combination!"
        })
      });
  }

  render() {
    return (
      <Container fluid className="backgroundColorBlacck">
        <Grid className="loginForm" centered textAlign="center" verticalAlign="middle">
          <Grid.Row centered>
          {this.state.err !== ''? <Message negative>
              <Message.Header>{this.state.err}</Message.Header>
            </Message>: null}
          </Grid.Row>
          <Grid.Row centered>
            <Card>
              <Card.Header style={{ margin: "20px" }}>Login</Card.Header>
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
                  label="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Button value="SUBMIT" style={{ marginBottom: "20px" }}>
                  Login
                </Form.Button>
                <Form.Button as="a" href="/SignUp" style={{ marginBottom: "20px" }}>
                  Sign Up
                </Form.Button>
              </Form>
            </Card>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Login;
