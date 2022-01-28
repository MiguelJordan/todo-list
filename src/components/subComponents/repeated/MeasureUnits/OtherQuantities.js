import { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

import { IconButton, TextField } from "@mui/material";

// components
import DisplayField from "../../DisplayField";
import Dropdown from "../../Dropdown";

// contexts
import { TranslationContext } from "../../../../contexts/TranslationContext";

// functions
import { getList, getMeasureUnit, groupData } from "../../../../functions/data";

// icons
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const useStyles = makeStyles(() => ({
  display: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-around",
    alignItems: "center",
    "& .MuiIconButton-root": { color: "white" },
  },
  inputText: { color: "black", margin: 0, marginBottom: 5 },
}));

export const validateOtherQty = ({ coefficient = 1, quantity }, maxQty = 1) => {
  let valid = true;
  if (isNaN(quantity) || Number(quantity) <= 0) {
    valid = false;
  } else {
    quantity = Number(quantity);
    valid = coefficient * quantity <= maxQty;
  }

  return { valid, validated: quantity };
};

const OtherQuantities = ({
  deleteKey,
  extraData: otherUnits = [], // { otherUnits, stockQuantity }
  validateExtra: maxQty,
  readOnly = false,
  reset,
  handleDelete,
  values: qty = {},
  onChange = () => {},
}) => {
  const { t } = useContext(TranslationContext);
  const classes = useStyles();

  const [unitNames] = useState(
    getList({ data: otherUnits, criteria: "measureUnit" })
  );

  const [unitsGrouped] = useState(
    groupData({ data: otherUnits, criteria: "measureUnit" })
  );

  const [quantity, setQty] = useState("");
  const [coefficient, setCoeff] = useState(1);
  const [measureUnit, setMU] = useState(unitNames[0]);
  const [measureUnitPlural, setMUPlural] = useState("");

  const _reset = () => {
    setQty("");
    setCoeff("");
    setMU(unitNames[0]);
    setMUPlural("");
  };

  useEffect(() => {
    const coefficient = unitsGrouped[measureUnit]?.[0].coefficient;
    const measureUnitPlural = unitsGrouped[measureUnit]?.[0].measureUnitPlural;

    setCoeff(coefficient);
    setMUPlural(measureUnitPlural);

    onChange({ coefficient, measureUnit, measureUnitPlural, quantity });
  }, [measureUnit, quantity]);

  useEffect(() => _reset(), [reset]);

  return readOnly ? (
    <div className={classes.display}>
      <DisplayField
        value={`${qty.quantity} ${getMeasureUnit(qty)}`}
        sx={{
          margin: 2,
          padding: 8,
          width: 85,
          backgroundColor: "#415672",
          borderRadius: 5,
          color: "#FFFFFF",
          fontSize: 14,
        }}
      />

      <IconButton onClick={() => handleDelete(deleteKey)}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </div>
  ) : (
    <div className={classes.display}>
      <Dropdown
        label={t("compo.item.measureUnit")}
        value={measureUnit}
        values={unitNames}
        handleChange={(value) => setMU(value)}
      />

      <TextField
        variant="standard"
        label={t("compo.item.quantity")}
        type="number"
        value={quantity}
        width={5}
        className={classes.inputText}
        style={{ width: "60px", marginRight: "8px" }}
        inputProps={{ className: classes.inputText }}
        onChange={(e) => {
          const { validated } = validateOtherQty(
            {
              coefficient,
              quantity: e.target.value,
            },
            maxQty
          );

          setQty(validated);
        }}
      />
    </div>
  );
};

export default OtherQuantities;
