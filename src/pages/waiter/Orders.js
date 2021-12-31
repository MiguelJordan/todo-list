import { useContext } from "react";
import OrderList from "../../components/orders/OrderList";
import { TrContext } from "../../contexts/TranslationContext";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
//import {  makeStyles } from "@material-ui/core";

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
    marginTop: "20px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "20%",
    marginTop: "20px",
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

export default function Drinks() {
  const { t } = useContext(TrContext);

  const list = [
    {
      id: "1",
      tableN: "1",
      createdDate: "2021-12-28",
      drink: 10000,
      waiterN: "Anne",
      paymentMethod: ["MOMO"],
    },
    {
      id: "2",
      tableN: "2",
      createdDate: "2021-12-29",
      drink: 10000,
      waiterN: "Jacob",
      paymentMethod: ["OM"],
    },
    {
      id: "3",
      tableN: "3",
      createdDate: "2021-12-30",
      drink: 10000,
      waiterN: "Jack",
      paymentMethod: ["OM"],
    },
    {
      id: "4",
      tableN: "4",
      createdDate: "2021-12-31",
      drink: 10000,
      waiterN: "Michelle",
      paymentMethod: ["OM"],
    },
    {
      id: "5",
      tableN: "5",
      createdDate: "2021-12-18",
      drink: 10000,
      waiterN: "Anne",
      paymentMethod: ["OM"],
    },
    {
      id: "6",
      tableN: "6",
      createdDate: "2021-12-19",
      drink: 10000,
      waiterN: "Anne",
      paymentMethod: ["OM", "CASH"],
    },
    {
      id: "7",
      tableN: "7",
      createdDate: "2021-12-20",
      drink: 10000,
      waiterN: "Anne",
      paymentMethod: ["OM", "MOMO"],
    },
  ];

  return (
    <>
      {/* <h1 className="center">{t("pages.waiter.orders")}</h1> */}

      <OrderList array={list} role="waiter" />
    </>
  );
}
