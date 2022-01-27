import { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { IconButton, TextField } from "@mui/material";

// components
import DisplayField from "../../DisplayField";

// contexts
import { TranslationContext } from "../../../../contexts/TranslationContext";

// icons
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const useStyles = makeStyles(() => ({
  display: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-around",
    alignItems: "center",
    "& .MuiIconButton-root": { color: "black" },
  },
  // input: {
  //   display: "flex",
  //   flexFlow: "column",
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  // },
  inputText: { color: "#B3B3B3", margin: 0, marginBottom: 5 },
}));

export const validateOtherUnits = ({
  coefficient,
  measureUnit,
  measureUnitPlural,
}) => {
  let valid = true;
  if (isNaN(coefficient) || Number(coefficient) <= 0) {
    valid = false;
    coefficient = "";
  } else {
    coefficient = Number(coefficient);
  }

  measureUnit = String(measureUnit).trim();
  if (!measureUnit) {
    valid = false;
    measureUnit = "";
  }

  measureUnitPlural = String(measureUnitPlural).trim();
  if (!measureUnitPlural) {
    valid = false;
    measureUnitPlural = "";
  }

  return {
    valid,
    validated: { coefficient, measureUnit, measureUnitPlural },
  };
};

const AddOtherUnits = ({
  extraData = [],
  deleteKey,
  readOnly = false,
  reset,
  handleDelete,
  values: unit = {},
  onChange = () => {},
}) => {
  const { t } = useContext(TranslationContext);
  const classes = useStyles();
  const [displayClass] = useState({
    margin: 2,
    padding: 8,
    width: 30,
    backgroundColor: "#415672",
    borderRadius: 5,
    color: "#FFFFFF",
  });
  const [coefficient, setCoeff] = useState("");
  const [measureUnit, setMU] = useState("");
  const [measureUnitPlural, setMUPlural] = useState("");

  const _reset = () => {
    setCoeff("");
    setMU("");
    setMUPlural("");
  };

  useEffect(() => {
    onChange({ coefficient, measureUnit, measureUnitPlural });
  }, [coefficient, measureUnit, measureUnitPlural]);

  useEffect(() => _reset(), [reset]);

  return readOnly ? (
    <div className={classes.display}>
      <DisplayField value={unit.coefficient ?? ""} sx={{ ...displayClass }} />
      <DisplayField
        value={unit.measureUnit ?? ""}
        sx={{ ...displayClass, width: 75 }}
      />
      <DisplayField
        value={unit.measureUnitPlural ?? ""}
        sx={{ ...displayClass, width: 85 }}
      />

      <IconButton onClick={() => handleDelete(deleteKey)}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </div>
  ) : (
    <div className={classes.display}>
      <TextField
        variant="standard"
        label={t("compo.otherUnit.coefficient")}
        type="number"
        value={coefficient}
        width={5}
        className={classes.inputText}
        inputProps={{ className: classes.inputText }}
        onChange={(e) => {
          const { validated } = validateOtherUnits({
            coefficient: e.target.value,
            measureUnit,
            measureUnitPlural,
          });
          setCoeff(validated.coefficient);
        }}
      />

      <TextField
        variant="standard"
        label={t("compo.otherUnit.measureUnit")}
        type="text"
        value={measureUnit}
        width={75}
        className={classes.inputText}
        inputProps={{ className: classes.inputText }}
        onChange={(e) => {
          const { validated } = validateOtherUnits({
            coefficient,
            measureUnit: e.target.value,
            measureUnitPlural,
          });
          setMU(validated.measureUnit);
        }}
      />

      <TextField
        variant="standard"
        label={t("compo.otherUnit.measureUnitPlural")}
        type="text"
        value={measureUnitPlural}
        width={85}
        className={classes.inputText}
        inputProps={{ className: classes.inputText }}
        onChange={(e) => {
          const { validated } = validateOtherUnits({
            coefficient,
            measureUnit,
            measureUnitPlural: e.target.value,
          });
          setMUPlural(validated.measureUnitPlural);
        }}
      />
    </div>
  );
};

export default AddOtherUnits;
