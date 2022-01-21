import React, { useContext, useState } from "react";
import {
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  ListItemIcon,
  IconButton,
  Input,
} from "@mui/material";

// contexts
import { TranslationContext } from "../../contexts/TranslationContext";

export default function PopOver({
  items = [],
  Icon,
  event,
  sx = {},
  tooltipText = "",
}) {
  const { t } = useContext(TranslationContext);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUser = (e) => {
    setAnchorElUser(e.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title={tooltipText}>
        <IconButton
          onClick={handleOpenUser}
          style={{ color: "#04A5E0", ...sx }}
        >
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
          <label key={item.name} htmlFor={item.type ?? ""}>
            <MenuItem
              onClick={() => {
                if (item.type === "image") return handleCloseUser();

                item.action(event);
                handleCloseUser();
              }}
            >
              <input
                accept="image/*"
                id="image"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (item.type === "image") return item.action(e);
                }}
              />
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
                {item?.role
                  ? t(`_var.${item.role}.popover.${item.name}`)
                  : item.name}
              </Typography>
            </MenuItem>
          </label>
        ))}
      </Menu>
    </>
  );
}
