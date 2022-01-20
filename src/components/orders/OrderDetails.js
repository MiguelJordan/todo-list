import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

// components
import OrderItem from "./OrderItem";
import Fabs from "../../components/subComponents/Fabs";
import Search from "../subComponents/Search";

// contexts
// import { BackdropContext } from "../../contexts/feedback/BackdropContext";
import { TranslationContext } from "../../contexts/TranslationContext";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilterAlt } from "@mui/icons-material";
import PopUp from "../subComponents/PopUp";
import Dropdown from "../subComponents/Dropdown";

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    margin: "10px",
  },
  accordionParent: { width: 350, margin: "0 auto", paddingTop: "50px" },
  accordion: {
    backgroundColor: "#173153",
    color: "white",
  },
  accordionDetails: {
    backgroundColor: "#001d42",
    height: "fit-content",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "space-between",
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

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);

  let FamCat = order.items.reduce((acc, next) => {
    const family = next.family;
    const cat = next.category;

    if (!acc[family]) {
      acc[family] = [cat];
    } else if (acc[family] && !acc[family].includes(cat)) {
      acc[family].push(cat);
    }

    return acc;
  }, {});

  const [famCat, setFamCat] = useState(FamCat);
  const [families, setFamilies] = useState(Object.keys(famCat));
  const [family, setFamily] = useState(families[0]);
  const [categories, setCategories] = useState(famCat[family] ?? []);
  const [cat, setCat] = useState(categories[0] ?? "");
  const [offer, setOffer] = useState("no");
  const [searchVal, setSearchVal] = useState("");

  const getBool = (value) => {
    return ["true", "yes"].includes(value.toLowerCase()) ? true : false;
  };

  const _isOffer = getBool(offer);

  useEffect(() => {
    setCategories(famCat[family] ?? []);
  }, [family]);

  useEffect(() => {
    setCat(categories[0] ?? "");
  }, [categories]);

  let total = order.items.reduce((prev, next) => {
    if (next.isOffer) return prev;
    return (prev += next.quantity * next.price);
  }, 0);

  const filterItems = order.items.filter((item) => {
    if (
      checked &&
      (!searchVal ||
        item.name.toLowerCase().includes(searchVal.toLowerCase().trim()))
    ) {
      return true;
    } else if (
      item.family === family &&
      item.category === cat &&
      item.isOffer === _isOffer &&
      (!searchVal ||
        item.name.toLowerCase().includes(searchVal.toLowerCase().trim()))
    )
      return true;
    return false;
  });

  return (
    <>
      {/* <Dialog
        content={msgDialog}
        openDialog={openDialog}
        closeDialog={CloseDialog}
        PositiveRes={handleDelete}
      /> */}

      <PopUp open={open} close={setOpen}>
        <Dropdown
          values={families}
          value={family}
          handleChange={setFamily}
          label="Families"
          read={checked}
        />
        <Dropdown
          values={categories}
          value={cat}
          handleChange={setCat}
          label="Categories"
          read={checked}
        />
        <Dropdown
          values={["no", "yes"]}
          value={offer}
          handleChange={setOffer}
          label="Offer"
          read={checked}
        />
        <FormControlLabel
          value={"start"}
          label="All Items"
          labelPlacement="start"
          control={
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
          }
        />
      </PopUp>

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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                marginBottom: "10px",
                backgroundColor: "#001d42",
                width: "90%",
              }}
            >
              <IconButton onClick={() => setOpen(true)}>
                <FilterAlt style={{ color: "#9e9e9e" }} />
              </IconButton>
              {role === "waiter" && (
                <Fabs
                  sx={{ width: "40px", height: "40px" }}
                  ToolTipText="Ajouter Produits"
                  path={`/waiter/orders/${id}/add-items`}
                />
              )}

              <Search onChange={setSearchVal} />
            </div>

            <div
              style={{
                maxHeight: 300,
                height: "fit-content",
                overflowY: "auto",
                padding: 0,
              }}
            >
              {filterItems.lenght !== 0 ? (
                filterItems.map((item) => (
                  <OrderItem item={item} role={role} key={item.id} />
                ))
              ) : (
                <h2 style={{ marginTop: "100px", color: "white" }}>
                  {t("pages.waiter.items.not-found")}
                </h2>
              )}
            </div>
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
