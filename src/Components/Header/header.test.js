import React from "react";
import { cleanup, render, fireEvent, wait } from "react-testing-library";

// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";

//needed components to render properly
import Header from "./Header";
import Modal from "../Modal";
import { ThemeContext, themes } from "../../ThemeProvider";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
const { toMatchDiffSnapshot } = require("snapshot-diff");
expect.extend({ toMatchDiffSnapshot });
library.add(faPlus, faSearch);

afterEach(cleanup);

describe("Header rendering", () => {
  it("it renders the header components such as title, search input, add button and grab user image", async () => {
    //defining simulated props
    const user = {
      attributes: {
        email: "email@gmail.com"
      }
    };
    const filter = "";

    //rendering header
    const { getByText, getByPlaceholderText, getByAltText, getByTestId } = render(
      <Header user={user.attributes} filter={filter} />
    );

    //Rendered items to look for
    const header = getByText("Darth Twitter");
    const search = getByPlaceholderText("Search for chirps");
    const addButton = getByTestId("addPostButton");
    const image = getByAltText("Profile Avatar");

    //event that are expected to be true
    expect(header.innerHTML).toBe("Darth Twitter");
    expect(search).toBeInTheDocument();
    expect(search.value).toBe("");
    expect(addButton).toBeInTheDocument();
    expect(image).toBeVisible();

    //change value of input
    fireEvent.change(search, { target: { value: "cross" } });
    //evaluate that the value has been changed for the input
    expect(search.value).toBe("cross");
  });

  /*
  TODO: 
    [ ] - Make header change theme, might have to move it up into the app test instead
  */
  it("can open add post modal and able to click and change theme", async () => {
    //defining simulated props
    const toggleTheme = jest.fn();
    const theme = themes.dark;
    const themeChange = {
      theme,
      toggleTheme: toggleTheme
    };

    const { getByTestId, asFragment } = render(
      <ThemeContext.Provider value={themeChange}>
        <Header />
      </ThemeContext.Provider>
    );

    //Rendered items to look for
    const addButton = getByTestId("addPostButton");
    const empireLogo = getByTestId("SVGIcon");

    //generating snapshot to test if modal has been opened
    // const firstRender = asFragment();
    //clicking add modal to see if anything has changed
    // fireEvent.click(addButton);
    //comparing the two snapshots
    // expect(firstRender).toMatchDiffSnapshot(asFragment());

    //event that are expected to be true
    expect(empireLogo).toBeInTheDocument();
    expect(empireLogo).toHaveClass("brownBackground");

    // clicking the logo to change the theme
    fireEvent.click(empireLogo);
    expect(toggleTheme).toHaveBeenCalledTimes(1);

    // await wait(() => expect(empireLogo).toHaveClass("blueBackground"));
  });
  it("can change the value of the modal textarea and submit it", async () => {
    const addPost = jest.fn();
    const closeAndSend = jest.fn();
    const { getByTestId, getByText, asFragment } = render(
      <Header addPost={addPost}>
        <Modal addPost={closeAndSend} />
      </Header>
    );
    //generating first snapshot of render
    // const firstRender = asFragment();

    //rendered items to look for
    const modal = getByTestId("modal");
    const submit = getByText("submit");
    const textarea = getByTestId("addPostText");

    //events expected to be true
    expect(modal).toContainHTML("Add New Post");
    expect(modal).toHaveTextContent("submit");

    //testing default value of text area
    expect(textarea.value).toBe("");
    //change value of input
    fireEvent.change(textarea, { target: { value: "This is going to be a new post" } });
    //evaluate that the value has been changed for the input
    expect(textarea.value).toBe("This is going to be a new post");
    // expect(firstRender).toMatchDiffSnapshot(asFragment());

    fireEvent.click(submit);
    expect(addPost).toHaveBeenCalledTimes(1);
  });
  it("can open and close the modal", async () => {
    const showModal = jest.fn();
    const hideModal = jest.fn();
    const { getByTestId, getByText, asFragment } = render(
      <Header>
        <Modal handleClose={hideModal} />
        <button onClick={showModal} data-testid="addPostButton">
          Add a post
        </button>
      </Header>
    );
    //generating first snapshot of render
    const firstRender = asFragment();

    //looking for rendered items
    const addButton = getByTestId("addPostButton");
    const close = getByText("close");

    //verifying close button exist
    expect(close).toHaveTextContent("close");
    // expect(addButton).toHaveTextContent("Add a post");

    //expected to be true
    //opening modal
    fireEvent.click(addButton);
    expect(showModal).toHaveBeenCalledTimes(1);
    expect(firstRender).toMatchDiffSnapshot(asFragment());
    //closing modal
    fireEvent.click(close);
    expect(hideModal).toHaveBeenCalledTimes(1);
    expect(firstRender).toMatchDiffSnapshot(asFragment());
  });
});
