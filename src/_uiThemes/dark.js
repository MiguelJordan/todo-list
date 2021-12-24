import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
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
