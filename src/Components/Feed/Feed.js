import React from "react";
import PropTypes from "prop-types";
import { Container, Card } from "semantic-ui-react";

import Post from "../Post";
import "./Feed.css";
import { ThemeContext } from "../../ThemeProvider";

export default function Feed(props) {
  const { chirps } = props;
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <Container data-testid="feed">
          <Card.Group centered itemsPerRow={1}>
            {chirps
              ? chirps.map(chirp => <Post key={chirp._id} chirp={chirp} id={chirp.uuid} />)
              : null}
          </Card.Group>
        </Container>
      )}
    </ThemeContext.Consumer>
  );
}

Feed.defaultProps = {
  chirps: []
};

Feed.propTypes = {
  chirps: PropTypes.arrayOf(PropTypes.object)
};
