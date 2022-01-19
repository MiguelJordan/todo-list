import React from "react";
import Fab from "@mui/material/Fab";

import AddIcon from "@mui/icons-material/Add";
import { Tooltip, Zoom } from "@mui/material";

export default function Fabs({ handleClick, sx = {}, ToolTipText }) {
  return (
    <Tooltip TransitionComponent={Zoom} title={ToolTipText}>
      <Fab
        onClick={handleClick}
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
        <AddIcon style={{ alignSelf: "center" }} />
      </Fab>
    </Tooltip>
  );
}
