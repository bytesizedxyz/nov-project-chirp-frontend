import React from "react";
import App from "./App";
import { cleanup, render, fireEvent, wait } from "react-testing-library";
// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";

afterEach(cleanup);

/*
  TODO:
    [ ] - TEST APP
*/
describe("app testing", () => {
  it("renders the app and can get chirps", async () => {
    //rendering app
    const { getByText } = render(<App />);

    //waiting to recieve first chirps
    await wait(() => getByText("I feel that, but it looks good if you have zoom out"));
    const firstChirp = getByText("I feel that, but it looks good if you have zoom out");

    //should be true
    expect(firstChirp).toBeInTheDocument();
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
    //rendering app
    const { getByPlaceholderText, asFragment } = render(<App />);
    //waiting for first chirps to then render the first snapshot
    const newSnap = await wait(() => asFragment());
    //grabbing elements
    const searchInput = getByPlaceholderText("Search for chirps");

    // expect(newSnap).toMatchDiffSnapshot(asFragment());
  });
});
