import { Fragment, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import { colors, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";

// get user option by role
import useOptions from "./menuOptions";

// context
import { SocketContext } from "../../../contexts/SocketContext";

const useStyles = makeStyles((theme) => ({
  onlineParent: {
    position: "relative",
  },
  onlineDot: {
    position: "absolute",
    right: 0,
    width: 15,
    height: 15,
    borderRadius: "50%",
    backgroundColor: colors.green[500],
    zIndex: 2,
  },
}));

export default function AccountMenu({ user }) {
  const { socketConnected } = useContext(SocketContext);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = useOptions(user?.role);

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <div className={classes.onlineParent}>
              {socketConnected && <div className={classes.onlineDot} />}
              <Avatar alt={user?.firstName} src={user?.profilePic}>
                {user?.firstName[0]}
              </Avatar>
            </div>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: "hsl(0, 0%, 7%)",
            color: "white",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "hsl(0, 0%, 7%)",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.text} onClick={option.handleClick}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              {option.text}
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
}
