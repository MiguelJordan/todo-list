import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

// components
import Dropdown from "../subComponents/Dropdown";
import DisplayField from "../subComponents/DisplayField";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { BackdropContext } from "../../contexts/feedback/BackdropContext";
import { NotificationContext } from "../../contexts/feedback/NotificationContext";
import { SocketContext } from "../../contexts/SocketContext";
import { TranslationContext } from "../../contexts/TranslationContext";

// functions
import { capitalise, getImage } from "../../functions/data";
import { post } from "../../functions/http";
import queries from "../../functions/queries";

const useStyles = makeStyles((theme) => ({
  media: {
    width: 250,
    height: 200,
    // paddingTop: "70.25%", // 16:9
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
    width: 250,
    backgroundColor: "transparent",
    margin: "8px",
  },
  inp: {
    width: "30px",
    marginLeft: 8,
    backgroundColor: "#415672",
    color: "#FFFFFF",
    height: "18px",
    borderStyle: "solid",
    backgroundColor: "#415672",
    borderRadius: "4px",
    borderColor: "#415672",
    "&:focus": {
      outline: "none",
      width: "30px",
      height: "18px",
    },
  },
}));

const Item = ({ data = {}, orderId, preview = false, role = "" }) => {
  const { user } = useContext(AuthContext);
  const { toggleBackdrop } = useContext(BackdropContext);
  const { showNotification } = useContext(NotificationContext);
  const { sendEvent } = useContext(SocketContext);
  const { t } = useContext(TranslationContext);
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

    toggleBackdrop(true);

    const res = await post({ url: "/orderItems", body: _item });
    // console.log(res);

    if (res?.error) {
      toggleBackdrop(false);
      return showNotification({
        msg: t(`server_err.${res.error}`),
        color: "error",
      });
    }

    // reset form is all is good
    e.target.reset();

    // send store item updated event
    sendEvent({
      name: "cE-store-items-updated",
      props: {
        companyCode: user.company.code,
        query: queries["cE-store-items-updated"]({
          items: [item.name],
          storeId: item.storeId,
        }),
      },
      rooms: [user.workUnit.code],
    });

    // send order item created event
    sendEvent({
      name: "cE-order-item-created",
      props: {
        companyCode: user.company.code,
        id: orderId,
      },
      rooms: [user.workUnit.code],
    });

    toggleBackdrop(false);

    showNotification({
      msg: t("feedback.waiter.order item created success"),
      color: "success",
    });
  };

  const getInputWith = (quantity) => {
    let length = String(quantity ?? 0).length * 10;
    return length > 40 ? 40 : length > 1 ? length : 1;
  };

  return (
    <>
      <Card className={classes.card} sx={{ boxShadow: 0 }}>
        <CardMedia
          className={classes.media}
          image={getImage({ url: data.imageUrl })}
          title={data.name}
        />
        <CardContent className={classes.content}>
          <DisplayField value={capitalise(data.name)} sx={{ width: "100%" }} />
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
                label={t("compo.item.prices")}
                labelId={`store-item-prices-${data.id}`}
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

            <div
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexFlow: "row",
                  alignItems: "center",
                }}
              >
                <label>{t("compo.item.stock-quantity")}: </label>
                <input
                  readOnly
                  value={data.quantity}
                  // type="number"
                  style={{
                    backgroundColor: "#415672",
                    color: "#FFFFFF",
                    width: getInputWith(data.quantity),
                    border: "none",
                    outline: "none",
                    fontSize: 17,
                    textAlign: "center",
                    marginLeft: 4,
                    padding: 4,
                    borderRadius: "5px",
                  }}
                />
              </div>
              {!preview && role == "waiter" && (
                <>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <label htmlFor="">{t("compo.item.quantity")} :</label>
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
                    style={{ border: "4px solid #2B4362", margin: "5px auto" }}
                  >
                    {t("compo.item.btn-add")}
                  </Button>
                </>
              )}
            </div>
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
