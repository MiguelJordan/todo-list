import { useState } from "react";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

export default function Dropdown({
  onchange,
  values = [],
  defaultVal = "",
  field = "",
}) {
  const [value, setValue] = useState("");

  return (
    <Select
      variant="standard"
      style={{ color: "#B3B3B3" }}
      value={value || defaultVal || values[0]}
      onChange={(e) => {
        if (field) onchange([{ field: e.target.value }]);
        if (onchange) onchange(e.target.value);
        setValue(e.target.value);
      }}
    >
      {values.map((value) => (
        <MenuItem style={{ color: "#B3B3B3" }} value={value} key={value}>
          {value}
        </MenuItem>
      ))}
    </Select>
  );
}
