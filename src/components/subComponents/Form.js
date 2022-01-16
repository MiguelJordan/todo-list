import { Button, TextField } from "@mui/material";
import React from "react";
import { makeStyles } from "@material-ui/core";

import Dropdown from "./Dropdown";

const useStyles = makeStyles((theme) => ({
  inputText: {
    color: "black",
  },
  form: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    margin: "auto",
    maxWidth: "350px",
    minWidth: "250px",
    padding: "20px",
    color: "#B3B3B3",
  },
  responsive: ({ sx }) => {
    return sx;
  },
}));

export default function Form({
  fields = [],
  onSubmit,
  error,
  header,
  ButtonText,
  icon,
  sx,
}) {
  const classes = useStyles({ sx });
  return (
    <form
      onSubmit={onSubmit}
      className={`${classes.form} ${classes.responsive}`}
    >
      {header && (
        <h2 style={{ color: "#001D42", margin: "10px auto" }}>{header}</h2>
      )}
      {icon && <h1>{icon}</h1>}
      {error && <div className="formError">{error}</div>}
      {fields.map((field) => {
        if (field.component === "Dropdown") {
          return (
            <Dropdown
              key={field.label}
              label={field.label}
              values={field.values}
              value={field.value}
              handleChange={field.onchange}
              variant="standard"
              textColor={field.textColor ?? ""}
              sx={field.sx}
            />
          );
        }

        if (field.component === "TextField") {
          return (
            <TextField
              key={field.label}
              type={field.type ?? "text"}
              label={field.label ?? ""}
              variant={field.variant ?? "standard"}
              onChange={(e) => field.handleChange(e.target.value)}
              required={field.required ?? false}
              inputProps={{
                readOnly: field.readOnly ?? false,
                className: field.className ?? classes.inputText,
              }}
              fullWidth
              style={{ marginBottom: "6px" }}
            />
          );
        }
        return "";
      })}

      <Button type="submit" variant="contained" style={{ marginTop: "15px" }}>
        {ButtonText}
      </Button>
    </form>
  );
}
