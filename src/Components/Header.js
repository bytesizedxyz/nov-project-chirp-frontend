import React, { Component } from 'react';
import Gravatar from 'gravatar-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
import './header.css';

class Header extends Component {
  state = {
    search: '',
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

  handleSubmit = e => {
    e.preventDefault();
    const { search } = this.state;
    console.log(search);
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
        <Modal open={this.state.show} handleClose={this.hideModal}>
          <h1>Add New Post</h1>
          <form>
            <input type="text" name="message" />
          </form>
        </Modal>
        <button onClick={this.showModal}>
          <FontAwesomeIcon icon="plus" />
        </button>
        <form onSubmit={this.handleSubmit} className={'search'}>
          <input type="text" name="search" onChange={this.handleChange} />
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
