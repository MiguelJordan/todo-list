import { useContext, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { TrContext } from "../../contexts/TranslationContext";

export default function Dropdown({
  label = "",
  labelId = "",
  handleChange,
  value,
  values = [],
  translated = false,
  variant = "outlined",
}) {
  const { t } = useContext(TrContext);

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 80,
        "& .css-19fqwvx-MuiSvgIcon-root-MuiSelect-icon": { color: "white" },
        "& .MuiSelect-iconOpen": {
          color: "white",
        },
      }}
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
            {translated ? t(`_var.*.dropdown-translated.${value}`) : value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
