import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function _Dialog({
  openDialog,
  closeDialog,
  content,
  PositiveRes,
}) {
  const CloseDialog = () => {
    closeDialog(false);
  };
  return (
    <div>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={CloseDialog}
      >
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={PositiveRes}>Oui</Button>
          <Button onClick={CloseDialog}>Non</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
