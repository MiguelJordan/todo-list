import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { LoadingButton } from "@mui/lab";

// components
import Dropdown from "../subComponents/Dropdown";
import DisplayField from "../subComponents/DisplayField";
import OtherQuantities, {
  validateOtherQty,
} from "../subComponents/repeated/MeasureUnits/OtherQuantities";
import RepeatManager from "../subComponents/repeated/RepeatManager";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { NotificationContext } from "../../contexts/feedback/NotificationContext";
import { SocketContext } from "../../contexts/SocketContext";
import { TranslationContext } from "../../contexts/TranslationContext";

// functions
import {
  capitalise,
  getBool,
  getImage,
  getInputWith,
  groupData,
  removeAt,
} from "../../functions/data";
import { post } from "../../functions/http";
import queries from "../../functions/queries";

const theme = createTheme();

const useStyles = makeStyles(() => ({
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

const Item = ({ data = {}, orderId, preview = true }) => {
  const { user } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const { sendEvent } = useContext(SocketContext);
  const { t } = useContext(TranslationContext);
  const navigate = useNavigate();
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [_item] = useState({
    companyCode: data.companyCode,
    isOffer: "no",
    name: data.name,
    orderId,
    otherQuantities: [],
    quantity: 0,
    price: data.prices[0],
    storeId: data.storeId,
  });

  const [orderItem, setOrderItem] = useState(_item);

  const getQtyLeft = () => {
    const muList = groupData({
      data: data.otherUnits,
      criteria: "measureUnit",
    });

    let qtyLeft = data.quantity - orderItem.quantity;

    qtyLeft = orderItem.otherQuantities.reduce((prev, next) => {
      const mu = muList[next.measureUnit][0];

      const nextQty = mu.coefficient * next.quantity;
      return prev - nextQty;
    }, qtyLeft);

    return qtyLeft;
  };

  const [qtyLeft, setQtyLeft] = useState(getQtyLeft());

  const reset = () => setOrderItem(_item);

  useEffect(
    () => setQtyLeft(getQtyLeft()),
    [data.otherUnits, orderItem.quantity, orderItem.otherQuantities]
  );

  const AddOrderItem = async () => {
    orderItem.isOffer = getBool(orderItem.isOffer);

    const isOffer = orderItem.isOffer;
    const hasOtherQties = orderItem.otherQuantities.length > 0;

    if (getQtyLeft() < 0) {
      return showNotification({
        msg: t("_errors.Invalid quantity"),
        color: "error",
      });
    }

    const validQties = hasOtherQties
      ? !orderItem.quantity || orderItem.quantity >= 0
      : orderItem.quantity > 0;

    if (!isOffer && !validQties) {
      return showNotification({
        msg: t("_errors.Invalid quantity"),
        color: "error",
      });
    }

    setLoading(true);

    const res = await post({ url: "/orderItems", body: orderItem });

    if (res?.error) {
      setLoading(false);
      return showNotification({
        msg: t(`_errors.${res.error}`),
        color: "error",
      });
    }

    // reset form if all is good
    reset();

    // send store item updated event
    sendEvent({
      name: "cE-store-items-updated",
      props: {
        companyCode: user.company.code,
        query: queries["cE-store-items-updated"]({
          items: [orderItem.name],
          storeId: orderItem.storeId,
        }),
      },
      rooms: [user.workUnit.code],
    });

    // send order item created/updated event
    sendEvent({
      name: "cE-order-updated",
      props: { companyCode: user.company.code, id: orderId },
      rooms: [user.workUnit.code],
    });

    setLoading(false);

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
          <div className={classes.formControl}>
            <div>
              <Dropdown
                sx={{ display: getBool(orderItem.isOffer) ? "none" : "" }}
                label={t("compo.item.prices")}
                labelId={`store-item-prices-${data.id}`}
                value={orderItem.price}
                values={data.prices}
                handleChange={(price) => setOrderItem({ ...orderItem, price })}
              />
              {!preview && user.role === "waiter" && (
                <Dropdown
                  translated={true}
                  label={t("compo.item.isOffer")}
                  labelId={`store-item-isOffer-${data.id}`}
                  value={orderItem.isOffer}
                  values={["no", "yes"]}
                  handleChange={(isOffer) =>
                    setOrderItem({ ...orderItem, isOffer })
                  }
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
              {!preview && user.role === "waiter" && (
                <>
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <label htmlFor="">{t("compo.item.quantity")} :</label>
                    <input
                      width={2}
                      type="number"
                      name="quantity"
                      min={1}
                      max={qtyLeft}
                      value={orderItem.quantity === 0 ? "" : orderItem.quantity}
                      onChange={(e) => {
                        let quantity = e.target.value;

                        quantity = isNaN(quantity) ? "" : Number(quantity);

                        setOrderItem({ ...orderItem, quantity });
                      }}
                      style={{
                        width: "30px",
                        marginLeft: 8,
                        backgroundColor: "#415672",
                        color: "#FFFFFF",
                      }}
                      className={classes.inp}
                    />
                  </div>
                  {data.otherUnits.length > 0 && (
                    <RepeatManager
                      Component={OtherQuantities}
                      extraData={data.otherUnits}
                      readOnlyValues={orderItem.otherQuantities}
                      validate={validateOtherQty}
                      validateExtra={qtyLeft}
                      sxRepeat={{ maxHeight: 80 }}
                      handleAdd={(qty) => {
                        delete qty?.coefficient;
                        let otherQuantities = [
                          ...orderItem.otherQuantities,
                          qty,
                        ];
                        setOrderItem({ ...orderItem, otherQuantities });
                      }}
                      handleDelete={(index) => {
                        let otherQuantities = removeAt({
                          index,
                          list: orderItem.otherQuantities,
                        });
                        setOrderItem({ ...orderItem, otherQuantities });
                      }}
                    />
                  )}
                  <LoadingButton
                    loading={loading}
                    loadingIndicator={`${t("compo.item.btn-add")}...`}
                    type="submit"
                    variant="outlined"
                    style={{ border: "4px solid #2B4362", margin: "5px auto" }}
                    onClick={AddOrderItem}
                  >
                    {t("compo.item.btn-add")}
                  </LoadingButton>
                </>
              )}
            </div>
            {user.role === "admin" && (
              <Button
                variant="contained"
                style={{ marginTop: "10px" }}
                onClick={() => navigate(`/admin/items/edit/${data.id}`)}
              >
                {"Detail"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Item;
