import React, { Component } from 'react';
import Gravatar from 'gravatar-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmpireLogo from './empire-brands';
import Modal from './Modal';
import './header.css';

class Header extends Component {
  state = {
    message: '',
    open: false,
    filter: '',
    filterBy: ''
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { filter, filterBy } = this.state;
    console.log(filter);
    this.props.filteredPosts(filter, filterBy);
  };

  addPost = e => {
    e.preventDefault();
    const { message } = this.state;
    console.log(message);
  };

  render() {
    const { user } = this.props;
    let GravatarBlock;
    if (user && user.email) {
      GravatarBlock = (
        <Gravatar
          className="profileImage"
          email={this.props.user.email}
          size={120}
          rating="PG"
          alt="Alvin Dickson profile"
          default="monsterid"
          secure
        />
      );
    }
    return (
      <div className="flexColumnAround shadow">
        <div className="flexRowBetween">
          <EmpireLogo />
          <h1>Darth Twitter</h1>
          {GravatarBlock}
        </div>

        <div className="headerBottom headerBottomStyle">
          <Modal
            open={this.state.show}
            handleClose={this.hideModal}
            addPost={this.addPost}
          >
            <h1>Add New Post</h1>
            <textarea
              onChange={this.handleChange}
              rows="4"
              cols="50"
              type="text"
              name="message"
            />
          </Modal>

          <button className="chirpButton" onClick={this.showModal}>
            <FontAwesomeIcon icon="plus" />
          </button>

          <input
            placeHolder="SEARCH FOR CHIRPS"
            className="search"
            type="text"
            name="filter"
          />
          <button className="chirpButton" onClick={this.handleSearch}>
            SEARCH
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
