import { useContext, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { TrContext } from "../../contexts/TranslationContext";

export default function Dropdown({
  handleChange,
  label = "",
  labelId = "",
  translated = false,
  value,
  values = [],
  variant = "outlined",
}) {
  const { t } = useContext(TrContext);

  return (
    <FormControl
      sx={{ m: 1, minWidth: 80, "& svg": { color: "rgb(179, 179, 179)" } }}
      variant={variant}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        label={label}
        labelId={labelId}
        autoWidth
        style={{ color: "#B3B3B3" }}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      >
        {values.map((value) => (
          <MenuItem style={{ color: "#B3B3B3" }} value={value} key={value}>
            {translated ? t(`compo.dropdown.${value}`) : value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
