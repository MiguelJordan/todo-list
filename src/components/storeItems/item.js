import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { NTContext } from "../../contexts/NTContext";
import { SocketContext } from "../../contexts/SocketContext";
import { TrContext } from "../../contexts/TranslationContext";

// components
import Dropdown from "../subComponents/Dropdown";

// functions
import { capitalise } from "../../functions/data";
import { post } from "../../functions/http";

const apiUrl = process.env.REACT_APP_API_URL;

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
  inp: {
    borderStyle: "solid",
    backgroundColor: "#415672",
    borderRadius: "4px",
    borderColor: "#415672",
    "&:focus": {
      borderColor: "#415672",
    },
  },
}));

const Item = ({ data = {}, orderId, preview = true, role = "" }) => {
  const { user } = useContext(AuthContext);
  const { showNotification } = useContext(NTContext);
  const { sendEvent } = useContext(SocketContext);
  const { t } = useContext(TrContext);
  const classes = useStyles();

  const [isOffer, setIsOffer] = useState("no");
  const [selectedPrice, setPrice] = useState(data.prices[0]);

  const getBool = (value) => {
    return ["true", "yes"].includes(value.toLowerCase()) ? true : false;
  };

  const handleSubmit = async (item, e) => {
    e.preventDefault();

    const _isOffer = getBool(isOffer);

    // regroup data
    let _item = {
      companyCode: item.companyCode,
      isOffer: _isOffer,
      name: item.name,
      orderId,
      qty: parseFloat(e.target[5].value),
      selectedPrice: _isOffer ? 0 : selectedPrice,
      storeId: item.storeId,
    };
    // console.log(_item);

    if (
      !_isOffer &&
      (!_item.qty || _item.qty <= 0 || _item.qty > item.quantity)
    ) {
      return showNotification({
        msg: t("server_err.Invalid quantity"),
        color: "error",
      });
    }

    const res = await post({ url: `${apiUrl}/orderItems`, body: _item });
    // console.log(res);

    if (res?.error) {
      return showNotification({
        msg: t(`server_err.${res.error}`),
        color: "error",
      });
    }

    // reset form is all is good
    e.target.reset();

    // sending store item updated event
    sendEvent({
      name: "cE-store-item-updated",
      props: {
        companyCode: user.company.code,
        name: item.name,
        storeId: user.workUnit.storeId,
      },
      rooms: [user.workUnit.code],
    });

    // sending order item created event
    sendEvent({
      name: "cE-order-item-created",
      props: {
        companyCode: user.company.code,
        id: orderId,
      },
      rooms: [user.workUnit.code],
    });

    showNotification({
      msg: t("feedback.waiter.order item created success"),
      color: "success",
    });
  };

  return (
    <>
      <Card className={classes.card} sx={{ boxShadow: 0 }}>
        <CardMedia
          className={classes.media}
          image={
            process.env.NODE_ENV === "production"
              ? data.imageUrl
              : process.env.REACT_APP_API_URL + data.imageUrl
          }
          title={data.name}
        />
        <CardContent className={classes.content}>
          <input
            readOnly
            value={capitalise(data.name)}
            style={{
              fontSize: "larger",
              backgroundColor: "transparent",
              width: "100%",
              color: "#B3B3B3",
              textAlign: "center",
              margin: "5px auto",
              padding: "10px 0",
              border: "none",
              outline: "none",
            }}
          />
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
                sx={{ display: getBool(isOffer) ? "none" : "" }}
                label={t("compo.item.price")}
                labelId={`store-item-price-${data.id}`}
                value={selectedPrice}
                values={data.prices}
                handleChange={setPrice}
              />
              {!preview && role === "waiter" && (
                <Dropdown
                  translated={true}
                  label={t("compo.item.isOffer")}
                  labelId={`store-item-isOffer-${data.id}`}
                  value={isOffer}
                  values={["no", "yes"]}
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
            {!preview && role === "waiter" && (
              <>
                <div style={{ margin: "10px auto" }}>
                  <label htmlFor="">{t("compo.item.quantity_toOrder")} :</label>
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
                  {t("compo.item.btn-add")}
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
