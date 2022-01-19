import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

// components
import OrderItem from "./OrderItem";

// contexts
// import { BackdropContext } from "../../contexts/feedback/BackdropContext";
import { TranslationContext } from "../../contexts/TranslationContext";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    margin: "10px",
  },
  accordionParent: { width: 350, margin: "0 auto" },
  accordion: {
    backgroundColor: "#173153",
    color: "white",
  },
  accordionDetails: {
    backgroundColor: "#001d42",
    height: "fit-content",
    maxHeight: 300,
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "space-between",
    overflowY: "auto",
    padding: 0,
  },
  text: {
    color: "#B3B3B3",
  },
  inputText: {
    color: "#FFFFFF",
  },
}));

export default function OrderDetails({ order, role = "" }) {
  // const { toggleBackdrop } = useContext(BackdropContext);
  const { t } = useContext(TranslationContext);
  const classes = useStyles();
  const navigate = useNavigate();
  let { id } = useParams();

  let total = order.items.reduce((prev, next) => {
    if (next.isOffer) return prev;
    return (prev += next.quantity * next.price);
  }, 0);

  return (
    <>
      <div style={{ display: "flex" }}>
        {role === "waiter" && (
          <div className={classes.buttonGroup}>
            <Button
              variant="contained"
              onClick={() => navigate(`/waiter/orders/${id}/add-items`)}
            >
              {"Ajouter Produits"}
            </Button>
          </div>
        )}
      </div>

      <div className={classes.accordionParent}>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="order-items"
            id={`order-${order.id}-items`}
          >
            <Typography>{t("pages.order-details.items")}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            {order.items.map((item) => (
              <OrderItem item={item} role={role} key={item.id} />
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="order-payment-methods"
            id="order-{orderId}-payment-methods"
          >
            <Typography>{t("pages.order-details.payment methods")}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            <Typography>Payment methods here</Typography>
          </AccordionDetails>
        </Accordion>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "auto",
          marginTop: "20px",
        }}
      >
        <TextField
          variant="standard"
          label="Total(FCFA)"
          inputProps={{
            className: classes.inputText,
            readOnly: true,
          }}
          value={total}
        />
      </div>
    </>
  );
}
