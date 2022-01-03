import React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
// import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: "8px",
    margin: "5px",
    maxHeight: "150px",
    maxWidth: "330px",
    minWidth: "300px",

    //width: "min-content",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "300px",
      minWidth: "250px",
      minHeight: "150px",
    },

    //flex: "auto",
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
    height: "68vh",
    flexWrap: "wrap",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      height: "75vh",
    },
  },
  box: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexFlow: "column",
    paddingLeft: "6px",

    [theme.breakpoints.up("xs")]: {
      minWidth: "250px",
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: "300px",
    },
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
            <Box
              sx={{
                width: "min-content",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: "8px",
                color: "text.secondary",
                "& svg": {
                  m: 1.5,
                },
                "& hr": {
                  m: "5px",
                },
              }}
              className={classes.card}
              key={order.id}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexFlow: "column",
                  marginTop: "-10px",
                  padding: "5px",
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    color: "#001D42",
                    textAlign: "left",
                  }}
                >
                  {role === "waiter" || role === "cashier"
                    ? `Table: ${order.tableName}`
                    : ` Serveur: ${order.waiter.name}`}
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
                  height: 2,
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
                  {order.drink ? `Boisson: ${order.drink}` : "Boisson:"}
                </span>

                <span
                  style={{
                    fontSize: 20,
                    color: "#707070",
                    alignItems: "flex-start",
                    alignSelf: "flex-start",
                  }}
                >
                  {order.meal ? `Repas: ${order.meal}` : "Repas:"}
                </span>
              </div>
              {order.isPaid && (
                <span
                  style={{ marginTop: "2%", color: "green" }}
                >{`Status: Payee`}</span>
              )}
            </Box>
          );
        })
      )}
    </div>
  );
}
