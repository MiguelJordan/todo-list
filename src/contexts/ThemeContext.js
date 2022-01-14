import { createContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";

import themes from "../_uiThemes";

const getTheme = (name = "") => themes[name];

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [themeName, setName] = useState("dark");
  const [theme, setTheme] = useState(getTheme(themeName));

  const changeTheme = (name = "") => {
    const _theme = getTheme(name);
    if (_theme) {
      setName(name);
      setTheme(_theme);
    }
  };

  const context = { themeName, changeTheme };
  return (
    <ThemeContext.Provider value={context}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
