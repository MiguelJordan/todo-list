import React, { useEffect, useState, useContext, useRef } from "react";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import { useParams } from "react-router-dom";

import Dropdown from "../subComponents/Dropdown";

import { NTContext } from "../../contexts/NTContext";
import { TrContext } from "../../contexts/TranslationContext";

import { capitalise } from "../../functions/data";
// import { OrderContext } from "../../contexts/OrderContext";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
    // paddingTop: "70.25%", // 16:9
    minWidth: "60px",
    borderRadius: "13px 13px 0 0",
  },
  content: {
    fill: "transparent",
    backgroundColor: "transparent",
    border: "3px solid #2B4362",
    borderTop: 0,
    "&.MuiCardContent-root ": {
      padding: "0 16px",
    },
  },
  formControl: {
    padding: theme.spacing(1),
    // paddingBottom: 0,
    minWidth: 100,
    backgroundColor: "transparent",
    fill: "transparent",
    color: "#B3B3B3",
    textAlign: "center",
  },
  card: {
    backgroundColor: "transparent",
    margin: "8px",
    minWidth: "250px",
    maxWidth: "280px",
    flexBasis: "33.33333%",
  },
}));

const Item = ({ data = {}, orderId, preview = true, role = "" }) => {
  const { t } = useContext(TrContext);
  const { showNotification } = useContext(NTContext);
  const classes = useStyles();

  const [isOffer, setIsOffer] = useState("false");
  const [selectedPrice, setPrice] = useState(data.prices[0]);

  const onPriceChange = (value) => setPrice(value);

  const getBool = (value) => (value.toLowerCase() == "true" ? true : false);

  const handleSubmit = (item, e) => {
    e.preventDefault();

    showNotification({
      msg: `Adding ${capitalise(item.name)} as ${
        getBool(isOffer) ? "Offer" : "non offer"
      }`,
      color: "success",
    });
    // console.log(item, e);

    // regroup data
    // let orderItem = {
    //   isOffer:getBool(isOffer),
    //   quantity: e.target[5].value,
    //   name: item.name,
    //   price: e.target[0].defaultValue,
    //   category: item.category,
    //   family: item.family,
    //   total: e.target[0].defaultValue * e.target[5].value,
    //   measureUnit: item.measureUnit,
    // };
    // console.log(orderItem);
  };

  // useEffect(() => console.log("orderId", orderId, data), []);

  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={
            process.env.NODE_ENV == "production"
              ? data.imageUrl
              : process.env.REACT_APP_API_URL + data.imageUrl
          }
          title={data.name}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h6"
            style={{ color: "#B3B3B3", textAlign: "center", padding: "5px" }}
          >
            {capitalise(data.name)}
          </Typography>
          <hr
            style={{
              color: "#B3B3B3",
              backgroundColor: "#B3B3B3",
              height: 0.1,
              margin: 0,
            }}
          />
          <form
            className={classes.formControl}
            onSubmit={(e) => handleSubmit(data, e)}
          >
            <div>
              <Dropdown
                label={t("compo.item.price")}
                labelId={`store-item-price-${data.id}`}
                value={selectedPrice}
                values={data.prices}
                handleChange={onPriceChange}
              />

              {!preview && role == "waiter" && (
                <Dropdown
                  translated={true}
                  label={t("compo.item.isOffer")}
                  labelId={`store-item-isOffer-${data.id}`}
                  value={isOffer}
                  values={["false", "true"]}
                  handleChange={(val) => setIsOffer(val)}
                />
              )}
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="">{t("compo.item.quantity")}: </label>
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
                {data.quantity}
              </output>
            </div>
            {!preview && role == "waiter" && (
              <>
                <div style={{ margin: "10px auto" }}>
                  <label htmlFor="">Quantite :</label>
                  <input
                    width={2}
                    type="number"
                    name="quantity"
                    min={1}
                    max={data.quantity}
                    style={{
                      width: "30px",
                      marginLeft: 8,
                      backgroundColor: "#415672",
                      color: "#FFFFFF",
                    }}
                    className={classes.inp}
                  />
                </div>
                <Button
                  type="submit"
                  variant="outlined"
                  style={{ border: "4px solid #2B4362" }}
                >
                  {t("compo.item.add-btn")}
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
    </>
  );
};

export default Item;
