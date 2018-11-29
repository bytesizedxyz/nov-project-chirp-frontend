import React, { Component } from 'react';

import AuthService from '../Services/AuthService';

export default function withAuth(AuthComp) {
  const auth = new AuthService();
  return class AuthWrap extends Component {
    constructor() {
      super();
      this.state = {
        user: null,
      };
    }


    componentDidMount() {
      // eslint-disable-next-line react/prop-types
      const { history } = this.props;
      if (!auth.loggedIn()) {
        history.replace('/login');
      } else {
        try {
          // const profile = auth.getProfile();
          const profile = localStorage.getItem('id_token');
          this.setState({ user: profile });
        } catch (e) {
          console.log('error', e);
          auth.logout();
          history.replace('/login');
        }
      }
    }

    render() {
      const { user } = this.state;
      return (
        <>{user ? <AuthComp authProps={this.props} user={user} /> : null}</>
      );
    }
  };
}
