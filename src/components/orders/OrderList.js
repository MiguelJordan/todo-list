import React from "react";
import Box from "@mui/material/Box";
import { makeStyles, alpha, Grid, Container } from "@material-ui/core";

import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: "8px",
    marginBottom: "20px",
    margin: "2px",
    maxWidth: "330px",
    minHeight: "150px",

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
    marginTop: "2%",
    height: "calc(80vh - 10%)",

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
    bottom: 0,
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
      marginTop: 0,
      width: "calc(100vw - 30px)",
    },
  },
}));

export default function OrderList({ role = "", array = [] }) {
  const classes = useStyles();
  const Navigate = useNavigate();

  return (
    <div className={classes.container}>
      <Container>
        <Grid container align="center" direction="row" className={classes.grid}>
          {array.map((item) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                //width: "fit-content",
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
              key={item.id}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexFlow: "column",
                  paddingLeft: "6px",
                }}
              >
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
                    onClick={() => Navigate("./detail")}
                  >
                    {role === "waiter"
                      ? `Table:${item.tableN}`
                      : ` Serveur:${item.waiterN}`}
                  </span>

                  <span
                    style={{
                      fontSize: 15,
                      color: "#707070",
                      alignItems: "flex-start",
                      alignSelf: "flex-start",
                      //marginTop: "-20%",
                    }}
                  >
                    {item.createdDate}
                  </span>
                </div>
                <hr
                  width="310vw"
                  color="gray"
                  style={{
                    color: "#B3B3B3",
                    height: 2,
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
          ))}
          {array.lenght === 0 && <div>Aucun Element Trouve</div>}
        </Grid>
      </Container>
    </div>
  );
}
