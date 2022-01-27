import { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { IconButton, TextField } from "@mui/material";

// contexts
import { TranslationContext } from "../../../contexts/TranslationContext";

// icons
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const useStyles = makeStyles(() => ({
  priceField: {
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
    "& .MuiIconButton-root": { color: "black" },
  },
  inputText: { color: "#B3B3B3", margin: 0, marginBottom: 5 },
}));

export const validatePrice = (price = 0) => {
  const valid = isNaN(price) || Number(price) <= 0 ? false : true;

  return { valid, validated: valid ? Number(price) : "" };
};

const AddPrices = ({
  deleteKey,
  readOnly = false,
  reset,
  handleDelete,
  values: _price = "",
  onChange = () => {},
}) => {
  const { t } = useContext(TranslationContext);

  const classes = useStyles();
  const [price, setPrice] = useState("");

  const _reset = () => setPrice("");

  useEffect(() => onChange(price), [price]);

  useEffect(() => _reset(), [reset]);

  return readOnly ? (
    <div className={classes.priceField}>
      <input readOnly value={_price ?? ""} />

      <IconButton onClick={() => handleDelete(deleteKey)}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </div>
  ) : (
    <TextField
      fullWidth
      variant="standard"
      label={t("compo.paymentMethod.amount")}
      type="number"
      value={price}
      className={classes.inputText}
      inputProps={{ className: classes.inputText }}
      onChange={(e) => {
        const { validated } = validatePrice(e.target.value);
        setPrice(validated);
      }}
    />
  );
};

export default AddPrices;
