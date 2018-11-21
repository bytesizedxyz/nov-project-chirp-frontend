import React from "react";

export const themes = {
  light: {
    Header: {
      color: "yellow"
    },
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    Header: {
      color: "brown"
    },
    foreground: "#ffffff",
    background: "#222222"
  }
};

export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {} // default value
});
