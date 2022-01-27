import { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { TextField, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";

//components
import OrderList from "../../components/orders/OrderList";
import Search from "../../components/subComponents/Search";
import Dropdown from "../../components/subComponents/Dropdown";
import PopUp from "../../components/subComponents/PopUp";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";
// import { TranslationContext } from "../../contexts/TranslationContext";

// functions
import { getPeriod } from "../../functions/data";

// hooks
import useSearch from "../../hooks/useSearch";

const theme = createTheme({
  components: {
    MuiDialogContent: {
      defaultProps: {
        root: "red",
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
  const { orders, makeQuery, setQuery } = useContext(OrderContext);

  const [popupOpen, setPopupOpen] = useState(false);

  // date at which the workUnit was created
  const [oldestDate] = useState(dayjs(new Date(user.workUnit.createdAt)));

  const [format, setFormat] = useState("Period");
  const [criteria, setCriteria] = useState("waiterId");
  const [date, setDate] = useState(oldestDate);
  const [selectedDate, setSelectedDate] = useState(oldestDate);

  const [period, setPeriod] = useState({
    start: oldestDate,
    stop: dayjs(new Date()),
  });
  const [selectedPeriod, setSelectedPeriod] = useState({
    start: oldestDate,
    stop: dayjs(new Date()),
  });

  const { filtered, setSearchVal } = useSearch({
    data: orders,
    criteria,
  });

  useEffect(() => {
    const { start, stop } = getPeriod({ start: date, useDistance: true });
    let _query = makeQuery({ _start: start, _stop: stop });
    setQuery(_query);
  }, [date]);

  useEffect(() => {
    const { start, stop } = getPeriod({
      asDate: false,
      start: period.start,
      stop: period.stop,
    });

    let _query = makeQuery({ _start: start, _stop: stop });
    setQuery(_query);
  }, [period]);

  // const [payment, setPayment] = useState(user.workUnit.paymentMethods[0]);

  return (
    <>
      <PopUp open={popupOpen} close={setPopupOpen}>
        <div style={{ display: "flex", marginLeft: "-10px" }}>
          <Dropdown
            label="Format"
            values={["Date", "Period"]}
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
                    value={period.start}
                    className={classes.inputText}
                    onAccept={() =>
                      setPeriod({ ...period, start: selectedPeriod.start })
                    }
                    onChange={(start) =>
                      setSelectedPeriod({ ...selectedPeriod, start })
                    }
                    minDate={oldestDate}
                    maxDate={dayjs(new Date(period.stop)).subtract(1, "day")}
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
                    value={period.stop}
                    className={classes.inputText}
                    onAccept={() =>
                      setPeriod({ ...period, stop: selectedPeriod.stop })
                    }
                    onChange={(stop) =>
                      setSelectedPeriod({ ...selectedPeriod, stop })
                    }
                    minDate={dayjs(new Date(period.start)).add(1, "day")}
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
                  onAccept={() => setDate(selectedDate)}
                  onChange={(_date) => setSelectedDate(_date)}
                  minDate={oldestDate}
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
            capitalised={false}
            label="Filter"
            values={["tableName", "waiterId"]}
            value={criteria}
            handleChange={setCriteria}
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
          onClick={() => setPopupOpen(true)}
          style={{ marginLeft: "10px" }}
        >
          <FilterAlt style={{ color: "#9e9e9e" }} />
        </IconButton>
      </div>

      <OrderList orders={filtered} role="admin" />
    </>
  );
}
