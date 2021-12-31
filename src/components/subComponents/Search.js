import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "absolute",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: "2%",
  width: "20%",
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "70%",
    marginTop: "35px",
  },
  [theme.breakpoints.between("sm", "md")]: {
    //marginLeft: "0%",
    width: "38%",
    marginTop: "20px",
    //marginRight: "5%",
  },
  [theme.breakpoints.up("md")]: {
    // marginLeft: "50%",
    // marginRight: "15%",
    width: "23%",
    marginTop: "15px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "20%",
    marginTop: 0,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function search({ onChange }) {
  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(event) => onChange(event.target.value)}
        />
      </Search>
    </>
  );
}
