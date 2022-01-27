import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { makeStyles } from "@mui/styles";
import {
  Button,
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
import dayjs from "dayjs";

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
import { FilterAlt, AddCircle, Delete, Print } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    margin: "10px",
  },
  accordionParent: {
    width: 350,
    margin: "10px  auto",
    //paddingTop: "60px",
  },
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

export default function OrderDetails({ order, role }) {
  const { user } = useContext(AuthContext);
  const { t } = useContext(TranslationContext);
  const navigate = useNavigate();
  const classes = useStyles();

  const [valuesArray, setValuesArray] = useState([]);

  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState("");
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

  useEffect(() => {
    order.paymentMethods = valuesArray;
    console.log(order.paymentMethods);
  }, [valuesArray]);

  return (
    <>
      <PopUp open={open} close={setOpen}>
        {component === "filter" && (
          <div>
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
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              }
            />
          </div>
        )}
        {component === "info" && (
          <div
            style={{
              display: "flex",
              flexFlow: "column",
              alignItems: "center",
              justifyContent: "space-around",

              gap: "5px",
            }}
          >
            <TextField
              variant="standard"
              label="ID"
              inputProps={{
                className: classes.inputText,
                readOnly: true,
              }}
              value={order.id}
            />
            <TextField
              variant="standard"
              label={t("compo.order.customerName")}
              inputProps={{
                className: classes.inputText,
                readOnly: true,
              }}
              value={order.customerName ?? ""}
            />
            <TextField
              variant="standard"
              label={t("compo.order.tableName")}
              inputProps={{
                className: classes.inputText,
                readOnly: true,
              }}
              value={order.tableName}
            />
            <TextField
              variant="standard"
              label={t("compo.order.createdAt")}
              inputProps={{
                className: classes.inputText,
                readOnly: true,
              }}
              value={dayjs(new Date(order.createdAt)).format(
                "DD-MM-YY , hh : mm"
              )}
            />
            {role === "waiter" ? (
              <TextField
                variant="standard"
                label={t("compo.order.cashierId")}
                inputProps={{
                  className: classes.inputText,
                  readOnly: true,
                }}
                value={order.cashierId ?? ""}
              />
            ) : role === "cashier" ? (
              <TextField
                variant="standard"
                label={t("compo.order.waiterId")}
                inputProps={{
                  className: classes.inputText,
                  readOnly: true,
                }}
                value={order.waiterId ?? ""}
              />
            ) : (
              <>
                <TextField
                  variant="standard"
                  label={t("compo.order.cashierId")}
                  inputProps={{
                    className: classes.inputText,
                    readOnly: true,
                  }}
                  value={order.cashierId ?? ""}
                />{" "}
                <TextField
                  variant="standard"
                  label={t("compo.order.waiterId")}
                  inputProps={{
                    className: classes.inputText,
                    readOnly: true,
                  }}
                  value={order.waiterId ?? ""}
                />
              </>
            )}

            <TextField
              variant="standard"
              label={t("compo.order.consumptionPoint")}
              inputProps={{
                className: classes.inputText,
                readOnly: true,
              }}
              value={order.consumptionPoint}
            />
            <span>
              <label>{t("compo.order.paid")}</label>
              <Checkbox checked={order.isPaid} />
            </span>
          </div>
        )}
      </PopUp>

      <div
        style={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "6px",
          marginTop: "15px",
        }}
      >
        <IconButton
          onClick={() => {
            setComponent("info");
            setOpen(true);
          }}
        >
          <InfoIcon
            style={{
              color: "#2196f3",

              width: "fit-content",
              margin: 0,
              padding: 0,
            }}
          />
        </IconButton>
        {role === "waiter" && (
          <>
            <IconButton variant="contained">
              <Print style={{ color: "#65C466" }} />
            </IconButton>
            {!order.isPaid && (
              <IconButton variant="contained">
                <Delete style={{ color: "#FF0000" }} />
              </IconButton>
            )}
          </>
        )}
        {role === "cashier" && (
          <Button variant="contained"> {t("compo.order.approve")}</Button>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                marginBottom: "5px",
                backgroundColor: "#001d42",
                width: "95%",
              }}
            >
              <IconButton
                onClick={() => {
                  setComponent("filter");
                  setOpen(true);
                }}
              >
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
                        fontSize: "33px",

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
          justifyContent: "space-around",
          marginBottom: "auto",
          marginTop: "20px",
        }}
      >
        <TextField
          variant="standard"
          label="Total Cost(FCFA)"
          inputProps={{
            className: classes.inputText,
            readOnly: true,
          }}
          value={order.totalCost}
          style={{ width: "90px" }}
        />
        <TextField
          variant="standard"
          label="Total Paid(FCFA)"
          inputProps={{
            className: classes.inputText,
            readOnly: true,
          }}
          value={order.totalPaid}
          style={{ width: "90px" }}
        />
      </div>
    </>
  );
}
