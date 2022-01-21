import { useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  parent: { display: "flex", flexFlow: "column", alignItems: "center" },
  repeatParent: { display: "inherit" },
  addField: {
    display: "inherit",
    flexFlow: "row",
    justifyContent: "space-between",
  },
}));

const Manager = ({
  cp,
  handleAdd,
  addText = "Add",
  valueArray = [],
  height = 50,
}) => {
  const classes = useStyles();
  const [values, setValues] = useState();

  return (
    <div className={classes.parent}>
      <div className={classes.repeatParent} style={{ height }}>
        {" Repeated Content here "}
      </div>
      <div className={classes.addField}>{" Add value component here "}</div>
    </div>
  );
};

export default Manager;
