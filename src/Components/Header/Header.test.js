import React from "react";
import { render, fireEvent } from "react-testing-library";
//needed components to render properly
import NavBar from "./Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus, faSearch);

const addPostFN = jest.fn();
const filter = "";
const user = { email: "email@gmail.com" };
const handleFilter = jest.fn();

describe("NavBar functionality", () => {
  it("should setState", () => {
    //making the NavBar instance
    const component = new NavBar();
    //redefining the setstate function
    component.setState = jest.fn();

    //opening the modal
    component.handleOpen();
    expect(component.setState).toHaveBeenCalledWith({ modalOpen: true });

    //closing the modal
    component.handleClose();
    expect(component.setState).toHaveBeenCalledWith({ modalOpen: false });
  });
  it("it renders the NavBar components such as title, search input, add button and grab user image", async () => {
    //rendering NavBar
    const { getByText, getByPlaceholderText, getByAltText, getByTestId } = render(
      <NavBar addPost={addPostFN} filter={filter} user={user} handleFilter={handleFilter} />
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
  it("can open add post modal and able to click and change theme", async () => {
    //rending NavBar with themecontext provider
    const { getByTestId, asFragment } = render(
      <NavBar addPost={addPostFN} filter={filter} user={user} handleFilter={handleFilter} />
    );
    //generating snapshot to test if modal has been opened
    const firstRender = asFragment();

    //Rendered items to look for
    const addButton = getByTestId("addPostButton");
    //clicking add modal to see if anything has changed
    fireEvent.click(addButton);

    //comparing the two snapshots
    expect(firstRender).toMatchSnapshot(asFragment());
  });
  it("can change the value of the modal textarea and submit it", async () => {
    //rendering navbar with props being passed down
    const { getByTestId, getByPlaceholderText, asFragment } = render(
      <NavBar addPost={addPostFN} filter={filter} user={user} handleFilter={handleFilter} />
    );

    const firstSnapshot = asFragment();

    //Rendered items to look for
    const addButton = getByTestId("addPostButton");
    //clicking button to open modal
    fireEvent.click(addButton);

    //looking for modal textbox
    const newChirp = getByPlaceholderText("Tell us more");
    expect(newChirp.value).toBe("");

    //changing value of modal textbox
    fireEvent.change(newChirp, { target: { value: "THIS IS MY CHIRP, MUAHAHHAHAHAHHAHAH" } });
    expect(newChirp.value).toBe("THIS IS MY CHIRP, MUAHAHHAHAHAHHAHAH");

    //expecting snapshot to be different
    expect(firstSnapshot).toMatchDiffSnapshot(asFragment());
  });
});
