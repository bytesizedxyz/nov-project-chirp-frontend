import React from "react";
import { cleanup, render, fireEvent, wait } from "react-testing-library";

// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";

//needed components to render properly
import Feed from "./Feed";

const { toMatchDiffSnapshot } = require("snapshot-diff");
expect.extend({ toMatchDiffSnapshot });

//fake chirp declaration
const chirp = [
  {
    userId: 7,
    message: "Distributed solution-oriented contingency",
    deleted: true,
    likes: 16,
    hates: 33,
    favorites: 73,
    created_at: "8/25/2001"
  },
  {
    userId: 10,
    message: "User-centric neutral benchmarkUser-centric",
    deleted: false,
    likes: 24,
    dislikes: 8,
    favorites: 66,
    created_at: "10/5/2012"
  },
  {
    userId: 4,
    message: "Fundamental non-volatile solution",
    deleted: true,
    likes: -81327498127349871,
    dislikes: 9999999999999999,
    favorites: "null",
    created_at: "8/25/2001"
  }
];

afterEach(cleanup);

describe("feed component can take in multiple chirps and map through them", () => {
  it("renders multiple chirps", () => {
    const { getByText, getByTestId } = render(<Feed chirps={chirp} />);

    const secondChirp = getByText("User-centric neutral benchmarkUser-centric");
    const feed = getByTestId("feed");

    expect(secondChirp).toHaveTextContent(chirp[1].message);
    expect(feed.children.length).toEqual(3);
  });
});
