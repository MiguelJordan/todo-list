import { forwardRef, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function AlertDialogSlide({
  _open = false,
  title,
  content,
  contentText,
  agree = {
    bgcolor: "red",
    color: "white",
    text: "Agree",
    handler: () => {},
  },
  disagree = {
    bgcolor: "black",
    color: "white",
    text: "Disagree",
    handler: () => {},
  },
}) {
  const [open, setOpen] = useState(_open);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setOpen(_open);
    console.log("Re-render");
  }, [_open]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {contentText && <DialogContentText>{contentText}</DialogContentText>}
        {content}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            disagree.handler();
          }}
          style={{ backgroundColor: disagree.bgcolor, color: disagree.color }}
        >
          {disagree.text}
        </Button>
        <Button
          onClick={() => {
            handleClose();
            agree.handler();
          }}
          style={{ backgroundColor: agree.bgcolor, color: agree.color }}
        >
          {agree.text}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
