import React from "react";
import { cleanup, render, fireEvent, getByPlaceholderText } from "react-testing-library";
import Header from "./Header";

afterEach(cleanup);

describe("Header rendering", () => {
  it("it renders the header compoenent", () => {
    const { queryByText } = render(<Header />);
    const header = queryByText("Darth Twitter" || "Jedi Twitter");

    const search = getByPlaceholderText("Search for chirps");
    expect(header.innerHTML).toBe("Darth Twitter");
    expect(search.innerHTML)
    console.log(header.innerHTML);
  });
});
