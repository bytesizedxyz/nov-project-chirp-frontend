import React from "react";

export const themes = {
  light: {
    currentTheme: "light",
    lightBlueBackground: "lightBlueBackground",
    eggshellBackground: "eggshellBackground",
    greyBackground: "greyBackground",
    blueBackground: "blueBackground",
    whiteFont: "whiteFont",
    eggshellFont: "eggshellFont",
    brownFont: "brownFont",
    eggshellBorder: "eggshellBorder",
    searchIconBorder: "searchIconBorderEggshell",
    obiTwitter: "Obi Wan Kenobi Twitter",
    iconColor: "#fff"
  },
  dark: {
    currentTheme: "dark",
    brownBackground: "brownBackground",
    greyBackground: "greyBackground",
    whiteFont: "whiteFont",
    blackFont: "blackFont",
    redFont: "redFont",
    redBorder: "redBorder",
    searchIconBorder: "searchIconBorderRed",
    blackBackground: "blackBackground",
    darthTwitter: "Darth Twitter",
    iconColor: "#990303"
  }
};

export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {} // default value
});
