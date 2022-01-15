import { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@mui/material/styles";

//contexts
import { TrContext } from "../../contexts/TranslationContext";
import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";

//components
import OrderList from "../../components/orders/OrderList";
import Search from "../../components/subComponents/Search";
import Dropdown from "../../components/subComponents/Dropdown";

const theme = createMuiTheme({
  overrides: {
    MuiDialogContent: {
      root: {
        backgroundColor: "red",
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  inputText: {
    color: "#B3B3B3",
  },
  datePicker: {
    "& > .MuiGrid-root ": {
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
  const createdDate = dayjs(new Date(user.workUnit.createdAt));

  //get current date and and 1 day to it

  const [startP, setStartD] = useState(createdDate);
  const [stopP, setStopD] = useState(dayjs(new Date()));
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
                        input: { color: "#B3B3B3" },
                        svg: { color: "#B3B3B3" },
                        label: { color: "#B3B3B3" },
                        marginTop: "7px",
                        marginLeft: "5px",
                        width: "110px",
                      }}
                      classes={{
                        root: classes.root,
                      }}
                      DialogProps={{
                        style: {
                          backgroundColor: "red",
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
                        input: { color: "#B3B3B3" },
                        svg: { color: "#B3B3B3" },
                        label: { color: "#B3B3B3" },
                        marginTop: "7px",
                        marginLeft: "5px",
                        "&:hover": {
                          // border: "0.1px solid #B3B3B3",
                        },
                        width: "110px",
                      }}
                      classes={{
                        root: classes.root,
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
                      input: { color: "#B3B3B3" },
                      svg: { color: "#B3B3B3" },
                      label: { color: "#B3B3B3" },
                      marginTop: "7px",
                      marginLeft: "5px",
                      width: "110px",
                      "&:hover": {
                        borderColor: "#B3B3B3",
                      },
                    }}
                  />
                )}
                DialogProps={{
                  className: classes.datePicker,
                }}
              />
            )}
          </ThemeProvider>
        </LocalizationProvider>
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
