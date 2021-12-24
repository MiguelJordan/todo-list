import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    background: {
      paper: "#001d42",
    },
    text: {
      primary: "#001d42",
      secondary: "#hsl(218, 4%, 63%)",
      light: "white",
    },
    action: {
      active: "#001E3C",
    },
    indicator: { active: "#4caf50" },
    nav: {
      active: "white",
      inActive: "hsl(218, 4%, 63%)",
    },
    success: {
      main: "#009688",
      dark: "#009688",
    },
  },
  typography: { fontFamily: "Josefin Sans" },
});
