import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
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
          <Button
            variant="contained"
            style={{ backgroundColor: "red" }}
            onClick={PositiveRes}
          >
            Yes
          </Button>
          <Button variant="contained" onClick={CloseDialog}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
