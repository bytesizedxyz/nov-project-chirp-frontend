import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Gravatar from 'gravatar-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.css';

class Header extends Component {
  state = {
    search: '',
    isOpen: false,
    email: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { search } = this.state;
    console.log(search);
  };

  render() {
    return (
      <div className="headerDiv">
        <button className="loginButton">
          <FontAwesomeIcon className="loginButton" icon="plus" />
        </button>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Search for chirps"
            type="text"
            className="search"
            onChange={this.handleChange}
          />
        </form>
        <div className="profileHolder">
          <Gravatar
            className="profileImage"
            email={this.state.email}
            rating="PG"
            alt="Profile image or gravatar"
            default="monsterid"
            secure
          />
        </div>
      </div>
    );
  }
}

export default Header;
