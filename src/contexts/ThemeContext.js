import { createContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";

import dark from "../_uiThemes/dark";

const themes = { dark };

const getTheme = (name = "") => themes[name];

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [name, setName] = useState("dark");
  const [theme, setTheme] = useState(getTheme(name));

  const changeTheme = (name = "") => {
    if (getTheme(name)) {
      setName(name);
    }
  };

  const context = { name, changeTheme };
  return (
    <ThemeContext.Provider value={context}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
