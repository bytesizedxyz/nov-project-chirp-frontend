import React, { Component } from 'react';
import Gravatar from 'gravatar-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmpireLogo from './empire-brands'
import Modal from './Modal';
import './header.css';


class Header extends Component {
  state = {
    message: "",
    open: false,
    filter: "",
    filterBy: ""
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

  // addPost = e => {
  //   e.preventDefault();
  //   const { message } = this.state;
  //   console.log(message);
  // };

  closeAndSend = () => {
    console.log("running close and send")
    this.setState({open: false, message: ""})
    this.props.addPost(this.state.message)
  }

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
      <div className="flexColumnAround">
        <div className="flexRowBetween">
          {/* <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/7/75/Emblem_of_the_First_Galactic_Empire.svg"
            alt="The Empire is with you."
          /> */}
          <EmpireLogo/>
          <h1>Darth Twitter</h1>
          {GravatarBlock}
        </div>

        <div>
          <button className="chirpButton" onClick={this.showModal}>
            <FontAwesomeIcon icon="plus" />
          </button>

          <Modal
            open={this.state.show}
            handleClose={this.hideModal}
            addPost={this.closeAndSend}
          >
            <h1>Add New Post</h1>
            <textarea
              value={this.state.message}
              onChange={this.handleChange}
              rows="5"
              cols="50"
              type="text"
              name="message"
              maxLength="280"
            />
          </Modal>

          <input
            placeholder="Search for chirps"
            className="search"
            type="text"
            name="filter"
          />
          <button className="chirpButton" onClick={this.handleSearch}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
