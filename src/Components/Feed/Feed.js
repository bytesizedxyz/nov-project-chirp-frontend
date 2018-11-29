import React from 'react';
import PropTypes from 'prop-types';

import Post from '../Post';
import './Feed.css';
import { ThemeContext } from '../../ThemeProvider';

export default function Feed(props) {
  const { chirps } = props;
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div
          className={`
            feed
            ${theme.blackBackground}
            ${theme.lightBlueBackground}
            `}
          data-testid="feed"
        >
          {chirps
            ? chirps.map(chirp => <Post key={chirp.id} chirp={chirp} id={chirp.uuid} />)
            : null}
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

Feed.defaultProps = {
  chirps: [],
};

Feed.propTypes = {
  chirps: PropTypes.arrayOf(PropTypes.object),
};
