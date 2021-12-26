import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useNavigate } from "react-router-dom";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { TrContext } from "../../contexts/TranslationContext";

// icons
import MenuIcon from "@mui/icons-material/Menu";

// components
import AccountMenu from "./menu/AccountMenu";
import IOSwitch from "./switch";

const Nav = ({ links = [], showLoginBtn = true }) => {
  const { user } = useContext(AuthContext);
  const { t } = useContext(TrContext);
  const Navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setDrawerOpen(!drawerOpen);
  };

  const showLinkText = ({ text }) => t(`_var.${user.role}.nav.${text}`);

  links = links.map((link) => {
    const directEqual = window.location.pathname == link.path;
    const indirectEqual = window.location.pathname == `${link.path}/`;
    link.isActive = directEqual || indirectEqual ? true : false;
    return link;
  });

  return (
    <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {links.length > 0 && (
            <>
              <IconButton
                size="large"
                aria-label="navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer}
                color="inherit"
                sx={{ display: { xs: "flex", sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={"left"}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ sx: { backgroundColor: "hsl(214, 100%, 13%)" } }}
              >
                <Box
                  sx={{ display: { xs: "flex", sm: "none" }, width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer}
                  onKeyDown={toggleDrawer}
                >
                  <List>
                    {links.map((link) => (
                      <ListItem
                        button
                        key={link.text}
                        onClick={() => Navigate(link.path)}
                        sx={{
                          position: "relative",
                          width: "240px",
                          paddingLeft: "25px",
                        }}
                      >
                        {link.isActive && (
                          <Divider
                            sx={{
                              height: "50%",
                              width: "5px",
                              position: "absolute",
                              left: 5,
                              top: "50%",
                              borderRadius: "4px",
                              transform: "translateY(-50%)",
                              backgroundColor: "hsl(184, 92%, 41%)",
                            }}
                          />
                        )}
                        <ListItemText
                          primary={showLinkText(link)}
                          primaryTypographyProps={{
                            color: link.isActive
                              ? "nav.active"
                              : "nav.inActive",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => Navigate("/")}
            sx={{ cursor: "pointer", marginRight: "auto" }}
          >
            TheBoss
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              marginRight: "auto",
            }}
          >
            <List sx={{ display: "flex", marginBottom: "-15px" }}>
              {links.map((link) => (
                <ListItem
                  button
                  sx={{ position: "relative" }}
                  key={link.text}
                  onClick={() => Navigate(link.path)}
                >
                  <ListItemText
                    primary={showLinkText(link)}
                    primaryTypographyProps={{
                      color: link.isActive ? "nav.active" : "nav.inActive",
                    }}
                  />

                  {link.isActive && (
                    <Divider
                      sx={{
                        height: "5px",
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "95%",
                        marginTop: "-10px",
                        backgroundColor: "hsl(184, 92%, 41%)",
                      }}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
          <IOSwitch />
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
        <Divider
          sx={{
            display: { xs: "none", sm: "flex" },
            width: "100%",
            backgroundColor: "hsl(213, 51%, 35%)",
          }}
        />
      </Container>
    </AppBar>
  );
};
export default Nav;
