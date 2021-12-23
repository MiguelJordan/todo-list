import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

// icons
import MenuIcon from "@mui/icons-material/Menu";

// components
import AccountMenu from "./menu/AccountMenu";

import { useNavigate } from "react-router-dom";

const Nav = ({ links = [], showLoginBtn = true }) => {
  const { user } = useContext(AuthContext);
  const Navigate = useNavigate();

  const openNavMenu = (event) => {
    // setAnchorElNav(event.currentTarget);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", marginBottom: "1rem" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Box> */}
          <IconButton
            size="large"
            aria-label="navigation menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={openNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          {/* </Box> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => Navigate("/")}
            sx={{ cursor: "pointer", marginRight: "auto" }}
          >
            TheBoss
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {links.map((link) => (
              <Button
                key={link.text}
                onClick={() => Navigate(link.path)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {link.text}
              </Button>
            ))}
          </Box>
          {user && <AccountMenu user={user} />}
          {!user && showLoginBtn && (
            <Button
              onClick={() => Navigate("/login")}
              sx={{
                my: 2,
                backgroundColor: "hsl(216, 100%, 46%)",
                color: "white",
                display: "block",
                border: "3px solid transparent",
                "&:hover": {
                  border: "3px solid hsl(216, 100%, 46%)",
                },
              }}
            >
              Log in
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
