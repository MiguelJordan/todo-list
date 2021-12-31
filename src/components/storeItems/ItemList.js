import React from "react";
import { Grid, Typography, Button, Container } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
//import Select from "@mui/material/Select";

import { useNavigate } from "react-router-dom";
//import Search from "@mui/icons-material/Search";
import { useState } from "react";

import Search from "../subComponents/Search";
import Select from "../subComponents/Select";

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

  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    backgroundColor: "transparent",
    fill: "transparent",
    color: "#B3B3B3",
    textAlign: "center",
  },
  container: {
    marginTop: "90px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowX: "hidden",
    overflowY: "scroll",
    height: "65vh",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    top: "50%",
    left: "50%",
    flexWrap: "wrap",
    width: "100%",

    bottom: 0,
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
    minWidth: "250px",
    maxWidth: "280px",
    //flex: 1,

    flexBasis: "33.33333%",

    // padding: 0,
    // // [theme.breakpoints.up("lg")]: { flex: "10%" },
    // [theme.breakpoints.up("md")]: { flex: "25%" },
    // // [theme.breakpoints.up("sm")]: { flex: "0 0 33.3333%" },
    // [theme.breakpoints.down("sm")]: {
    //   flex: "50%",
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

export default function ItemList({ list = {}, preview = true, role = "" }) {
  const classes = useStyles();
  const [searchVal, setSearchVal] = useState();

  const family = Object.keys(list);
  const [fam, setFam] = useState(family[0]);
  const category = Object.keys(list[fam]);
  const [cat, setCat] = useState(category[0]);
  const [store, setStore] = useState();
  const Navigate = useNavigate();
  const filterArray = [];

  list[fam][cat].filter((val) => {
    if (!searchVal) return filterArray.push(val);
    if (val.name.toLowerCase().includes(searchVal.toLowerCase().trim()))
      return filterArray.push(val);
    return "";
  });

  return (
    <>
      {role === "waiter" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <span>
            Family:{" "}
            <Select
              values={family}
              onchange={setFam}
              defaultVal={fam}
              child={setCat}
              list={list}
            />
          </span>
          <span>
            Category:{" "}
            <Select values={category} onchange={setCat} defaultVal={cat} />
          </span>
        </div>
      )}
      {role === "admin" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <span>
            Stock: <Select />
          </span>
        </div>
      )}
      <span
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Search onChange={setSearchVal} />
      </span>

      <div className={classes.container}>
        {filterArray.length !== 0 ? (
          filterArray.map((item) => (
            <Card className={classes.card} key={item.id}>
              <CardMedia
                className={classes.media}
                image={item.image}
                title={item.name}
              />
              <CardContent className={classes.content}>
                <Typography
                  variant="h6"
                  style={{ color: "#B3B3B3", textAlign: "center" }}
                >
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
          ))
        ) : (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              bottom: 0,
            }}
          >
            <span>No Item Found</span>
          </div>
        )}
      </div>
    </>
  );
}
