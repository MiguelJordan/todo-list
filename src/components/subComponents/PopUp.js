import React from "react";
import { Button, Modal, TextField, Box } from "@mui/material";

export default function PopUp({ children, open, close, sx = {} }) {
  return (
    <Modal open={open} onClose={() => close(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #9e9e9e",
          boxShadow: 24,
          p: 4,
          width: 300,
          borderRadius: "8px",
          ...sx,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
