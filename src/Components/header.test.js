import React from "react";
import { cleanup, render, fireEvent } from "react-testing-library";
// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";
import Header from "./Header";

afterEach(cleanup);

describe("Header rendering", () => {
  test("it renders the header components such as title, search input and add button", () => {
    const { getByText, getByPlaceholderText } = render(<Header />);

    //function for handling search
    const handleSearch = jest.fn();

    //Rendered items to look for
    const header = getByText("Darth Twitter");
    const search = getByPlaceholderText("Search for chirps");
    const button = getByText("SEARCH");

    //clicking the button
    fireEvent.click(button);

    //event that are expected to be true
    expect(header.innerHTML).toBe("Darth Twitter");
    expect(search).toBeTruthy();
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});

// describe("change values via the fireEvent.change method", () => {
//   it("it renders the header compoenent", () => {
//     const handleChange = jest.fn();
//     const { container } = render(<Header />);
//     fireEvent.change(input, { target: { value: "a" } });
//     expect(handleChange).toHaveBeenCalledTimes(1);
//     expect(input.value).toBe("a");
//   });
// });
