import { useContext, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// contexts
import { TranslationContext } from "../../contexts/TranslationContext";

// functions
import { capitalise } from "../../functions/data";

export default function Dropdown({
  capitalised = true,
  handleChange,
  label = "",
  labelId = "",
  translated = false,
  value,
  values = [],
  variant = "outlined",
  sx = {},
}) {
  const { t } = useContext(TranslationContext);

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 80,
        "& svg": { color: "rgb(179, 179, 179)" },
        ...sx,
      }}
      variant={variant}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        label={label}
        labelId={labelId}
        autoWidth
        value={value}
        style={{ color: "#B3B3B3" }}
        onChange={(e) => handleChange(e.target.value)}
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
      </Select>
    </FormControl>
  );
}
