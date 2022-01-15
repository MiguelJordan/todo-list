import { useContext } from "react";
import { makeStyles } from "@material-ui/core";

// components
import Item from "./item";

// contexts
import { TranslationContext } from "../../contexts/TranslationContext";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    alignitems: "center",
    overflowY: "auto",
    height: "75vh",
    flexWrap: "wrap",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      height: "78vh",
    },
  },
}));

export default function ItemList({
  orderId,
  items = [],
  preview = true,
  role = "",
}) {
  const { t } = useContext(TranslationContext);
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
