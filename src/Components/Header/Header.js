import React, { Component } from 'react';
import Gravatar from 'gravatar-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import EmpireLogo from '../empire-brands';
import Modal from '../Modal';
import { ThemeContext } from '../../ThemeProvider';
import './header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      show: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeAndSend = this.closeAndSend.bind(this);
  }


  toggleModal() {
    const { show } = this.state;
    this.setState({ show: !show });
  }


  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  closeAndSend() {
    const { addPost } = this.props;
    const { message } = this.state;
    // console.log("running close and send");
    this.setState({ show: false, message: '' });
    addPost(message);
  }

  render() {
    const { user, handleFilter, filter } = this.props;
    const { show, message } = this.state;
    const email = user || 'email@gmail.com';
    const GravatarBlock = (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <Gravatar
            className={`profileImage
              ${theme.redBorder}
              ${theme.eggshellBorder}`}
            email={email}
            size={120}
            rating="PG"
            alt="Profile Avatar"
            default="monsterid"
            secure
          />
        )}
      </ThemeContext.Consumer>
    );

    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div
            className={`flexColumnAround
            ${theme.brownBackground}
            ${theme.blueBackground}`}
          >
            <div
              className={`flexRowBetween
              ${theme.brownBackground}
              ${theme.blueBackground}`}
            >
              <div
                role="presentation"
                className={`theme-button ${theme.brownBackground} ${theme.blueBackground}`}
                onClick={toggleTheme}
                data-testid="SVGIcon"
              >
                <EmpireLogo />
              </div>
              <h1 className={`${theme.eggshellFont} ${theme.blackFont}`}>
                {theme.darthTwitter}
                {theme.obiTwitter}
              </h1>
              <span>
                {GravatarBlock}
              </span>
            </div>

            <div
              className={`headerBottom flexRowAround
              ${theme.brownBackground}
              ${theme.blueBackground}`}
            >
              <Modal
                open={show}
                handleClose={this.toggleModal}
                addPost={this.closeAndSend}
              >
                <h1 className={`${theme.blackFont} ${theme.eggshellFont}`}>Add New Post</h1>
                <textarea
                  value={message}
                  onChange={this.handleChange}
                  rows="5"
                  cols="50"
                  type="text"
                  name="message"
                  maxLength="280"
                  className="greyBackground whiteFont textAreaFont"
                  data-testid="addPostText"
                />
              </Modal>
              <button
                type="button"
                className={`chirpButton
                ${theme.brownBackground}
                ${theme.redBorder}
                ${theme.redFont}
                ${theme.eggshellFont}
                ${theme.font}
                ${theme.blueBackground}
                ${theme.eggshellBorder}`}
                onClick={this.showModal}
                data-testid="addPostButton"
              >
                <FontAwesomeIcon icon="plus" />
              </button>
              <span className="flexRowCenter">
                <FontAwesomeIcon
                  icon="search"
                  className={`searchIcon ${theme.searchIconBorder} ${theme.redFont}`}
                />
                <input
                  onChange={handleFilter}
                  placeholder="Search for chirps"
                  className={`search
                  ${theme.brownBackground}
                  ${theme.blueBackground}
                  ${theme.eggshellFont}
                  ${theme.eggshellBorder}
                  ${theme.whiteFont}
                  ${theme.redBorder}`}
                  type="text"
                  name={filter}
                />
              </span>
              <button
                type="button"
                className={`chirpButton
                  ${theme.brownBackground}
                  ${theme.blueBackground}
                  ${theme.eggshellFont}
                  ${theme.eggshellBorder}
                  ${theme.whiteFont}
                  ${theme.redFont}
                  ${theme.redBorder}`}
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

Header.propTypes = {
  addPost: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  filter: PropTypes.string.isRequired,
};

export default Header;
