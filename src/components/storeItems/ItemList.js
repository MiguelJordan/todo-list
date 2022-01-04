import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
// import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

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
    flexFlow: "row",
    justifyContent: "center",
    alignitems: "center",
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
    border: "2px solid #2B4362",
    borderTop: 0,
  },
  card: {
    backgroundColor: "transparent",
    // borderRadius: "4px 4px 0 0",
    // borderTopLeftRadius: 4,
    // borderTopRightRadius: 4,
    // WebkitBorderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
    margin: "8px",
    minWidth: "250px",
    maxWidth: "280px",
    flexBasis: "33.33333%",
  },
}));

export default function ItemList({ items = [], preview = true, role = "" }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {items.length !== 0 ? (
        items.map((item) => (
          <Card className={classes.card} key={item.id}>
            <CardMedia
              className={classes.media}
              image={item.imageUrl}
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
                    strokewidth: 40,
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
                    <Button variant="contained" style={{ marginTop: "10px" }}>
                      {"Detail"}
                    </Button>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        ))
      ) : (
        <h2 style={{ marginTop: "100px" }}>No Item Found</h2>
      )}
    </div>
  );
}
