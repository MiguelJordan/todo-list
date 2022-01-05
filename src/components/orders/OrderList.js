import React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core";
// import { useNavigate } from "react-router-dom";

import DoneIcon from "@mui/icons-material/Done";
import { TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "8px",
    minWidth: "250px",
    maxWidth: "280px",
    maxHeight: "150px",
    flexBasis: "33.33333%",
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
  inputText: {
    color: "black",
    fontSize: 20,
  },
}));

export default function OrderList({ role = "", array = [] }) {
  const classes = useStyles({ role });
  // const Navigate = useNavigate();

  return (
    <div className={classes.container}>
      {array.length === 0 ? (
        <h2 style={{ marginTop: "100px" }}>No Order Found</h2>
      ) : (
        array.map((order) => {
          return (
            <Box className={classes.card} key={order.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexFlow: "column",
                  marginTop: "-2px",
                  padding: "5px",
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    color: "black",
                    textAlign: "left",
                  }}
                >
                  <TextField
                    variant="standard"
                    label={
                      role === "waiter" || role === "cashier"
                        ? `Table`
                        : `Serveur`
                    }
                    value={
                      role === "waiter" || role === "cashier"
                        ? order.tableName
                        : order.waiter.name
                    }
                    inputProps={{
                      className: classes.inputText,
                      readOnly: true,
                    }}
                    style={{ color: "black", fontSize: 20 }}
                  />
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
                  {new Date(order.createdAt).toUTCString()}
                </span>
              </div>
              <hr
                width="95%"
                color="gray"
                style={{
                  color: "#B3B3B3",
                  height: 0.5,
                  marginTop: "5px",
                  alignSelf: "center",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexFlow: "column",
                  padding: "5px",
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    color: "#707070",
                    alignItems: "flex-start",
                    alignSelf: "flex-start",
                  }}
                >
                  {order.drink ? `Produit: ${order.drink}` : "Produit:"}
                </span>

                <span
                  style={{
                    fontSize: 20,
                    color: "#707070",
                    alignItems: "flex-start",
                    alignSelf: "flex-start",
                  }}
                >
                  {order.meal ? `Cout: ${order.meal}` : "Cout:"}
                </span>
              </div>
              {order.isPaid && (
                <span style={{ marginTop: "1px", color: "green" }}>
                  {<DoneIcon />}
                </span>
              )}
            </Box>
          );
        })
      )}
    </div>
  );
}
