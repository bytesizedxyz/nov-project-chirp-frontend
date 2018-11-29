import "react-testing-library/cleanup-after-each";
import { cleanup } from "react-testing-library";
// this adds jest-dom's custom assertions
import "jest-dom/extend-expect";
const { toMatchDiffSnapshot } = require("snapshot-diff");
expect.extend({ toMatchDiffSnapshot });

afterEach(cleanup);

global.storage = {
  store: {},
  getItem: key => {
    this.store[key];
  },
  setItem: (key, value) => (this.store[key] = value)
};
