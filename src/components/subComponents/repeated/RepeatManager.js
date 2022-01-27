import { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";

import { Button } from "@mui/material";

// contexts
import { TranslationContext } from "../../../contexts/TranslationContext";

const useStyles = makeStyles(() => ({
  parent: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    // border: "1px solid red",
  },
  repeatParent: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-start",
    width: "100%",
    maxHeight: 100,
    height: "fit-content",
    overflowY: "auto",
    marginBottom: "2px",
  },
  addField: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
}));

const RepeatManager = ({
  Component,
  extraData = [],
  handleAdd,
  handleDelete,
  readOnlyValues = [],
  validate,
  sx = {},
  sxAddBtn = {},
  sxAddField = {},
  sxComponent = {},
  sxComponentRepeat = {},
  sxRepeat = {},
}) => {
  const { t } = useContext(TranslationContext);
  const classes = useStyles();

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [reset, setReset] = useState(false);
  const [values, setValues] = useState();

  return (
    <div className={classes.parent} style={{ width: "100%", ...sx }}>
      <div className={classes.repeatParent} style={{ ...sxRepeat }}>
        {readOnlyValues.map((val, index) => {
          return (
            <Component
              key={index}
              deleteKey={index}
              readOnly={true}
              values={val}
              handleDelete={handleDelete}
              sx={sxComponentRepeat}
            />
          );
        })}
      </div>
      <div className={classes.addField} style={{ ...sxAddField }}>
        <Component
          reset={reset}
          extraData={extraData}
          sx={sxComponent}
          onChange={(newVals) => {
            if (validate) setBtnDisabled(!validate(newVals)?.valid);
            setValues(newVals);
          }}
        />
        <Button
          style={{
            ...sxAddBtn,
            color: !btnDisabled ? sxAddBtn.color ?? "#B3B3B3" : "",
          }}
          disabled={btnDisabled}
          onClick={() => {
            handleAdd(values);
            setReset(!reset);
          }}
        >
          {t("compo.repeatManager.add-btn")}
        </Button>
      </div>
    </div>
  );
};

export default RepeatManager;
