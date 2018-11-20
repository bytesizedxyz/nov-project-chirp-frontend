import React, { Component } from "react";
import { Link } from "react-router-dom";
import Gravatar from "gravatar-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";

class Header extends Component {
  state = {
    search: "",
    isOpen: false,
    email: ""
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
        <Link to="addPost">
          <button>
            <FontAwesomeIcon icon="plus" />
          </button>
        </Link>
        <form onSubmit={this.handleSubmit} className={"search"}>
          <input type="text" name="search" onChange={this.handleChange} />
          <input
            type="submit"
            style={{
              height: "0px",
              width: "0px",
              border: "none",
              padding: "0px",
              hidefocus: "true"
            }}
          />
        </form>
        <div className="profileHolder">
          <Gravatar
            email={this.state.email}
            size={100}
            rating="PG"
            alt="Alvin Dickson profile"
            secure
            default="monsterid"
          />
        </div>
      </div>
    );
  }
}

export default Header;
