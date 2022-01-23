import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { IconButton, TextField } from "@mui/material";

// icons
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import Dropdown from "./Dropdown";

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
  ph: { "&::placeholder": { color: "#B3B3B3" } },
  inputText: { color: "#B3B3B3", margin: 0, marginBottom: 5 },
}));

export const validatePmAmount = ({ amount }) => {
  if (isNaN(amount) || Number(amount) <= 0) return false;
  amount = Number(amount);

  return true;
};

const PmField = ({
  uniqueKey,
  readOnly = false,
  reset,
  handleDelete,
  values: payment = {},
  selectValues = [],
  onChange = () => {},
}) => {
  const classes = useStyles();
  const [name, setName] = useState(selectValues[0]);
  const [amount, setAmount] = useState("");

  const _reset = () => {
    setName(selectValues[0]);
    setAmount("");
  };

  useEffect(() => onChange({ name, amount }), [amount, name]);

  useEffect(() => _reset(), [reset]);

  return readOnly ? (
    <div className={classes.PmField}>
      <input readOnly value={payment.name ?? ""} />
      <input readOnly value={payment.amount ?? ""} />

      <IconButton onClick={() => handleDelete(uniqueKey)}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </div>
  ) : (
    <div className={classes.PmField}>
      <Dropdown
        label="Name"
        capitalised={false}
        value={name}
        values={selectValues}
        handleChange={(value) => setName(value)}
      />

      <TextField
        variant="standard"
        type="number"
        value={amount}
        className={classes.inputText}
        inputProps={{ className: classes.inputText }}
        label={"Amount"}
        onChange={(e) => {
          let val = e.target.value;
          let valid = validatePmAmount({ amount: val });
          val = valid ? Number(val) : "";
          setAmount(val);
        }}
      />
    </div>
  );
};

export default PmField;
