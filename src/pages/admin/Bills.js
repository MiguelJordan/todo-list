import { useContext, useState } from "react";
import { TrContext } from "../../contexts/TranslationContext";

import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core";

import OrderList from "../../components/orders/OrderList";
import Search from "../../components/subComponents/Search";
import Dropdown from "../../components/subComponents/Dropdown";

const useStyles = makeStyles((theme) => ({
  inputText: {
    color: "#B3B3B3",
  },
}));

export default function Bills() {
  const { t } = useContext(TrContext);
  const classes = useStyles();

  const list = [
    {
      id: "1",
      tableN: "1",
      createdDate: "2021-12-28",
      drink: 10000,
      waiterN: "Jack",
    },
    {
      id: "2",
      tableN: "2",
      createdDate: "2021-12-29",
      drink: 10000,
      waiterN: "Anne",
    },
    {
      id: "3",
      tableN: "3",
      createdDate: "2021-12-30",
      drink: 10000,
      waiterN: "Rose",
    },
    {
      id: "4",
      tableN: "4",
      createdDate: "2021-12-31",
      drink: 10000,
      waiterN: "Jean",
    },
    {
      id: "5",
      tableN: "5",
      createdDate: "2021-12-18",
      drink: 10000,
      waiterN: "Anne",
    },
    {
      id: "6",
      tableN: "6",
      createdDate: "2021-12-19",
      drink: 10000,
      waiterN: "Jack",
    },
    {
      id: "7",
      tableN: "7",
      createdDate: "2021-12-20",
      drink: 10000,
      waiterN: "Jean",
    },
  ];
  const [startD, setStartD] = useState(
    `${new Date().toISOString().slice(0, 10)}`
  );

  const [stopD, setStopD] = useState(
    `${new Date().toISOString().slice(0, 10)}`
  );

  const [searchVal, setSearchVal] = useState("");

  const filterArray = [];

  list.filter((val) => {
    if (val.createdDate <= stopD && val.createdDate >= startD) {
      if (
        val.waiterN.toLowerCase().includes(searchVal.toLowerCase().trim()) ||
        !val.waiterN
      )
        return filterArray.push(val);
    }
    return "";
  });
  console.log();
  return (
    <>
      {/* <h1 className="center">{t("Admin's Bills")}</h1> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "5px",
          color: "white",
        }}
      >
        <TextField
          variant="standard"
          type="date"
          label="Start Date"
          autoFocus
          value={startD}
          inputProps={{
            className: classes.inputText,
          }}
          onChange={(e) => {
            if (e.target.value <= stopD) setStartD(e.target.value);
          }}
          style={{ marginRight: "10px" }}
        />
        <span style={{ marginTop: "20px" }}>AU</span>
        <TextField
          variant="standard"
          label="Stop Date"
          autoFocus
          type="date"
          value={stopD}
          inputProps={{
            className: classes.inputText,
          }}
          style={{ marginLeft: "10px" }}
          onChange={(e) => {
            if (e.target.value >= startD) setStopD(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Search onChange={setSearchVal} />
      </div>
      <OrderList array={filterArray} role="admin" />

      <div
        style={{
          position: "absolute",
          bottom: 45,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90vw",
        }}
      >
        <span>
          Synthese :
          <Dropdown values={["Drinks", "Meal", "Global"]} />
        </span>
        <span style={{ marginTop: "-10px" }}>
          <TextField variant="standard" label="Total" />
        </span>
      </div>
    </>
  );
}
