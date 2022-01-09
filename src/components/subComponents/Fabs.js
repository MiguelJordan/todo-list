import React, { useState } from "react";
import Fab from "@mui/material/Fab";
// import { styled } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

// const StyledFab = styled(Fab)(({ theme }) => ({
//   // position: "relative",
//   // zIndex: 1,
//   // bottom: 45,
//   // left: 230,
//   // right: -10,
//   // margin: "auto",
//   // float: "right",
//   // [theme.breakpoints.between("sm", "md")]: {
//   //   left: 500,
//   // },
//   // [theme.breakpoints.up("md")]: {
//   //   left: 650,
//   // },
//   // [theme.breakpoints.up("lg")]: {
//   //   left: 850,
//   // },
//   display: "flex",
//   flexDirection: "column",
//   //alignItems: "center",
//   marginTop: "auto",
//   // alignSelf: "flex-end",
// }));

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
