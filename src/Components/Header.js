import React, { Component } from "react";
import Gravatar from "gravatar-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import "./header.css";

class Header extends Component {
  state = {
    search: "",
    message: "",
    open: false
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
    const { search } = this.state;
    console.log(search);
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
          email={this.props.user.email}
          size={60}
          rating="PG"
          alt="Alvin Dickson profile"
          secure
          default="monsterid"
        />
      );
    }
    return (
      <div className="headerDiv">
        <Modal
          open={this.state.show}
          handleClose={this.hideModal}
          addPost={this.addPost}
        >
          <h1>Add New Post</h1>
          <textarea
            onChange={this.handleChange}
            rows="4"
            cols="75"
            type="text"
            name="message"
          />
        </Modal>
        <button onClick={this.showModal}>
          <FontAwesomeIcon icon="plus" />
        </button>
        <form onSubmit={this.handleSearch} className={"search"}>
          <input
            placeholder="Search for chirps"
            type="text"
            className="search"
            onChange={this.handleChange}
          />
        </form>
        {GravatarBlock}
      </div>
    );
  }
}

export default Header;
