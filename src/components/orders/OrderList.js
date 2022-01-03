import React from "react";
import Box from "@mui/material/Box";
import { makeStyles, alpha, Grid, Container } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import DoneIcon from "@mui/icons-material/Done";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "8px",
    minWidth: "250px",
    maxWidth: "280px",
    maxHeight: "150px",
    //flexBasis: "33.33333%",
    backgroundColor: "white",
    borderRadius: "8px",
    flex: "auto",
  },
  grid: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: "0",
    // verticalAlign: "middle",
    //flexWrap: "wrap",

    //margin: 0,
    [theme.breakpoints.down("sm")]: {
      // marginLeft: 0,
      // marginRight: "20%",
      // marginBottom: 0,
    },
    [theme.breakpoints.between("sm", "md")]: {
      //marginLeft: "1%",
      //marginRight: "20%",
      width: "100%",
    },
  },
  container: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    alignitems: "center",
    overflowY: "auto",
    height: ({ role }) => {
      if (role === "admin") return "63vh";
      return "68vh";
    },
    flexWrap: "wrap",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      height: "75vh",
    },
  },
}));

export default function OrderList({ role = "", array = [] }) {
  const classes = useStyles({ role });
  const Navigate = useNavigate();

  return (
    <div className={classes.container}>
      {array.length === 0 ? (
        <h2
          style={{
            marginTop: "100px",
          }}
        >
          No Order Found
        </h2>
      ) : (
        array.map((item) => (
          <Box className={classes.card} key={item.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexFlow: "column",
                marginTop: "-10px",
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  color: "#001D42",
                  alignItems: "flex-start",
                  alignSelf: "flex-start",
                  marginTop: "20px",
                }}
              >
                {role === "waiter" || role === "cashier"
                  ? `Table: ${item.tableN}`
                  : ` Serveur: ${item.waiterN}`}
              </span>

              <span
                style={{
                  fontSize: 15,
                  color: "#707070",
                  alignItems: "flex-start",
                  alignSelf: "flex-start",
                  marginTop: "4px",
                }}
              >
                {item.createdDate}
              </span>
            </div>
            <hr
              width="90%"
              color="gray"
              style={{
                color: "#B3B3B3",
                height: 2,
                marginTop: "5px",
              }}
            />
            <div
              style={{
                display: "flex",
                marginBottom: "10px",
                flexFlow: "column",
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  color: "#707070",
                  alignItems: "flex-start",
                  alignSelf: "flex-start",
                  marginTop: "2px",
                }}
              >
                {item.drink ? `Boisson: ${item.drink}` : "Boisson:"}
              </span>

              <span
                style={{
                  fontSize: 20,
                  color: "#707070",
                  alignItems: "flex-start",
                  alignSelf: "flex-start",
                }}
              >
                {item.meal ? `Repas: ${item.meal}` : "Repas:"}
              </span>
            </div>
            {item.isPaid && (
              <span style={{ marginTop: "1px", color: "green" }}>
                {<DoneIcon />}
              </span>
            )}
          </Box>
        ))
      )}
    </div>
  );
}
