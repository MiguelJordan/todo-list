//import { Select } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import ItemList from "../../components/storeItems/ItemList";
import { TrContext } from "../../contexts/TranslationContext";
import { makeStyles } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";

import Search from "../../components/subComponents/Search";
import Select from "../../components/subComponents/Select";

const useStyles = makeStyles((theme) => ({
  search: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up("xs")]: {},
    [theme.breakpoints.up("md")]: {
      marginTop: "1%",
    },
  },
  filters: {
    display: "flex",
    marginTop: "20px",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("xs")]: {},
  },
}));

export default function Drinks() {
  const [searchVal, setSearchVal] = useState("");
  const classes = useStyles();
  const { t } = useContext(TrContext);

  const list = {
    drinks: {
      whisky: [{ id: "1", name: "Label", prices: [1000, 2000], stock: 50 }],
      Beer: [
        {
          id: "2",
          name: "Castel",
          prices: [1000, 2000],
          stock: 50,
          image: "",
        },
        {
          id: "3",
          name: "Boster",
          prices: [1000, 1500],
          stock: 150,
          image: "",
        },
        {
          id: "6",
          name: "Castel",
          prices: [1000, 2000],
          stock: 50,
          image: "",
        },
        {
          id: "7",
          name: "Boster",
          prices: [1000, 1500],
          stock: 150,
          image: "",
        },
        {
          id: "8",
          name: "Castel",
          prices: [1000, 2000],
          stock: 50,
          image: "",
        },
        {
          id: "9",
          name: "Boster",
          prices: [1000, 1500],
          stock: 150,
          image: "",
        },
      ],
    },
  };

  return (
    <div>
      <ItemList list={list} preview={false} role="waiter" />
    </div>
  );
}
