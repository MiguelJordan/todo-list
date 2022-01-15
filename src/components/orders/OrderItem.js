import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

// components
import DisplayField from "../subComponents/DisplayField";
import PopOver from "../subComponents/PopOver";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { BackdropContext } from "../../contexts/feedback/BackdropContext";
import { NotificationContext } from "../../contexts/feedback/NotificationContext";
import { SocketContext } from "../../contexts/SocketContext";
import { TranslationContext } from "../../contexts/TranslationContext";

// functions
import { capitalise, getImage, getMeasureUnit } from "../../functions/data";
import { _delete } from "../../functions/http";
import queries from "../../functions/queries";

// icons

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeleteRounded, EditRounded } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  orderItem: {
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: "5px 0",
    padding: "5px 0",
    border: "2px solid #173153",
    borderRadius: 8,
    width: 320,
  },
  imgContainer: {
    width: "95px",
    height: "95px",
    // border: "4px solid #173153",
    borderRadius: 8,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  details: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    marginLeft: 8,
  },
  detailsText: {
    display: "flex",
    flexFlow: "row",
    marginBottom: 5,
    alignItems: "center",
    "& span": { color: "#B3B3B3", marginRight: 5 },
  },
}));

const OrderItem = ({ item = {}, role = "" }) => {
  const { user } = useContext(AuthContext);
  const { toggleBackdrop } = useContext(BackdropContext);
  const { showNotification } = useContext(NotificationContext);
  const { sendEvent } = useContext(SocketContext);
  const { t } = useContext(TranslationContext);
  const classes = useStyles();
  const displayField = {
    color: "white",
    margin: 0,
    padding: 0,
    textAlign: "left",
    width: 80,
    fontSize: 16,
  };

  const WaiterPopMenu = [
    {
      name: "Supprimer",
      Icon: <DeleteRounded />,
      color: "#FF0000",
      action: async (item) => {
        toggleBackdrop(true);
        const res = await _delete({
          url: "/orderItems/",
          params: {
            companyCode: item.companyCode,
            orderId: item.orderId,
            name: item.name,
          },
        });

        if (res.error) {
          toggleBackdrop(false);
          return showNotification({
            msg: t(`server_err.${res.error}`),
            color: "error",
          });
        }

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

        // send order updated event
        sendEvent({
          name: "cE-order-updated",
          props: { id: item.orderId, companyCode: item.companyCode },
          rooms: [user.workUnit.code],
        });

        toggleBackdrop(false);

        showNotification({
          msg: t("feedback.waiter.order item deleted success"),
          color: "success",
        });
      },
    },
    {
      name: "Modifier",
      color: "#04A5E0",
      Icon: <EditRounded />,
      action: (item) => console.log("modifying", item),
    },
  ];

  const AdminPopMenu = [
    {
      name: "Modifier",
      color: "#04A5E0",
      Icon: <EditRounded />,
      action: (e) => console.log(e),
    },
  ];

  //   const handleSubmit = async (item, e) => {
  //     e.preventDefault();

  //     const _isOffer = getBool(isOffer);

  //     // regroup data
  //     let _item = {
  //       companyCode: item.companyCode,
  //       isOffer: _isOffer,
  //       name: item.name,
  //       orderId,
  //       qty: parseFloat(e.target[5].value),
  //       selectedPrice: _isOffer ? 0 : selectedPrice,
  //       storeId: item.storeId,
  //     };
  //     // console.log(_item);

  //     if (
  //       !_isOffer &&
  //       (!_item.qty || _item.qty <= 0 || _item.qty > item.quantity)
  //     ) {
  //       return showNotification({
  //         msg: t("server_err.Invalid quantity"),
  //         color: "error",
  //       });
  //     }
  //     toggleBackdrop(true);

  //     const res = await post({ url: "/orderItems", body: _item });
  //     // console.log(res);

  //     toggleBackdrop(false);

  //     if (res?.error) {
  //       return showNotification({
  //         msg: t(`server_err.${res.error}`),
  //         color: "error",
  //       });
  //     }

  //     // reset form is all is good
  //     e.target.reset();

  //     // send store item updated event
  //     sendEvent({
  //       name: "cE-store-items-updated",
  //       props: {
  //         companyCode: user.company.code,
  //         query: queries["cE-store-items-updated"]({
  //           items: [item.name],
  //           storeId: item.storeId,
  //         }),
  //       },
  //       rooms: [user.workUnit.code],
  //     });

  //     // send order item created event
  //     sendEvent({
  //       name: "cE-order-item-created",
  //       props: {
  //         companyCode: user.company.code,
  //         id: orderId,
  //       },
  //       rooms: [user.workUnit.code],
  //     });

  //     showNotification({
  //       msg: t("feedback.waiter.order item created success"),
  //       color: "success",
  //     });
  //   };

  return (
    <div className={classes.orderItem}>
      <div className={classes.imgContainer}>
        <img className={classes.img} src={getImage({ url: item.imageUrl })} />
      </div>

      <div className={classes.details}>
        <div className={classes.detailsText}>
          <span>{t("compo.item.name")}:</span>
          <DisplayField value={capitalise(item.name)} sx={displayField} />
        </div>

        <div className={classes.detailsText}>
          <span>{t("compo.item.price")}:</span>
          <DisplayField value={item.selectedPrice} sx={displayField} />
        </div>

        <div className={classes.detailsText}>
          <span>{t("compo.item.quantity")}:</span>
          <DisplayField
            value={`${item.quantity} ${getMeasureUnit(item)}`}
            sx={displayField}
          />
        </div>

        <div className={classes.detailsText}>
          <span>Total:</span>
          <DisplayField
            value={item.isOffer ? 0 : item.quantity * item.selectedPrice}
            sx={displayField}
          />
        </div>
      </div>

      {["cashier", "waiter"].includes(role) ? (
        <PopOver items={WaiterPopMenu} Icon={<MoreVertIcon />} event={item} />
      ) : (
        <PopOver items={AdminPopMenu} Icon={<MoreVertIcon />} event={item} />
      )}
    </div>
  );
};

export default OrderItem;
