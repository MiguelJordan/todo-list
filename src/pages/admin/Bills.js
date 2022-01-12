import { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";

import { TrContext } from "../../contexts/TranslationContext";
import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";

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
  const classes = useStyles();
  //const { t } = useContext(TrContext);
  const { user } = useContext(AuthContext);
  const { orders } = useContext(OrderContext);
  const [_orders, setOrders] = useState([]);

  const createdDate = dayjs(new Date(user.workUnit.createdAt)).format(
    "YYYY-MM-DD"
  );

  const [startP, setStartD] = useState(createdDate);

  const [stopP, setStopD] = useState(
    `${new Date().toISOString().slice(0, 10)}`
  );
  const [date, setDate] = useState(createdDate);

  const [format, setFormat] = useState("Period");

  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const filtered = orders.filter((order) => {
      if (format === "Date") {
        if (
          date === order.createdAt &&
          (order.waiterName
            .toLowerCase()
            .includes(searchVal.toLowerCase().trim()) ||
            !order.waiterName)
        )
          return true;
      } else if (format === "Period") {
        if (
          order.createdDate <= stopP &&
          order.createdDate >= startP &&
          (order.waiterName
            .toLowerCase()
            .includes(searchVal.toLowerCase().trim()) ||
            !order.waiterName)
        )
          return true;
      }
      return false;
    });

    setOrders(filtered);
  }, [orders, searchVal, startP, stopP, date]);

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
        <Dropdown
          label="Format"
          values={["Period", "Date"]}
          value={format}
          handleChange={setFormat}
          sx={{ marginLeft: "-13px" }}
        />
        {format === "Period" ? (
          <>
            <TextField
              variant="standard"
              type="date"
              label="Du"
              autoFocus
              value={startP}
              inputProps={{
                className: classes.inputText,
              }}
              onChange={(e) => {
                if (e.target.value < stopP && e.target.value >= createdDate)
                  setStartD(e.target.value);
              }}
              style={{ marginRight: "5px", marginLeft: "8px" }}
            />

            <TextField
              variant="standard"
              label="Au"
              autoFocus
              type="date"
              value={stopP}
              inputProps={{
                className: classes.inputText,
              }}
              style={{ marginLeft: "10px" }}
              onChange={(e) => {
                if (
                  e.target.value > startP &&
                  e.target.value <= new Date().toISOString()
                )
                  setStopD(e.target.value);
              }}
            />
          </>
        ) : (
          <TextField
            variant="standard"
            label="Date"
            type="date"
            value={date}
            inputProps={{
              className: classes.inputText,
            }}
            style={{ marginLeft: "10px" }}
            onChange={(e) => {
              if (
                e.target.value >= createdDate &&
                e.target.value <= new Date().toISOString()
              )
                setDate(e.target.value);
            }}
          />
        )}
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
      <OrderList array={_orders} role="admin" />

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
          <Dropdown
            label=" Synthese "
            values={["Drinks", "Meal", "Global"]}
            value={"Drinks"}
          />
        </span>
        <span style={{ marginTop: "-10px" }}>
          <TextField variant="standard" label="Total" />
        </span>
      </div>
    </>
  );
}
