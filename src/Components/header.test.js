import React from "react";
import { cleanup, render, fireEvent } from "react-testing-library";
import Header from "./Header";

afterEach(cleanup);

test("Header should render with props being passed down to it", () => {
  //function to search through posts
  const handleFilterFN = jest.fn();

  //toggle theme function
  const toggleThemeFN = jest.fn();

  const userObj = {
    email: "christopher.evan.white88@gmail.com",
    email_verified: true,
    phone_number: "+12543178882",
    phone_number_verified: false,
    sub: "4c2fa4bc-5156-4af5-b707-cba2cfbcf4dc"
  };

  const { getByTestId } = render(
    <Header
      user={userObj}
      handleFilter={handleFilterFN}
      markTodoDone={markTodoDone}
      toggleTheme={toggleThemeFN}
    />
  );

  expect(getByTestId("todoItem3").textContent).toBe("Fill Gas");
});
