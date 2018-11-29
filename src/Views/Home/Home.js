import React, { Component } from "react";
import withAuth from "../../Components/withAuth";
import { withRouter } from "react-router";

import Header from "../../Components/Header/Header";
import Feed from "../../Components/Feed/Feed";
import { ThemeContext } from "../../ThemeProvider";

class Home extends Component {
  render() {
    const { user, chirps, handleFilter, addPost, filter } = this.props.authProps;
    console.log("HomeProps", this.props);
    console.log(chirps);
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div
            className={`App
					${theme.lightBlueBackground}
					${theme.blackBackground}`}
          >
            <Header handleFilter={handleFilter} user={user} addPost={addPost} filter={filter} />
            {chirps ? <Feed chirps={chirps} user={user} /> : null}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default withRouter(withAuth(Home));
