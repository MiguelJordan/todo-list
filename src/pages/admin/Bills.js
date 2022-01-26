import { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { TextField, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";

//contexts
import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";

//components
import OrderList from "../../components/orders/OrderList";
import Search from "../../components/subComponents/Search";
import Dropdown from "../../components/subComponents/Dropdown";
import PopUp from "../../components/subComponents/PopUp";

// contexts
// import { TranslationContext } from "../../contexts/TranslationContext";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  inputText: {
    color: "#B3B3B3",
  },
  datePicker: {
    "& > .MuiGrid-root ": {
      color: "#B3B3B3",
    },
    inputField: {
      "&:hover": {
        "&& fieldset": {
          border: "1px solid darkblue",
        },
      },
    },
  },
}));

export default function Bills() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { orders } = useContext(OrderContext);
  const [_orders, setOrders] = useState([]);

  //date at which the workUnit was created
  const createdDate = dayjs(new Date(user.workUnit.createdAt));

  const [open, setOpen] = useState(false);
  const [startP, setStartD] = useState(createdDate);
  const [stopP, setStopD] = useState(dayjs(new Date()));
  const [date, setDate] = useState(createdDate);

  const [format, setFormat] = useState("Period");
  const [payment, setPayment] = useState(user.workUnit.paymentMethods[0]);
  const [_synthesis, setSynthesis] = useState("Drinks");

  const synthesis = { Global: 20000, Meals: 10000, Drinks: 10000 };

  const [searchVal, setSearchVal] = useState("");

  const convert = (date) => {
    return dayjs(new Date(date)).format("DD-MM-YYYY");
  };

  useEffect(() => {
    const filtered = orders.filter((order) => {
      if (format === "Date") {
        if (
          convert(date) === convert(order.createdAt) &&
          (!searchVal ||
            order.waiter.name
              .toLowerCase()
              .includes(searchVal.toLowerCase().trim()))
        )
          return true;
      } else if (format === "Period") {
        if (
          convert(order.createdDate) < convert(stopP) &&
          convert(order.createdDate) > convert(startP) &&
          (!searchVal ||
            order.waiter.name
              .toLowerCase()
              .includes(searchVal.toLowerCase().trim()))
        )
          return true;
      }
      return false;
    });
    setOrders(filtered);
  }, [date, format, orders, searchVal, startP, stopP]);

  return (
    <>
      <PopUp open={open} close={setOpen}>
        <div style={{ display: "flex", marginLeft: "-10px" }}>
          <Dropdown
            label="Format"
            values={["Period", "Date"]}
            value={format}
            handleChange={setFormat}
            sx={{ marginLeft: "-13px" }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
              {format === "Period" ? (
                <>
                  <MobileDatePicker
                    label="Du"
                    inputFormat="DD-MM-YYYY"
                    value={startP}
                    className={classes.inputText}
                    onChange={(newValue) => {
                      setStartD(newValue);
                    }}
                    minDate={createdDate}
                    maxDate={dayjs(new Date(stopP)).subtract(1, "day")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{
                          input: { color: "#B3B3B3", height: "3px" },
                          svg: { color: "#B3B3B3" },
                          label: { color: "#B3B3B3" },
                          marginTop: "10px",
                          marginLeft: "5px",
                          width: "110px",
                          //height: "10px",
                          "&:hover": {
                            "&& fieldset": {
                              border: "1px solid darkblue",
                            },
                          },
                        }}
                      />
                    )}
                  />

                  <MobileDatePicker
                    label="Au"
                    inputFormat="DD-MM-YYYY"
                    value={stopP}
                    className={classes.inputText}
                    onChange={(newValue) => {
                      setStopD(newValue);
                    }}
                    minDate={dayjs(new Date(startP)).add(1, "day")}
                    maxDate={dayjs(new Date())}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{
                          input: { color: "#B3B3B3", height: "3px" },
                          svg: { color: "#B3B3B3" },
                          label: { color: "#B3B3B3" },
                          marginTop: "10px",
                          marginLeft: "5px",
                          "&:hover": {
                            "&& fieldset": {
                              border: "1px solid darkblue",
                            },
                          },
                          width: "110px",
                        }}
                      />
                    )}
                  />
                </>
              ) : (
                <MobileDatePicker
                  label="Date"
                  inputFormat="DD-MM-YYYY"
                  value={date}
                  className={classes.inputText}
                  onChange={(newValue) => {
                    var date = new Date(newValue).toISOString().slice(0, 10);

                    setDate(date);
                  }}
                  minDate={createdDate}
                  maxDate={dayjs(new Date())}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        input: { color: "#B3B3B3", height: "3px" },
                        svg: { color: "#B3B3B3" },
                        label: { color: "#B3B3B3" },
                        marginTop: "10px",
                        marginLeft: "5px",
                        width: "110px",
                        "&:hover": {
                          "&& fieldset": {
                            border: "1px solid darkblue",
                          },
                        },
                      }}
                    />
                  )}
                />
              )}
            </ThemeProvider>
          </LocalizationProvider>
        </div>
        <div style={{ display: "flex", marginLeft: "-35px" }}>
          <Dropdown
            label="PaymentMethod"
            values={user.workUnit.paymentMethods}
            value={payment}
            handleChange={setPayment}
            sx={{ marginLeft: "13px" }}
          />
        </div>
      </PopUp>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "25px",
        }}
      >
        <Search onChange={setSearchVal} />
        <IconButton
          onClick={() => setOpen(true)}
          style={{ marginLeft: "10px" }}
        >
          <FilterAlt style={{ color: "#9e9e9e" }} />
        </IconButton>
      </div>
      <OrderList orders={_orders} role="admin" />

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
            values={["Drinks", "Meals", "Global"]}
            value={_synthesis}
            handleChange={setSynthesis}
          />
        </span>
        <span style={{ marginTop: "-10px" }}>
          <TextField
            variant="standard"
            label="Total"
            value={synthesis[_synthesis]}
            inputProps={{
              className: classes.inputText,
              readOnly: true,
            }}
          />
        </span>
      </div>
    </>
  );
}
