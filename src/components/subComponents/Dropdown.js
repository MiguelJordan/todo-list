import { useContext } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core";

// contexts
import { TranslationContext } from "../../contexts/TranslationContext";

// functions
import { capitalise } from "../../functions/data";

const useStyles = makeStyles(() => ({
  inputProps: {
    color: "#B3B3B3",
    padding: "10px 0 2px 5px",
  },
}));

export default function Dropdown({
  capitalised = true,
  handleChange,
  label = "",
  translated = false,
  value,
  values = [],
  variant = "outlined",
  sx = {},
  textColor,
  read = false,
}) {
  const classes = useStyles();
  const { t } = useContext(TranslationContext);

  return (
    <FormControl
      sx={{
        margin: "10px 2px",
        minWidth: 80,
        "& svg": { color: "rgb(179, 179, 179)" },

        ...sx,
      }}
      variant={variant}
    >
      <TextField
        select
        label={label}
        margin="none"
        value={value}
        variant={variant}
        sx={{
          "&:hover": {
            "&& fieldset": {
              border: "1px solid darkblue",
            },
          },
        }}
        style={{ color: textColor ?? "#B3B3B3" }}
        onChange={(e) => handleChange(e.target.value)}
        inputProps={{
          readOnly: read,
          className: classes.inputProps,
        }}
      >
        {values.map((value) => (
          <MenuItem style={{ color: "#B3B3B3" }} value={value} key={value}>
            {(() => {
              let text = translated ? t(`compo.dropdown.${value}`) : value;

              text = capitalised ? capitalise(text) : text;
              return text;
            })()}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}
