import { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import { TrContext } from "../../contexts/TranslationContext";

const _search = styled("div")(({ theme }) => ({
  position: "relative",
  width: "fit-content",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "55%",
  left: "10px",
  transform: "translateY(-50%)",
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: "10px",
    paddingLeft: "35px",
    transition: theme.transitions.create("width"),
    width: "10ch",
    "&:focus": {
      width: "12ch",
    },
  },
}));

export default function Search({
  onChange,
  list = [],
  searchProps = [{ name: "", method: () => {} }],
}) {
  const { t } = useContext(TrContext);
  return (
    <_search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={t("compo.search.placeholder")}
        inputProps={{ "aria-label": "search" }}
        onChange={(event) => onChange(event.target.value)}
      />
    </_search>
  );
}
