import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";

class Header extends Component {
  state = {
    search: "",
    isOpen: false
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
          <img
            className="profileImage"
            src={"https://i.ytimg.com/vi/AfdR003knes/hqdefault.jpg"}
          />
        </div>
      </div>
    );
  }
}

export default Header;

// handleSubmit(event) {
//   event.preventDefault();
//   axios.post("/auth/signup", {
//       username: this.state.username,
//       password: this.state.password
//     })
//     .then(response => {
//       console.log(response.data);
//       if (!response.data.errmsg) {
//         console.log("You have signed up!");
//         this.setState({
//           redirectTo: "/login"
//         });
//       } else {
//         console.log("An account already exists with these details");
//       }
//     });
// }
