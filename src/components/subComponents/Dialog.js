import { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { TranslationContext } from "../../contexts/TranslationContext";

export default function AlertDialog({
  _open = false,
  title,
  content,
  contentText,
  handleClose,
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
  const { t } = useContext(TranslationContext);

  return (
    <Dialog
      open={_open}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      //style={{ width: "400px" }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent style={{ color: "white", maxWidth: "300px" }}>
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
          {t("compo.dialog.disagree")}
        </Button>
        <Button
          onClick={() => {
            handleClose();
            agree.handler();
          }}
          style={{ backgroundColor: agree.bgcolor, color: agree.color }}
        >
          {t("compo.dialog.agree")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
