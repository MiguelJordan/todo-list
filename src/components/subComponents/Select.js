import React from "react";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

export default function select({ onchange, values = [], defaultVal = "" }) {
  return (
    <>
      <Select
        variant="standard"
        style={{ color: "#B3B3B3" }}
        value={defaultVal}
        onChange={(e) => {
          onchange(e.target.value);
          console.log(e.target.value);
        }}
      >
        {values.map((value) => (
          <MenuItem style={{ color: "#B3B3B3" }} value={value} key={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
