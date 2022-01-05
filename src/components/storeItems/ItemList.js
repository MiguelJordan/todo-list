import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
// import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";

import Dropdown from "../subComponents/Dropdown";
import SnackBar from "../subComponents/SnackBar";

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

  let { id } = useParams();

  const [Open, setOpen] = useState(false);
  const [msg, setMsg] = useState({
    name: "Item Added Successfully",
    color: "success",
  });

  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState();
  const [itemOffer, setItemOffer] = useState("Non");

  const handleAdd = (item) => {
    let itemInfo = {
      name: item.name,
      quantity: itemQuantity,
      offer: itemOffer,
      price: itemPrice,
      category: item.category,
      family: item.family,
    };
    console.log(itemInfo);
    if (
      itemInfo.quantity > item.quantity ||
      itemInfo.quantity < 1 ||
      !itemInfo.quantity
    ) {
      setMsg({ name: "Invalid Quantity", color: "error" });
      setOpen(true);
      console.log(msg.name);
    } else {
      setMsg({ name: "Product Added", color: "success" });
      setOpen(true);
      console.log(msg.name);
    }
  };

  return (
    <div className={classes.container}>
      {items.length !== 0 ? (
        items.map((item, id) => (
          <Card className={classes.card} key={item.id}>
            <CardMedia
              className={classes.media}
              image={
                process.env.NODE_ENV == "production"
                  ? item.imageUrl
                  : process.env.REACT_APP_API_URL + item.imageUrl
              }
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
                <Dropdown
                  values={item.prices}
                  defaultVal={item.prices[0]}
                  onchange={setItemPrice}
                />
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
                    <label>Offre: </label>
                    <Dropdown values={["Non", "Oui"]} onchange={setItemOffer} />
                    <br />
                    <br />
                    <label htmlFor="">Quantite :</label>
                    <input
                      width={2}
                      type="number"
                      name="quantity"
                      min={0}
                      max={item.quantity}
                      style={{
                        width: "30px",
                        marginLeft: 8,
                        backgroundColor: "#415672",
                        color: "#FFFFFF",
                      }}
                      className={classes.inp}
                      onChange={(e) => setItemQuantity(e.target.value)}
                    />
                    <br />
                    <br />
                    <Button
                      variant="outlined"
                      style={{ border: "4px solid #2B4362" }}
                      onClick={() => handleAdd(item)}
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

      {Open && <SnackBar msg={msg.name} color={msg.color} />}
    </div>
  );
}
