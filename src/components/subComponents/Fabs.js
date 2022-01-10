import React from "react";
import Fab from "@mui/material/Fab";

import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

export default function Fabs({ path = "" }) {
  const navigate = useNavigate();

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          marginLeft: "auto",
        }}
      >
        <AddIcon
          onClick={() => navigate(path)}
          style={{
            alignSelf: "center",
          }}
        />
      </Fab>
    </>
  );
}
