import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import { useNavigate } from "react-router-dom";

import Search from "../subComponents/Search";
import Dropdown from "../subComponents/Dropdown";

import { capitalise } from "../../functions/data";

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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "auto",
    height: "70vh",
    flexWrap: "wrap",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      height: "75vh",
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

const apiUrl = process.env.REACT_APP_API_URL;

export default function ItemList({ list = {}, preview = true, role = "" }) {
  const classes = useStyles();
  const [searchVal, setSearchVal] = useState();
  // const [store, setStore] = useState();
  const Navigate = useNavigate();

  const [family, setFamily] = useState("");
  const [category, setCategory] = useState("");
  const [filterArray, setArray] = useState(list?.[family]?.[category] ?? []);

  const families = Object.keys(list);
  const [categories, setCats] = useState(Object.keys(list?.[family] ?? []));

  const onCatChange = (value, family = "") => {
    if (value) return setCategory(value);
    setCategory(Object.keys(list[family])[0]);
  };

  const onFamChange = (_family) => {
    setCats(Object.keys(list[_family]));
    onCatChange(null, _family);
    setFamily(_family);
  };

  useEffect(() => {
    if (families.length) onFamChange(families[0]);
  }, []);

  useEffect(() => {
    setArray(list?.[family]?.[category] ?? []);
  }, [category, family]);

  return (
    <>
      {role === "waiter" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            margin: "15px 0",
          }}
        >
          <span>
            Family:{" "}
            <Dropdown
              values={families}
              onchange={onFamChange}
              defaultVal={family}
            />
          </span>
          <span>
            Category:{" "}
            <Dropdown
              values={categories}
              onchange={(value) => onCatChange(value)}
              defaultVal={category}
            />
          </span>
          <Search onChange={setSearchVal} />
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
            Stock: <Dropdown />
          </span>
        </div>
      )}

      <div className={classes.container}>
        {filterArray.length !== 0 ? (
          filterArray.map((item) => (
            <Card className={classes.card} key={item.id}>
              <CardMedia
                className={classes.media}
                image={apiUrl + item.imageUrl}
                title={item.name}
              />
              <CardContent className={classes.content}>
                <Typography
                  variant="h6"
                  style={{ color: "#B3B3B3", textAlign: "center" }}
                >
                  {capitalise(item.name)}

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
                  <Dropdown values={item.prices} defaultVal={item.prices[0]} />
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
                    {item.quantity}
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
            <h2>No Item Found</h2>
          </div>
        )}
      </div>
    </>
  );
}
