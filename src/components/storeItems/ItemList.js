import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";

import SnackBar from "../subComponents/SnackBar";

import { TrContext } from "../../contexts/TranslationContext";

import { OrderContext } from "../../contexts/OrderContext";
import Item from "./item";

const useStyles = makeStyles((theme) => ({
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
}));

export default function ItemList({ items = [], preview = true, role = "" }) {
  const { t } = useContext(TrContext);
  const classes = useStyles();
  const { findOrder } = useContext(OrderContext);

  let { id } = useParams();

  const order = findOrder({ key: "id", value: id });

  const [Open, setOpen] = useState(false);
  const [msg, setMsg] = useState({
    name: "Item Added Successfully",
    color: "success",
  });

  const handleAdd = (item, e) => {
    e.preventDefault();

    setMsg({ name: "", color: "" });
    console.log(e);

    // regroup data
    let itemInfo = {
      offer: e.target[3].value,
      quantity: e.target[5].value,
      name: item.name,
      price: e.target[0].defaultValue,
      category: item.category,
      family: item.family,
      total: e.target[0].defaultValue * e.target[5].value,
      measureUnit: item.measureUnit,
    };
    console.log(itemInfo);
    setOpen(true);

    //validate data
    if (
      itemInfo.quantity > item.quantity ||
      itemInfo.quantity < 1 ||
      !itemInfo.quantity
    ) {
      setMsg({ name: "Invalid Quantity", color: "error" });
    } else {
      // if no error add product to the list of items
      if (order.items.length !== 0) {
        let result = false;
        for (const orderItem of order.items) {
          if (orderItem.name === itemInfo.name) {
            result = true;
            break;
          }
        }

        if (result) {
          setMsg({
            name: ` ${itemInfo.name} already exist`,
            color: "error",
          });
        } else {
          setMsg({
            name: `${itemInfo.quantity} ${itemInfo.name} successfully added`,
            color: "success",
          });
          order.items.push(itemInfo);
        }
      } else {
        setMsg({
          name: `${itemInfo.quantity} ${itemInfo.name} successfully added`,
          color: "success",
        });
        order.items.push(itemInfo);
      }
    }
  };

  return (
    <div className={classes.container}>
      <SnackBar msg={msg.name} color={msg.color} open={Open} close={setOpen} />
      {items.length !== 0 ? (
        items.map((item) => (
          <Item
            data={item}
            preview={preview}
            role={role}
            key={item.id}
            onSubmit={handleAdd}
          />
        ))
      ) : (
        <h2 style={{ marginTop: "100px" }}>
          {t("pages.waiter.items.not-found")}
        </h2>
      )}
    </div>
  );
}
