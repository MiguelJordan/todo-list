import { useContext } from "react";
import { makeStyles } from "@material-ui/core";

import { TrContext } from "../../contexts/TranslationContext";

import Item from "./item";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    alignitems: "center",
    overflowY: "auto",
    height: "78vh",
    flexWrap: "wrap",
    width: "100%",
    border: "1px solid yellow",
    // [theme.breakpoints.up("sm")]: {
    //   height: "78vh",
    // },
  },
}));

export default function ItemList({
  orderId,
  items = [],
  preview = true,
  role = "",
}) {
  const { t } = useContext(TrContext);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {items.length !== 0 ? (
        items.map((item) => (
          <Item
            orderId={orderId}
            data={item}
            preview={preview}
            role={role}
            key={item.id}
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
