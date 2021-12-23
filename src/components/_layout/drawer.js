import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

export default function TemporaryDrawer() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setDrawerOpen(!drawerOpen);
  };

  const links = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text) => (
          <ListItem button key={text}>
            {/* <Divider /> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <Drawer
        anchor={"left"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {links}
      </Drawer>
    </React.Fragment>
  );
}
