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
        <Container>
          <Card.Group centered itemsPerRow={1} data-testid="feed">
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
