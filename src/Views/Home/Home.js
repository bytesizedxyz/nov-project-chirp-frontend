import React from "react";
import { withRouter } from "react-router";
import withAuth from "../../Components/withAuth";
import NavBar from "../../Components/Header/Header";
import Feed from "../../Components/Feed/Feed";
import { ThemeContext } from "../../ThemeProvider";

export default withRouter(
  withAuth(function Home(props) {
    const { user, chirps, updateChirp, handleFilter, addPost, filter, getChirps } = props.authProps;
    if (chirps.length === 0) {
      getChirps();
    }

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div
            className={`App
          ${theme.lightBlueBackground}
          ${theme.blackBackground}`}
          >
            <NavBar handleFilter={handleFilter} addPost={addPost} user={user} filter={filter} />
            {chirps ? <Feed chirps={chirps} updateChirp={updateChirp} /> : null}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  })
);
