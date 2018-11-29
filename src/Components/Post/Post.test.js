import React from "react";
import { render, fireEvent, wait } from "react-testing-library";
//needed components to render properly
import Post from "./Post";
/*
TODO: 
  [ ] - Test the theme switching for the post component
  [ ] - Use snapshot to test post component
*/
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

describe("Post functionality and rendering", () => {
  it("renders the post component with the fake chirp declared up above", async () => {
    //rendering post
    const { getByText, getByTestId } = render(<Post chirp={chirp} />);
    //what to look for in post
    const message = getByText("Distributed solution-oriented contingency");
    const created_at = getByText("8/25/2001");
    const likes = getByTestId("like");
    const dislikes = getByTestId("hate");
    const favorites = getByTestId("favorite");

    expect(message).toHaveTextContent(chirp.message);
    expect(created_at).toHaveTextContent(chirp.created_at);
    expect(likes).toHaveTextContent(chirp.likes);
    expect(dislikes).toHaveTextContent(chirp.hates);
    expect(favorites).toHaveTextContent(chirp.favorites);
  });
});
