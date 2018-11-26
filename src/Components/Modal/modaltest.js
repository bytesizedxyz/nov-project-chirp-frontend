// import React from "react";
// import { cleanup, render, fireEvent, wait } from "react-testing-library";

// // this adds custom jest matchers from jest-dom
// import "jest-dom/extend-expect";

// //needed components to render properly
// import Modal from "./Modal";
// import { ThemeContext, themes } from "../../ThemeProvider";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
// const { toMatchDiffSnapshot } = require("snapshot-diff");
// library.add(faPlus, faSearch);

// afterEach(cleanup);

// describe("Modal Rendering", () => {
//   it("renders the modal with props passed to it", async () => {
//     const open = false;
//     const hideModal = jest.fn();
//     const closeAndSend = jest.fn();

//     const { getByText } = render(
//       <Modal open={open} handleClose={hideModal} addPost={closeAndSend} />
//     );

//     const modalText = getByText("Add New Post");

//     expect(modalText).toHaveTextContent("Add New Post");
//   });
// });
