import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";

// components
import DisplayField from "../subComponents/DisplayField";
import Image from "../subComponents/Image";
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
    justifyContent: "space-between",
    margin: "5px 0",
    padding: "5px 0",
    border: "2px solid #173153",
    borderRadius: 8,
    width: 320,
  },
  img: {
    width: "95px",
    height: "95px",
    margin: "0 5px",
    objectFit: "cover",
    borderRadius: 8,
  },
  details: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
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

  const deleteOrderItem = async (item) => {
    toggleBackdrop(true);

    const res = await _delete({
      url: "/orderItems/",
      params: { companyCode: item.companyCode, id: item.id },
    });

    if (res.error) {
      toggleBackdrop(false);
      return showNotification({
        msg: t(`_errors.${res.error}`),
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
  };

  const WaiterPopMenu = [
    {
      action: deleteOrderItem,
      color: "#FF0000",
      Icon: <DeleteRounded />,
      name: "orderItem-delete",
      role: "waiter",
    },
    {
      action: (item) => console.log("updating", item),
      color: "#04A5E0",
      Icon: <EditRounded />,
      name: "orderItem-update",
      role: "waiter",
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

  return (
    <div className={classes.orderItem}>
      <Image
        className={classes.img}
        alt={item.name}
        src={getImage({ url: item.imageUrl })}
      />

      <div className={classes.details}>
        <div className={classes.detailsText}>
          <span>{t("compo.item.name")}:</span>
          <DisplayField
            value={capitalise(item.name)}
            sx={{ ...displayField, width: 125 }}
          />
        </div>

        <div className={classes.detailsText}>
          <span>{t("compo.item.price")}:</span>
          <DisplayField value={item.price} sx={displayField} />
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
            value={item.isOffer ? 0 : item.quantity * item.price}
            sx={displayField}
          />
        </div>
      </div>

      {["cashier", "waiter"].includes(role) ? (
        <PopOver
          items={WaiterPopMenu}
          Icon={<MoreVertIcon />}
          event={item}
          sx={{ paddingLeft: 0 }}
        />
      ) : (
        <PopOver items={AdminPopMenu} Icon={<MoreVertIcon />} event={item} />
      )}
    </div>
  );
};

export default OrderItem;
