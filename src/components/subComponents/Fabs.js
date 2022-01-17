import React from "react";
import Fab from "@mui/material/Fab";

import AddIcon from "@mui/icons-material/Add";
import { Tooltip, Zoom } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Fabs({ path = "", handleClick, sx = {}, ToolTipText }) {
  const navigate = useNavigate();

  return (
    <Tooltip TransitionComponent={Zoom} title={ToolTipText}>
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          marginLeft: "20px",
          marginBottom: "auto",
          ...sx,
        }}
      >
        <AddIcon
          onClick={() => {
            if (path) navigate(path);
            handleClick();
          }}
          style={{
            alignSelf: "center",
          }}
        />
      </Fab>
    </Tooltip>
  );
}
