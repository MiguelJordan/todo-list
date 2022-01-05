import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar({
  msg = "Successful",
  color = "success",
  open,
  close,
}) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => close(false)}
      >
        <Alert
          onClose={() => close(false)}
          severity={color}
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
