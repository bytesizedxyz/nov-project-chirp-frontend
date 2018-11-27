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
  it("renders the app with chirps being passed in", async () => {
    const { getByText } = render(<App />);

    await wait(() => getByText("Darth Twitter"));
    expect(firstChirp).toBeInTheDocument();
  });
  // it("load data", async () => {
  //   const { getByText, getByTestId, getByPlaceholderText, container } = render(<Select />);

  //   Simulate.click(getByText("Load"));
  //   const elem = getByTestId("item");
  //   expect(elem).toHaveTextContent("test");
  // });
});
