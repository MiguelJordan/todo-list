import { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { IconButton, TextField } from "@mui/material";

// components
import Dropdown from "../../Dropdown";

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

export const validatePmAmount = ({ amount }) => {
  const valid = isNaN(amount) || Number(amount) <= 0 ? false : true;
  return { valid, validated: valid ? Number(amount) : "" };
};

const AddPM = ({
  extraData = [],
  deleteKey,
  readOnly = false,
  reset,
  handleDelete,
  values: payment = {},
  onChange = () => {},
}) => {
  const { t } = useContext(TranslationContext);
  const classes = useStyles();
  const [name, setName] = useState(extraData[0]);
  const [amount, setAmount] = useState("");

  const _reset = () => {
    setName(extraData[0]);
    setAmount("");
  };

  useEffect(() => onChange({ name, amount }), [amount, name]);

  useEffect(() => _reset(), [reset]);

  return readOnly ? (
    <div className={classes.PmField}>
      <input readOnly value={payment.name ?? ""} />
      <input readOnly value={payment.amount ?? ""} />

      <IconButton onClick={() => handleDelete(deleteKey)}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </div>
  ) : (
    <div className={classes.PmField}>
      <Dropdown
        label={t("compo.paymentMethod.name")}
        capitalised={false}
        value={name}
        values={extraData}
        handleChange={(value) => setName(value)}
      />

      <TextField
        variant="standard"
        label={t("compo.paymentMethod.amount")}
        type="number"
        value={amount}
        className={classes.inputText}
        inputProps={{ className: classes.inputText }}
        onChange={(e) => {
          const { validated } = validatePmAmount({ amount: e.target.value });
          setAmount(validated);
        }}
      />
    </div>
  );
};

export default AddPM;
