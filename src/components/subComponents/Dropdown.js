import { useContext, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { TrContext } from "../../contexts/TranslationContext";

export default function Dropdown({
  label = "",
  labelId = "",
  onchange,
  values = [],
  field = "",
  translated = false,
  variant = "outlined",
}) {
  const { t } = useContext(TrContext);
  const [value, setValue] = useState(values[0]);

  const getValue = (value) => (values.includes(value) ? value : values[0]);

  return (
    <FormControl sx={{ m: 1, minWidth: 80 }} variant={variant}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        label={label}
        labelId={labelId}
        autoWidth
        style={{ color: "#B3B3B3" }}
        value={getValue(value)}
        onChange={(e) => {
          let _value = getValue(e.target.value);
          if (field) onchange([{ field: _value }]);
          if (onchange) onchange(_value);
          setValue(_value);
        }}
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
