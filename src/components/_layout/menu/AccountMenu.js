import { Fragment, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Divider } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { colors, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";

// get user option by role
import useOptions from "./menuOptions";

// context
import { SocketContext } from "../../../contexts/SocketContext";
import { TrContext } from "../../../contexts/TranslationContext";

const useStyles = makeStyles((theme) => ({
  presence_parent: {
    position: "relative",
  },
  presence_dot: {
    position: "absolute",
    right: -2,
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "#d58c13",
    border: "3px solid #001d42",
    zIndex: 2,
  },
  presence_online: { backgroundColor: colors.green[500] },
}));

export default function AccountMenu({ user }) {
  const { socketConnected } = useContext(SocketContext);
  const classes = useStyles();
  const { t } = useContext(TrContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const _menu = useOptions(user);

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title={t("compo.nav.account_menu.tooltip")}>
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <div className={classes.presence_parent}>
              <div
                className={`${classes.presence_dot} ${
                  socketConnected && classes.presence_online
                }`}
              />
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
        {_menu.options.map((option, index) => {
          return (
            <div key={option.text}>
              <MenuItem onClick={option.handleClick}>
                <ListItemIcon>{option.icon}</ListItemIcon>
                {option.label ? (
                  <ListItemText
                    primary={option.label}
                    secondary={t(
                      `_var.${option.role}.menu.${option.text}.text`,
                      2
                    )}
                  />
                ) : (
                  <ListItemText
                    primary={t(
                      `_var.${option.role}.menu.${option.text}.text`,
                      2
                    )}
                  />
                )}
              </MenuItem>
              {_menu.dividers.includes(index) && (
                <Divider
                  sx={{
                    bgcolor: "gray",
                    width: "95%",
                    margin: "0 auto",
                  }}
                />
              )}
            </div>
          );
        })}
      </Menu>
    </Fragment>
  );
}
