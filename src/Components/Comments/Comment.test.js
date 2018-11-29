import React from "react";
import { render, fireEvent, wait } from "react-testing-library";
import Comment from "./Comment";

describe("Comment functionality", () => {
  it("Can render comments", () => {
    //making comment render
    const { getByText } = render(<Comment />);

    //what to search for in rendered comment
    const firstText = getByText("I WIN");

    //expecting this to be in the renderer
    expect(firstText).toHaveTextContent("I WIN");
  });
  it("can post new comments", () => {
    //making comment render
    const { getByText, getByTestId, getByPlaceholderText, asFragment } = render(<Comment />);
    //creating a snapshot to compare
    const firstSnapshot = asFragment();
    //what to search for in rendered comment
    const input = getByPlaceholderText("New Comment");
    const send = getByText("Send");
    const comments = getByTestId("comments");

    //expected to be true
    expect(send).toHaveTextContent("Send");
    expect(input).toBeEmpty();
    expect(comments.children.length).toEqual(2);

    fireEvent.change(input, { target: { value: "a new comment" } });
    expect(input.value).toBe("a new comment");

    //expecting a different snapshot
    fireEvent.click(send);
    //comparing the two snapshots and checking the length of comments
    expect(comments.children.length).toEqual(3);
    expect(firstSnapshot).toMatchDiffSnapshot(asFragment());
  });
});
