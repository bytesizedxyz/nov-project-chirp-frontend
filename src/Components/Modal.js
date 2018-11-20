import React from "react";

const Modal = ({ addPost, handleClose, open, children }) => {
  const showHideClassName = open ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div>{children}</div>
        <button className={"chirpButton"} onClick={handleClose}>
          close
        </button>
        <button className={"chirpButton"} onClick={addPost}>
          Submit Post
        </button>
      </section>
    </div>
  );
};

export default Modal;
