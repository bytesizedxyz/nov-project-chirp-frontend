import React, { Component } from "react";
import AuthService from "../Services/AuthService";

export default function withAuth(AuthComp) {
  const auth = new AuthService();
  return class AuthWrap extends Component {
    state = {
      user: null
    };

    componentDidMount() {
      if (!auth.loggedIn()) {
        this.props.history.replace("/login");
      } else {
        try {
          // const profile = auth.getProfile();
          const profile = localStorage.getItem("id_token");
          this.setState({ user: profile });
        } catch (e) {
          console.log("error", e);
          auth.logout();
          this.props.history.replace("/login");
        }
      }
    }

    render() {
      return (
        <>{this.state.user ? <AuthComp authProps={this.props} user={this.state.user} /> : null}</>
      );
    }
  };
}
