import React, { Component } from "react";
import Gravatar from "gravatar-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmpireLogo from "./empire-brands";
import Modal from "./Modal";
import { ThemeContext } from "../ThemeProvider";
import "./header.css";

class Header extends Component {
  state = {
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

  closeAndSend = () => {
    console.log("running close and send");
    this.setState({ open: false, message: "" });
    this.props.addPost(this.state.message);
  };

  handleSearch = () => {
    console.log("Searching for new chirps");
  };

  render() {
    const { user, handleFilter, filter } = this.props;
    let GravatarBlock;
    if (user && user.email) {
      GravatarBlock = (
        <ThemeContext.Consumer>
          {({ theme }) => (
            <Gravatar
              className={`profileImage
              ${theme.redBorder}
              ${theme.eggshellBorder}`}
              email={this.props.user.email}
              size={120}
              rating="PG"
              alt="Profile Avatar"
              default="monsterid"
              secure
            />
          )}
        </ThemeContext.Consumer>
      );
    }

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
                className={`theme-button ${theme.brownBackground} ${theme.blueBackground}`}
                onClick={toggleTheme}
              >
                <EmpireLogo />
              </div>
              <h1 className={`${theme.eggshellFont} ${theme.blackFont}`}>
                {theme.darthTwitter}
                {theme.obiTwitter}
              </h1>
              {GravatarBlock}
            </div>

            <div
              className={`headerBottom flexRowAround
              ${theme.brownBackground}
              ${theme.blueBackground}`}
            >
              <Modal
                open={this.state.show}
                handleClose={this.hideModal}
                addPost={this.closeAndSend}
              >
                <h1 className={`${theme.blackFont} ${theme.eggshellFont}`}>Add New Post</h1>
                <textarea
                  value={this.state.message}
                  onChange={this.handleChange}
                  rows="5"
                  cols="50"
                  type="text"
                  name="message"
                  maxLength="280"
                  className={`greyBackground whiteFont textAreaFont`}
                />
              </Modal>
              <button
                className={`chirpButton
                ${theme.brownBackground}
                ${theme.redBorder}
                ${theme.redFont}
                ${theme.eggshellFont}
                ${theme.font}
                ${theme.blueBackground}
                ${theme.eggshellBorder}`}
                onClick={this.showModal}
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

export default Header;
