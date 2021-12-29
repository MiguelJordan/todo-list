import React from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import image from "../../assests/Item_Image_d.jpg";

import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 10,
    paddingTop: "70.25%", // 16:9
    minWidth: "60px",
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  root: {
    border: "2px solid #082c63",
    borderRadius: "10px",
    backgroundColor: "#082c63",
    padding: "0px",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    width: 500,
    maxWidth: 500,
  },
  iconButton: {
    padding: 10,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    backgroundColor: "transparent",
    fill: "transparent",
    color: "#B3B3B3",
    justifyContent: "center",
  },
  container: {
    marginTop: "5%",
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
    [theme.breakpoints.up("xs")]: {
      marginTop: "95px",
      width: "calc(100vw - 30px)",
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "115px",
      width: "calc(100vw - 30px)",
    },
    [theme.breakpoints.up("md")]: {
      width: "calc(100vw - 230px)",
      marginLeft: "0px",
      marginTop: "115px",
      height: "calc(80vh - 10%)",
    },
    [theme.breakpoints.up("lg")]: {
      width: "calc(100vw - 230px)",
      //marginLeft: "10px",
      //maxWidth: 1500,
      height: "calc(80vh - 10%)",
      marginTop: "110px",
    },
  },
  content: {
    fill: "transparent",
    backgroundColor: "transparent",
    borderBottom: "2px solid #2B4362",
    borderTop: 0,
    borderLeft: "2px solid #2B4362",
    borderRight: "2px solid #2B4362",
  },
  card: {
    backgroundColor: "transparent",
    //
    //marginRight: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    WebkitBorderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    //marginBottom: "20px",
    margin: "8px",
    //
    minWidth: "180px",
    padding: 0,
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: "1px",
    //   marginRight: "1px",
    // },
    // [theme.breakpoints.up("xs")]: {
    //   maxWidth: "280px",
    //   // marginRight: "10px",
    // },

    //border: "5px solid alpha(theme.palette.common.white, 0.15)",
  },
  grid: {
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginRight: "20%",
      marginBottom: 0,
    },
    [theme.breakpoints.between("sm", "md")]: {
      // marginLeft: "1%",
      marginRight: "20%",
      width: "100%",
    },
  },
  Toproot: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    color: "#B3B3B3",
    width: "90%",
    [theme.breakpoints.between("sm", "md")]: {
      justifyContent: "center",
      width: "60%",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-end",
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      justifyContent: "flex-end",
      width: "94%",
    },
    [theme.breakpoints.up("xl")]: {
      justifyContent: "flex-end",
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      width: "100%",
    },
  },
}));

export default function ItemList({ list = [], preview = true, role = "" }) {
  const classes = useStyles();
  const Navigate = useNavigate();

  return (
    <>
      <div className={classes.container}>
        <Container>
          <Grid
            container
            align="center"
            direction="row"
            className={classes.grid}
          >
            {list.length !== 0 ? (
              list.map((item) => (
                <Grid item xl={3} lg={3} md={5} sm={6} xs={12} key={item.id}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.media}
                      image={image}
                      title={item.name}
                    />
                    <CardContent className={classes.content}>
                      <Typography variant="h6" style={{ color: "#B3B3B3" }}>
                        {item.name}

                        <hr
                          style={{
                            color: "#B3B3B3",
                            backgroundColor: "#B3B3B3",
                            height: 0.5,
                          }}
                        />
                      </Typography>
                      <form className={classes.formControl}>
                        <label>Prix: </label>
                        <Select
                          native
                          variant="standard"
                          label="Prix"
                          style={{ color: "#FFFFFF" }}
                        >
                          {item.prices.map((price) => (
                            <>
                              <option
                                key={price}
                                value={price}
                                style={{ color: "#B3B3B3" }}
                              >
                                {price}
                              </option>
                            </>
                          ))}
                        </Select>
                        <br />
                        <br />
                        <label htmlFor="">Quantite En Stock : </label>
                        <output
                          type="number"
                          style={{
                            backgroundColor: "#415672",
                            // width: "70px",
                            color: "#FFFFFF",
                            strokeWidth: 40,
                            marginLeft: 4,
                            padding: 8,
                            borderRadius: "5px",
                          }}
                        >
                          {item.stock}
                        </output>
                        {!preview && role !== "admin" && (
                          <>
                            <br />
                            <br />
                            <label htmlFor="">Quantite :</label>
                            <input
                              width={2}
                              type="number"
                              style={{
                                width: "30px",
                                marginLeft: 8,
                                backgroundColor: "#415672",
                                color: "#FFFFFF",
                              }}
                              className={classes.inp}
                            />
                            <br />
                            <br />
                            <Button
                              variant="outlined"
                              style={{ border: "4px solid #2B4362" }}
                            >
                              Ajouter
                            </Button>
                          </>
                        )}
                        {role === "admin" && (
                          <>
                            <Button>{"Detail"}</Button>
                          </>
                        )}
                      </form>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span>No Item Found</span>
              </div>
            )}
          </Grid>
        </Container>
      </div>
    </>
  );
}
