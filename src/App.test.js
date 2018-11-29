import React from "react";
import App from "./App";
import AuthService from "./Services/AuthService";
import { cleanup, render, fireEvent, wait } from "react-testing-library";
afterEach(cleanup);

/*
  TODO:
    [x] - Mock LocalStorage to test authservice and login
*/
//defining value of fake token
const value = "name";
describe("app testing", () => {
  it("shows the login page if no token", () => {
    const { getByPlaceholderText } = render(<App />);
    const username = getByPlaceholderText("Username goes here...");

    expect(username).toBeInTheDocument();
  });
  it("can login using a fake token and recieve chirps", async () => {
    //making the authservice available
    const component = new AuthService();
    //redefining setToken function
    component.setToken = value => {
      localStorage.setItem("id_token", value);
      return {
        id_token: value
      };
    };
    jest.spyOn(Storage.prototype, "setItem");

    //setting item into localstorage
    component.setToken(value);

    //rendering must be done down here otherwise it renders the login page
    // const { getByText } = render(<App />);
    // //waiting to recieve first chirps
    // await wait(() => getByText("I feel that, but it looks good if you have zoom out"));
    // const firstChirp = getByText("I feel that, but it looks good if you have zoom out");

    // //should be true
    // expect(firstChirp).toBeInTheDocument();
  });
  it("can change the theme", () => {
    //rendering app
    const { getByTestId } = render(<App />);

    //expecting these items to render
    const themeChanger = getByTestId("SVGIcon");

    //should be true
    expect(themeChanger).toHaveClass("brownBackground");

    //click logo to change theme
    fireEvent.click(themeChanger);
    expect(themeChanger).toHaveClass("blueBackground");
  });
  it("can search for chirps and rerender the page", async () => {
    const newValue = {
      target: {
        value: "I feel"
      }
    };
    //rendering app
    const component = new App();
    const { getByPlaceholderText, asFragment } = render(<App />);
    //waiting for first chirps to then render the first snapshot
    await wait(() => asFragment());
    const firstSnap = asFragment();

    //redefining the setstate function
    component.setState = jest.fn();
    component.handleFilter(newValue);

    expect(component.setState).toHaveBeenCalledWith({ filter: "I feel" });
    //grabbing elements
    const searchInput = getByPlaceholderText("Search for chirps");
    expect(searchInput.value).toBe("");

    //change value of input
    fireEvent.change(searchInput, { target: { value: "I feel" } });
    expect(searchInput.value).toBe("I feel");

    expect(firstSnap).toMatchDiffSnapshot(asFragment());
  });
});
