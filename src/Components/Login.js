import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

class Header extends Component {
  state = {
    search: "",
    isOpen: false
  };

  onClick = () => {};

  render() {
    return (
      <div className={"loginLink"}>
        <Link to="/">
          <h1>HIIIIIIII</h1>
        </Link>
      </div>
    );
  }
}

export default Header;
