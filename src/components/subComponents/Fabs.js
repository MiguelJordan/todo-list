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

          marginBottom: "auto",
          alignItems: "flex-end",
          marginLeft: "auto",
          marginTop: "-20px",
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
