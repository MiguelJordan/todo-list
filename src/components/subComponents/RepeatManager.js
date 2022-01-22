import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button } from "@mui/material";

const useStyles = makeStyles(() => ({
  parent: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    // border: "1px solid red",
  },
  repeatParent: {
    // boxSizing: "border-box",
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-start",
    width: "100%",
    maxHeight: 100,
    height: "fit-content",
    overflowY: "auto",
    border: "1px solid grey",
  },
  addField: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-between",
    width: "100%",
  },
}));

const RepeatManager = ({
  Cp,
  handleAdd,
  handleDelete,
  validate,
  addText = "Add",
  selectValues = [],
  readOnlyValues = [],
  repeatHeight = 150,
  width = "100%",
}) => {
  const classes = useStyles();
  const [values, setValues] = useState();
  const [btnDisabled, setBtnDisabled] = useState(true);

  return (
    <div className={classes.parent} style={{ width }}>
      <div className={classes.repeatParent} style={{ maxHeight: repeatHeight }}>
        {readOnlyValues.map((val, index) => {
          return (
            <Cp
              key={index}
              uniqueKey={index}
              readOnly={true}
              values={val}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
      <div className={classes.addField}>
        <Cp
          readOnly={false}
          selectValues={selectValues}
          onChange={(_values) => {
            if (validate) setBtnDisabled(!validate(_values));

            setValues(_values);
          }}
        />
        <Button
          variant="outlined"
          onClick={() => handleAdd(values)}
          disabled={btnDisabled}
        >
          {addText}
        </Button>
      </div>
    </div>
  );
};

export default RepeatManager;
