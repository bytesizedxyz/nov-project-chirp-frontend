import React from 'react';
import { ThemeContext } from '../ThemeProvider';

const Modal = ({ addPost, handleClose, open, children }) => {
  const showHideClassName = open ? 'modalOpen' : 'modal display-none';
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div className={showHideClassName}>
          <section
            className={`modal-main
            ${theme.whiteFont}
            ${theme.brownBackground}
            ${theme.blueBackground}
            `}
          >
            <div>{children}</div>
            <button
              className={`chirpButton
              ${theme.whiteFont}
              ${theme.brownBackground}
              ${theme.blueBackground}
              ${theme.eggshellBorder}
              ${theme.eggshellFont}
              ${theme.redFont}
              ${theme.redBorder}
              `}
              onClick={handleClose}
            >
              close
            </button>
            <button
              className={`chirpButton
              ${theme.whiteFont}
              ${theme.brownBackground}
              ${theme.blueBackground}
              ${theme.eggshellBorder}
              ${theme.redBorder}
              ${theme.eggshellFont}
              ${theme.redFont}
              `}
              onClick={addPost}
            >
              submit
            </button>
          </section>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

export default Modal;
