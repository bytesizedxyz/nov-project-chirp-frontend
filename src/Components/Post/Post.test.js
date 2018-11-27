import React from "react";
import { cleanup, render, fireEvent, wait } from "react-testing-library";

// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";

//needed components to render properly
import Post from "./Post";
/*
TODO: 
  [ ] - Test the theme switching for the post component
  [ ] - Use snapshot to test post component
*/
import { ThemeContext, themes } from "../../ThemeProvider";
const { toMatchDiffSnapshot } = require("snapshot-diff");
expect.extend({ toMatchDiffSnapshot });

//fake chirp declaration
const chirp = {
  userId: 7,
  message: "Distributed solution-oriented contingency",
  deleted: true,
  likes: 16,
  hates: 33,
  favorites: 73,
  created_at: "8/25/2001"
};

afterEach(cleanup);

describe("Post functionality and rendering", () => {
  it("renders the post component with the fake chirp declared up above", async () => {
    const { getByText, getByTestId } = render(<Post chirp={chirp} />);
    const message = getByText("Distributed solution-oriented contingency");
    const created_at = getByText("8/25/2001");
    const likes = getByTestId("likes");
    const dislikes = getByTestId("dislikes");
    const favorites = getByTestId("favorites");

    expect(message).toHaveTextContent(chirp.message);
    expect(created_at).toHaveTextContent(chirp.created_at);
    expect(likes).toHaveTextContent(chirp.likes);
    expect(dislikes).toHaveTextContent(chirp.hates);
    expect(favorites).toHaveTextContent(chirp.favorites);
  });
});
