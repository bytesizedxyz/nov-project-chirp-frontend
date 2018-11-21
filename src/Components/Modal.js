import React from 'react';

const Modal = ({ addPost, handleClose, open, children }) => {
  const showHideClassName = open ? 'modalOpen' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className="modal-main whiteFont brownBackground">
        <div>{children}</div>
        <button
          className={'chirpButton whiteFont brownBackground'}
          onClick={handleClose}
        >
          close
        </button>
        <button
          className={'chirpButton whiteFont brownBackground'}
          onClick={addPost}
        >
          submit
        </button>
      </section>
    </div>
  );
};

export default Modal;
