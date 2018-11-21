import React, { Component } from 'react';
import Gravatar from 'gravatar-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmpireLogo from './empire-brands';
import Modal from './Modal';
import { ThemeContext } from '../ThemeProvider';
import './header.css';

class Header extends Component {
  state = {
    message: '',
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

  closeAndSend = () => {
    console.log('running close and send');
    this.setState({ open: false, message: '' });
    this.props.addPost(this.state.message);
  };

  render() {
    const { user, handleFilter, filter } = this.props;
    let GravatarBlock;
    if (user && user.email) {
      GravatarBlock = (
        <Gravatar
          className="profileImage redBorder2px"
          email={this.props.user.email}
          size={120}
          rating="PG"
          alt="Profile Avatar"
          default="monsterid"
          secure
        />
      );
    }

    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div className="flexColumnAround brownBackground">
            <div className="flexRowBetween brownBackground">
              <EmpireLogo />
              <h1 className="blackFont">Darth Twitter</h1>
              {GravatarBlock}
            </div>

            <div className="headerBottom flexRowAround brownBackground">
              <Modal
                open={this.state.show}
                handleClose={this.hideModal}
                addPost={this.closeAndSend}
              >
                <h1 className="blackFont">Add New Post</h1>
                <textarea
                  value={this.state.message}
                  onChange={this.handleChange}
                  rows="5"
                  cols="50"
                  type="text"
                  name="message"
                  maxLength="280"
                  className="greyBackground whiteFont textAreaFont"
                />
              </Modal>

              <button
                className="chirpButton redFont redBorder2px brownBackground"
                onClick={this.showModal}
              >
                <FontAwesomeIcon icon="plus" />
              </button>

              <button
                className="chirpButton"
                onClick={toggleTheme}
                style={{ backgroundColor: theme.background }}
              >
                Change Theme
              </button>

              <span className="flexRowCenter">
                <FontAwesomeIcon
                  icon="search"
                  className="searchIcon searchIconBorder redFont"
                />
                <input
                  onChange={handleFilter}
                  placeholder="Search for chirps"
                  className="search brownBackground whiteFont redBorder2px"
                  type="text"
                  name={filter}
                />
              </span>

              <button
                className="chirpButton redFont redBorder2px brownBackground"
                onClick={this.handleSearch}
              >
                SEARCH
              </button>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Header;
