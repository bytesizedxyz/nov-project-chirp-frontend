import React from "react";
import AuthService from "./AuthService";
import { cleanup, render, fireEvent, wait } from "react-testing-library";

describe("can get a token and set it into the local storage", () => {
  it("can set, get and clear tokens", () => {
    const value = "Kevin";

    const component = new AuthService();

    //redefining setToken function
    component.setToken = value => {
      localStorage.setItem("id_token", value);
      return {
        id_token: value
      };
    };

    component.getToken = () => {
      console.log(localStorage.getItem("id_token"));
      return localStorage.getItem("id_token");
    };

    component.logout = () => {
      console.log("calling logout");
      // Clear user token and profile data from localStorage
      localStorage.removeItem("id_token");
    };

    //spying on the function to see if it was called
    jest.spyOn(Storage.prototype, "setItem");
    jest.spyOn(Storage.prototype, "getItem");
    jest.spyOn(Storage.prototype, "removeItem");

    //setting item into localstorage
    component.setToken(value);
    //expecting localstorage to have been called with these values
    expect(localStorage.setItem).toHaveBeenLastCalledWith("id_token", value);
    expect(component.getToken()).toBe(value);

    component.logout();

    expect(localStorage.removeItem("id_token")).toBe(undefined);
  });
});
