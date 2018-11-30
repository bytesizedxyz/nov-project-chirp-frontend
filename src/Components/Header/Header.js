import React, { Component } from "react";
import { Button, Modal, TextArea, Input, Menu, Header, Grid, Icon } from "semantic-ui-react";
import Gravatar from "gravatar-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import EmpireLogo from "../empire-brands";
import "./header.css";

class NavBar extends Component {
  constructor() {
    super();

    this.state = {
      message: "",
      modalOpen: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.closeAndSend = this.closeAndSend.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  closeAndSend() {
    const { addPost } = this.props;
    const { message } = this.state;
    console.log("running close and send");
    this.setState({ modalOpen: false, message: "" });
    addPost(message);
  }

  render() {
    const { user, handleFilter, filter } = this.props;
    const { message } = this.state;
    const email = user || "email@gmail.com";
    const GravatarBlock = (
      <Gravatar
        email={email}
        size={240}
        rating="PG"
        alt="Profile Avatar"
        default="monsterid"
        secure
      />
    );
    return (
      <Menu inverted borderless="false" fluid size="huge" widths={3}>
        <Menu.Item>
          <Icon color="red" size="massive" name="empire" />
        </Menu.Item>
        <Menu.Item>
          <Grid.Row>
            <Header size="huge" as="h1">
              Darth Twitter
            </Header>
            <Modal
              centered
              trigger={
                <Button
                  size="medium"
                  onClick={this.handleOpen}
                  data-testid="addPostButton"
                  style={{ marginRight: "20px" }}
                >
                  <FontAwesomeIcon icon="plus" />
                </Button>
              }
              open={this.state.modalOpen}
              onClose={this.handleClose}
              closeIcon
              data-testid="modal"
            >
              <Modal.Header>
                <h1>Add New Post</h1>
              </Modal.Header>
              <Modal.Content>
                <TextArea
                  placeholder="Tell us more"
                  data-testid="addPostText"
                  onChange={this.handleChange}
                  name="message"
                  autoHeight
                  rows={10}
                  style={{ width: "100%" }}
                  value={message}
                />
                <Button onClick={this.handleClose}>Close</Button>
                <Button onClick={this.closeAndSend}>Submit</Button>
              </Modal.Content>
            </Modal>
            <Input
              onChange={handleFilter}
              placeholder="Search for chirps"
              type="text"
              name={filter}
              action="Search"
              size="medium"
            />
          </Grid.Row>
        </Menu.Item>
        <Menu.Item className="profileImage">{GravatarBlock}</Menu.Item>
      </Menu>
    );
  }
}

NavBar.propTypes = {
  addPost: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  filter: PropTypes.string.isRequired
};

export default NavBar;
