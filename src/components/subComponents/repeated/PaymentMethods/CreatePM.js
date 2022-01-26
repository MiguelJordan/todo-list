import { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import { IconButton, TextField } from "@mui/material";

// contexts
import { TranslationContext } from "../../../../contexts/TranslationContext";

// icons
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const useStyles = makeStyles(() => ({
  PmField: {
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    justifyContent: "space-around",
    "& > input": {
      backgroundColor: "#415672",
      color: "#FFFFFF",
      width: 100,
      border: "none",
      outline: "none",
      fontSize: 17,
      textAlign: "center",
      marginLeft: 4,
      padding: 4,
      borderRadius: "5px",
    },
    "& .MuiIconButton-root": { color: "white" },
  },
  inputText: { color: "#B3B3B3", margin: 0, marginBottom: 5 },
}));

export const validatePmName = (name = "") => {
  return String(name).trim() ? true : false;
};

const CreatePM = ({
  deleteKey,
  readOnly = false,
  reset,
  handleDelete,
  values: _name = "",
  onChange = () => {},
}) => {
  const { t } = useContext(TranslationContext);

  const classes = useStyles();
  const [name, setName] = useState("");

  const _reset = () => setName("");

  useEffect(() => onChange(name), [name]);

  useEffect(() => _reset(), [reset]);

  return (
    <div className={classes.PmField}>
      {readOnly ? (
        <>
          <input readOnly value={_name ?? ""} />

          <IconButton onClick={() => handleDelete(deleteKey)}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </>
      ) : (
        <TextField
          variant="standard"
          label={t("compo.paymentMethod.name")}
          type="text"
          value={name}
          className={classes.inputText}
          inputProps={{ className: classes.inputText }}
          onChange={(e) => {
            let val = e.target.value;
            let valid = validatePmName(val);
            val = valid ? String(val).trim : "";
            setName(val);
          }}
        />
      )}
    </div>
  );
};

export default CreatePM;
