import { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TimePicker from "@mui/lab/TimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

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
  root: {
    "& > .MuiButtonBase-root-MuiPickersDay-root": {
      color: "#B3B3B3",
    },
  },
}));

export default function Bills() {
  const classes = useStyles();
  //const { t } = useContext(TrContext);
  const { user } = useContext(AuthContext);
  const { orders } = useContext(OrderContext);
  const [_orders, setOrders] = useState([]);

  //date at which the workUnit was created
  const createdDate = dayjs(new Date(user.workUnit.createdAt)).format(
    "YYYY-MM-DD"
  );

  //get current date and and 1 day to it
  const currentDate = new Date();
  const newDate = currentDate.setDate(currentDate.getDate() + 1);

  const [startP, setStartD] = useState(createdDate);
  const [stopP, setStopD] = useState(
    createdDate === new Date().toISOString().slice(0, 10)
      ? `${new Date(newDate).toISOString().slice(0, 10)}`
      : `${new Date().toISOString().slice(0, 10)}`
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Du"
                inputFormat="dd/MM/yyyy"
                value={startP}
                className={classes.inputText}
                onChange={(value) => {
                  if (value < stopP && value >= createdDate)
                    setStartD(new Date(value).toISOString());
                  console.log(new Date(value).toISOString().slice(0, 10));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      input: { color: "#B3B3B3" },
                      svg: { color: "#B3B3B3" },
                      label: { color: "#B3B3B3" },
                      marginTop: "7px",
                      marginLeft: "5px",
                    }}
                    classes={{
                      root: classes.root,
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Au"
                inputFormat="dd/MM/yyyy"
                value={stopP}
                className={classes.inputText}
                onChange={(value) => {
                  if (
                    value > startP &&
                    value <= new Date().toISOString().slice(0, 10)
                  )
                    setStopD(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      input: { color: "#B3B3B3" },
                      svg: { color: "#B3B3B3" },
                      label: { color: "#B3B3B3" },
                      marginTop: "7px",
                      marginLeft: "5px",
                    }}
                    classes={{
                      root: classes.root,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </>
        ) : (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date"
              inputFormat="dd/MM/yyyy"
              value={date}
              className={classes.inputText}
              onChange={(value) => {
                if (
                  value >= createdDate &&
                  value <= new Date().toISOString().slice(0, 10)
                )
                  setDate(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    input: { color: "#B3B3B3" },
                    svg: { color: "#B3B3B3" },
                    label: { color: "#B3B3B3" },
                    marginTop: "7px",
                    marginLeft: "5px",
                  }}
                  classes={{
                    root: classes.root,
                  }}
                />
              )}
            />
          </LocalizationProvider>
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
