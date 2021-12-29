import React from "react";
import Box from "@mui/material/Box";
import { makeStyles, alpha, Grid, Container } from "@material-ui/core";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: "8px",
    margin: "5px",
    minHeight: "150px",
    maxWidth: "330px",

    [theme.breakpoints.up("xs")]: {
      minWidth: "250px",
    },
    width: "min-content",
    [theme.breakpoints.up("sm")]: {
      minWidth: "300px",
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
    marginTop: ({ role }) => {
      if (role === "admin") return "45px";
      return "15px";
    },
    height: ({ role }) => {
      if (role === "admin") return "450px";
      return "470px";
    },

    justifyContent: "center",
    overflowX: "hidden",
    overflowY: "scroll",
    alignItems: "center",
    margin: "auto",
    webkitScrollbar: {
      width: 0,
    },
    transform: "translate(-50%, -50%)",
    position: "absolute",
    top: "50%",
    left: "50%",
    bottom: 5,
    [theme.breakpoints.up("lg")]: {
      width: "calc(100vw - 230px)",
      //marginLeft: "10px",
      //maxWidth: 1500,
      height: "calc(80vh - 10%)",
    },
    [theme.breakpoints.up("md")]: {
      width: "calc(100vw - 230px)",
      marginLeft: "0px",
      //maxWidth: 1500,
      height: "calc(80vh - 10%)",
    },
    [theme.breakpoints.down("sm")]: {
      //marginTop: 0,
      width: "calc(100vw - 30px)",
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
  const Navigate = useNavigate();

  return (
    <div className={classes.container}>
      <Container>
        <Grid container align="center" direction="row" className={classes.grid}>
          {array.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h2>No Order Found</h2>
            </div>
          ) : (
            array.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "min-content",
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  borderRadius: "8px",
                  //bgcolor: "background.paper",
                  color: "text.secondary",
                  "& svg": {
                    m: 1.5,
                  },
                  "& hr": {
                    m: "5px",
                  },
                }}
                className={classes.card}
                onClick={() => Navigate("./detail")}
                key={item.id}
              >
                <div className={classes.box}>
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
                        // marginTop: "-20%",
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
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      flexFlow: "column",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 20,
                        color: "#707070",
                        alignItems: "flex-start",
                        alignSelf: "flex-start",
                        marginTop: "5%",
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
                    <span
                      style={{ marginTop: "2%", color: "green" }}
                    >{`Status: Payee`}</span>
                  )}
                </div>
              </Box>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
}
