import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  ListItemIcon,
  IconButton,
} from "@mui/material";

export default function PopOver({ items = [], Icon, event }) {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUser = (e) => {
    setAnchorElUser(e.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Action">
        <IconButton onClick={handleOpenUser} style={{ color: "#04A5E0" }}>
          {Icon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUser}
      >
        {items.map((item) => (
          <MenuItem
            key={item.name}
            onClick={() => {
              item.action(event);
              handleCloseUser();
            }}
          >
            <ListItemIcon
              style={{
                color: `${item.color}`,
              }}
            >
              {item.Icon}
            </ListItemIcon>
            <Typography
              textAlign={"center"}
              style={{
                color: "white",
              }}
            >
              {item.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
