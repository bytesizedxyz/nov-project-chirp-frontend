import React from "react";
import App from "./App";
import { cleanup, render, fireEvent, wait } from "react-testing-library";
// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";

afterEach(cleanup);

describe("app testing", () => {
  it("renders the app with chirps being passed in", () => {
    const { getByText } = render(<App />);
    const firstChirp = getByText("I feel that, but it looks good if you have zoom out");

    expect(firstChirp).toHaveTextContent("I feel that, but it looks good if you have zoom out");
  });
});
