import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { makeStyles } from "@material-ui/core";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

// components
import Dropdown from "../subComponents/Dropdown";
import OrderItem from "./OrderItem";
import AddPM, {
  validatePmAmount,
} from "../subComponents/repeated/PaymentMethods/AddPM";
import PopUp from "../subComponents/PopUp";
import RepeatManager from "../subComponents/repeated/RepeatManager";
import Search from "../subComponents/Search";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { TranslationContext } from "../../contexts/TranslationContext";

// functions
import { getBool, removeAt } from "../../functions/data";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilterAlt, AddCircle } from "@mui/icons-material";

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

export default function OrderDetails({ order }) {
  const { user } = useContext(AuthContext);
  const { t } = useContext(TranslationContext);
  const navigate = useNavigate();
  const classes = useStyles();

  const [valuesArray, setValuesArray] = useState([
    { name: "CASH", amount: 1000 },
    { name: "MOMO", amount: 2500 },
  ]);

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

  const [famCat] = useState(FamCat);
  const [families] = useState(Object.keys(famCat));
  const [family, setFamily] = useState(families[0]);
  const [categories, setCategories] = useState(famCat[family] ?? []);
  const [cat, setCat] = useState(categories[0] ?? "");
  const [offer, setOffer] = useState("no");
  const [searchVal, setSearchVal] = useState("");

  const _isOffer = getBool(offer);

  useEffect(() => {
    setCategories(famCat[family] ?? []);
  }, [famCat, family]);

  useEffect(() => {
    setCat(categories[0] ?? "");
  }, [categories]);

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
      <PopUp open={open} close={setOpen}>
        <Dropdown
          values={families}
          value={family}
          handleChange={setFamily}
          label={t("pages.waiter.items.dropdown.families")}
          read={checked}
        />
        <Dropdown
          values={categories}
          value={cat}
          handleChange={setCat}
          label={t("pages.waiter.items.dropdown.categories")}
          read={checked}
        />
        <Dropdown
          values={["no", "yes"]}
          value={offer}
          handleChange={setOffer}
          label={t("compo.item.isOffer")}
          read={checked}
        />
        <FormControlLabel
          value={"start"}
          label={t("compo.toolbar.all-items")}
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
                marginBottom: "5px",
                backgroundColor: "#001d42",
                width: "90%",
              }}
            >
              <IconButton onClick={() => setOpen(true)}>
                <FilterAlt style={{ color: "#9e9e9e" }} />
              </IconButton>

              <Search onChange={setSearchVal} />
              {user.role === "waiter" && (
                <Tooltip title={t("_var.*.tooltip.add item")}>
                  <IconButton
                    onClick={() =>
                      navigate(`/waiter/orders/${order.id}/add-items`)
                    }
                    style={{ margin: 0 }}
                  >
                    <AddCircle
                      style={{
                        color: "#2196f3",
                        fontSize: "30px",
                        width: "fit-content",
                        margin: 0,
                        padding: 0,
                      }}
                    />
                  </IconButton>
                </Tooltip>
              )}
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
                  <OrderItem item={item} role={user.role} key={item.id} />
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
            <RepeatManager
              Component={AddPM}
              extraData={user.workUnit.paymentMethods}
              validate={validatePmAmount}
              readOnlyValues={valuesArray}
              handleAdd={(vals) => setValuesArray([...valuesArray, vals])}
              handleDelete={(index) =>
                setValuesArray(removeAt({ index, list: valuesArray }))
              }
            />
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
          value={order.totalCost}
        />
      </div>
    </>
  );
}
