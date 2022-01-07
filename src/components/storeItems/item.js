import React, { useEffect, useState, useContext, useRef } from "react";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import { useParams } from "react-router-dom";

import Dropdown from "../subComponents/Dropdown";
// import SnackBar from "../subComponents/SnackBar";

import { TrContext } from "../../contexts/TranslationContext";

import { capitalise } from "../../functions/data";
// import { OrderContext } from "../../contexts/OrderContext";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
    // paddingTop: "70.25%", // 16:9
    minWidth: "60px",
    borderRadius: "13px 13px 0 0",
    // borderRadius: "13px",
    // marginBottom: "-10px",
    // position: "relative",
    // zIndex: 1,
  },
  content: {
    fill: "transparent",
    backgroundColor: "transparent",
    border: "3px solid #2B4362",
    // padding: 0,
    borderTop: 0,
    // zIndex: -1,
  },
  formControl: {
    margin: theme.spacing(1),
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

const Item = ({ data = {}, preview = true, role = "", onSubmit }) => {
  const { t } = useContext(TrContext);
  const [isOffer, setIsOffer] = useState(false);
  const [selectedPrice, setPrice] = useState(data.prices[0]);
  const classes = useStyles();

  const onPriceChange = (value) => setPrice(value);

  return (
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
          style={{ color: "#B3B3B3", textAlign: "center" }}
        >
          {capitalise(data.name)}
        </Typography>
        <hr
          style={{
            color: "#B3B3B3",
            backgroundColor: "#B3B3B3",
            height: 0.5,
          }}
        />
        <form
          className={classes.formControl}
          onSubmit={(e) => onSubmit(data, e)}
        >
          <Dropdown
            label={t("compo.item.price")}
            labelId={`store-item-${data.id}`}
            value={selectedPrice}
            values={data.prices}
            handleChange={onPriceChange}
          />

          <br />
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
          {!preview && role !== "admin" && (
            <>
              <br />
              <br />

              <Dropdown
                label={"Offre"}
                labelId={`store-item-${data.id}`}
                value={isOffer}
                values={[false, true]}
                handleChange={(val) => setIsOffer(val)}
              />

              <br />
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
              <br />
              <br />
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
  );
};

export default Item;
