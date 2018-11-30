import React from "react";
import { withRouter } from "react-router";
import withAuth from "../../Components/withAuth";
import NavBar from "../../Components/Header/Header";
import Feed from "../../Components/Feed/Feed";
import { ThemeContext } from "../../ThemeProvider";

export default withRouter(
  withAuth(function Home(props) {
    const { user, chirps, handleFilter, addPost, filter } = props.authProps;
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div
            className={`App
          ${theme.lightBlueBackground}
          ${theme.blackBackground}`}
          >
            <NavBar handleFilter={handleFilter} addPost={addPost} user={user} filter={filter} />
            {chirps ? <Feed chirps={chirps} /> : null}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  })
);
