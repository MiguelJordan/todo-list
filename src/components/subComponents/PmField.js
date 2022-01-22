import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { IconButton } from "@mui/material";

// functions
import { getInputWith } from "../../functions/data";

// icons
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import Dropdown from "./Dropdown";

const useStyles = makeStyles(() => ({
  PmField: {
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    // border: "2px solid",
    justifyContent: "space-around",
    width: "100%",
    "& > input": {
      marginRight: 10,
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
    marginTop: 10,
  },
}));

export const validatePmAmount = (amount) => {
  if (["+", "-", "e"].includes(amount)) return false;

  if (isNaN(amount)) return false;

  amount = Number(amount);

  if (amount <= 0) return false;

  return true;
};

const PmField = ({
  uniqueKey,
  readOnly = false,
  handleDelete,
  values = [],
  selectValues = [],
  onChange = () => {},
}) => {
  const classes = useStyles();
  const [name, setName] = useState(selectValues[0]);
  const [amount, setAmount] = useState();

  useEffect(() => onChange([name, amount]), [amount, name]);

  return readOnly ? (
    <div className={classes.PmField}>
      <input readOnly value={values[0] ?? ""} />
      <input readOnly value={values[1] ?? 0} />

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
      <input
        placeholder="Amount"
        defaultValue={amount}
        onChange={(e) => {
          let value = e.target.value;
          let valid = validatePmAmount(value);
          if (valid) return setAmount(Number(value));
          setAmount(-10000);
        }}
      />
    </div>
  );
};

export default PmField;
