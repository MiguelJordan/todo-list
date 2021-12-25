import React from "react";
import { makeStyles } from "@material-ui/core";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";

import ExpandMore from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  accordion: {
    backgroundColor: "#173153",
    fill: "trasparent",
    borderRadius: 0,
  },
  table: {
    maxHeight: 250,
    backgroundColor: "blue",

    //minWidth: 400,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 670,
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: 670,
    },
  },
  grid: {
    justifyContent: "center",
    color: "#B3B3B3",
    marginTop: "50%",
    //margin: 0,
    flexFlow: "column",
    [theme.breakpoints.down("sm")]: {
      //marginRight: "20%",
      marginBottom: 0,
    },
    [theme.breakpoints.between("sm", "md")]: {
      // marginLeft: "1%",
      //marginRight: "20%",
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      //marginRight: "20%",
      marginBottom: 0,
      marginTop: "50%",
    },
  },
  container: {
    marginTop: "10%",
    //marginLeft: "5%",
    //marginRight: "5%",
    height: "calc(80vh - 10%)",
    // minWidth: "50px",
    // minHeight: "300px",
    //position: "fixed",
    justifyContent: "center",
    overflowX: "hidden",
    overflowY: "scroll",
    display: "relative",
    webkitScrollbar: {
      width: 0,
    },
    position: "absolute",
    top: 0,
    bottom: 0,
    [theme.breakpoints.up("lg")]: {
      width: "calc(96vw - 150px)",
      marginLeft: "10px",
      //maxWidth: 1500,
      height: "calc(80vh - 9%)",
    },
    [theme.breakpoints.up("md")]: {
      width: "calc(100vw - 230px)",
      marginLeft: "0px",
      //maxWidth: 1500,
      height: "calc(80vh - 10%)",
      marginTop: "8%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "20%",
    },
  },
}));

export default function OrderDetails({ list = [] }) {
  const classes = useStyles();

  var familly = [];

  list.map((fam) => {
    if (!familly.includes(fam.familly)) familly.push(fam.familly);
  });

  return (
    <div>
      <Container>
        <div
          style={{
            display: "grid",

            placeContent: "center",
            placeItems: "center",
          }}
        >
          {familly.map((fam) => (
            <Grid
              align="center"
              item
              xs={6}
              sm={8}
              md={10}
              lg={12}
              style={{ flexFlow: "column" }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  style={{
                    backgroundColor: "#7F8DA0",
                    color: "#FFFFFF",
                  }}
                >
                  <Typography>{fam}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordion}>
                  <TableContainer className={classes.table}>
                    <Table
                      stickyHeader
                      aria-label="simple table"
                      className={classes.accordion}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="center"
                            style={{
                              backgroundColor: "#28405F",

                              color: "#B3B3B3",
                              fontSize: 20,
                            }}
                          >
                            Nom
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              backgroundColor: "#28405F",
                              fontSize: 20,
                              color: "#B3B3B3",
                            }}
                          >
                            Categorie
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              backgroundColor: "#28405F",
                              fontSize: 20,
                              color: "#B3B3B3",
                            }}
                          >
                            Quantite
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              backgroundColor: "#28405F",
                              fontSize: 20,
                              color: "#B3B3B3",
                            }}
                          >
                            Unite_de_mesure&nbsp;
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              backgroundColor: "#28405F",
                              fontSize: 20,
                              color: "#B3B3B3",
                            }}
                          >
                            Prix&nbsp;
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              backgroundColor: "#28405F",
                              fontSize: 20,
                              color: "#B3B3B3",
                            }}
                          >
                            Total&nbsp;
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {list.map((row) => {
                          if (row.familly === fam)
                            return (
                              <TableRow
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="center"
                                  style={{
                                    color: "#7f8893",
                                    fontSize: 25,
                                  }}
                                >
                                  {row.name}
                                </TableCell>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="center"
                                  style={{ color: "#7f8893", fontSize: 25 }}
                                >
                                  {row.category}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ color: "#7f8893", fontSize: 25 }}
                                >
                                  {row.quantity}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ color: "#7f8893", fontSize: 25 }}
                                >
                                  {row.measureUnit}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ color: "#B3B3B3", fontSize: 25 }}
                                >
                                  {row.price}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ color: "#B3B3B3", fontSize: 25 }}
                                >
                                  {row.total}
                                </TableCell>
                              </TableRow>
                            );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}
        >
          <Button variant="contained" style={{ backgroundColor: "#04A5E0" }}>
            {"Enregistrer & Imprimer"}
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#FF0000", marginLeft: "5%" }}
          >
            Annuler
          </Button>
        </div>
      </Container>
    </div>
  );
}
