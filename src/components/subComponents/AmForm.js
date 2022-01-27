import React, { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  TextField,
  Typography,
  createTheme,
  Button,
} from "@mui/material";

// components
import AddOtherUnits, {
  validateOtherUnits,
} from "./repeated/MeasureUnits/AddOtherUnit";
import AddPrices, { validatePrice } from "./repeated/AddPrices";
import Dropdown from "./Dropdown";
import ImagePreview from "./ImagePreview";
import PopOver from "./PopOver";
import RepeatManager from "./repeated/RepeatManager";

// contexts
import { TranslationContext } from "../../contexts/TranslationContext";
import { AuthContext } from "../../contexts/AuthContext";

// functions
import { removeAt } from "../../functions/data";

// icons
import {
  CameraAlt,
  PhotoCamera,
  DeleteRounded,
  ExpandMore,
} from "@mui/icons-material";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  accordion: {
    backgroundColor: "transparent",
    color: "black",
    marginBottom: "5px",
    borderRadius: "6px",
  },
  accordionDetails: {
    height: "fit-content",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 0,
  },
  form: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    margin: "auto",
    maxWidth: "350px",
    padding: "20px",
    borderRadius: "3px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "55px",
      width: 300,
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "90px",
    },
  },
  rowField: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },
  inputText: {
    color: "black",
    margin: 0,
    marginBottom: 5,
  },
  dialogText: {
    color: "#B3B3B3",
  },
}));

export default function AmForm({
  storeItem,
  modify = false,
  handleSubmit,
  target = "storeItems",
  image,
  setImage,
  AddImage,
  RemoveImage,
  loading,
  error,
  setError,
}) {
  const { t } = useContext(TranslationContext);
  const { user } = useContext(AuthContext);
  const classes = useStyles();

  const [stores] = useState([
    user.workUnit.storeId ?? "",
    user.company.storeId ?? "",
  ]);

  const [_item] = useState({
    name: "",
    family: "",
    category: "",
    cost: 0,
    prices: [],
    commission: 0,
    commissionRatio: 1,
    companyCode: user.company.code,
    storeId: stores[0],
    measureUnit: "",
    measureUnitPlural: "",
    otherUnits: [],
    quantity: 0,
    isBlocked: false,
  });

  const modifyItem = storeItem;

  const [item, setItem] = useState(_item);
  const [updateItem, setUpdate] = useState(modifyItem ?? "");

  const popMenu = [
    {
      name: "Select Image",
      color: "#04A5E0",
      Icon: <PhotoCamera />,
      action: (image) => AddImage(image),
      type: "image",
    },
    {
      name: "Remove",
      color: "#FF0000",
      Icon: <DeleteRounded />,
      action: (image) => RemoveImage(image),
    },
  ];

  const getInputValue = (e) => {
    return modify
      ? setUpdate({ ...updateItem, [e.target.name]: e.target.value })
      : setItem({ ...item, [e.target.name]: e.target.value });
  };

  const reset = () => setItem(_item);

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (!modify) return handleSubmit(item, reset);
        return handleSubmit(updateItem);
      }}
    >
      {target === "storeItems" && (
        <ImagePreview
          button={
            <PopOver
              items={popMenu}
              Icon={<CameraAlt />}
              tooltipText="Upload"
            />
          }
          imageSrc={image}
        />
      )}
      {error && <div className="formError"> {t(`_errors.${error}`)}</div>}
      {target === "storeItems" && (
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "flex-start",
            height: "235px",
            overflowY: "auto",
            paddingTop: 5,
          }}
        >
          <div className={classes.rowField}>
            <TextField
              fullWidth
              required
              variant="standard"
              type="text"
              name="family"
              value={modify ? updateItem.family : item.family}
              className={classes.inputText}
              inputProps={{ className: classes.inputText }}
              label={t("compo.item.family") + "*"}
              onChange={getInputValue}
            />

            <TextField
              fullWidth
              required
              variant="standard"
              type="text"
              name="category"
              value={modify ? updateItem.category : item.category}
              className={classes.inputText}
              inputProps={{ className: classes.inputText }}
              label={t("compo.item.category") + "*"}
              onChange={getInputValue}
            />
          </div>

          <TextField
            fullWidth
            required
            variant="standard"
            type="text"
            name="name"
            value={modify ? updateItem.name : item.name}
            className={classes.inputText}
            inputProps={{ className: classes.inputText }}
            label={t("compo.item.name") + "*"}
            onChange={getInputValue}
          />

          <div className={classes.rowField}>
            <TextField
              fullWidth
              required
              variant="standard"
              type="text"
              name="measureUnit"
              value={modify ? updateItem.measureUnit : item.measureUnit}
              className={classes.inputText}
              inputProps={{ className: classes.inputText }}
              label={t("compo.item.measureUnit") + "*"}
              onChange={getInputValue}
            />

            <TextField
              fullWidth
              required
              variant="standard"
              type="text"
              name="measureUnitPlural"
              value={
                modify ? updateItem.measureUnitPlural : item.measureUnitPlural
              }
              className={classes.inputText}
              inputProps={{ className: classes.inputText }}
              label={t("compo.item.measureUnitPlural") + "*"}
              onChange={getInputValue}
            />
          </div>

          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMore style={{ color: "black" }} />}
              style={{ backgroundColor: "lightgrey" }}
            >
              <Typography>{t("compo.item.otherUnits")}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <RepeatManager
                Component={AddOtherUnits}
                readOnlyValues={
                  modify ? updateItem.otherUnits : item.otherUnits
                }
                validate={validateOtherUnits}
                sx={{ width: "95%", margin: "5px auto" }}
                sxAddBtn={{ color: "black" }}
                sxAddField={{ flexFlow: "column" }}
                sxRepeat={{
                  border: "1px solid grey",
                  borderRadius: 8,
                  maxHeight: 80,
                }}
                handleAdd={(unit) => {
                  if (!modify)
                    return setItem({
                      ...item,
                      otherUnits: [...item.otherUnits, unit],
                    });
                  setUpdate({
                    ...updateItem,
                    otherUnits: [...updateItem.otherUnits, unit],
                  });
                }}
                handleDelete={(index) => {
                  if (!modify)
                    return setItem({
                      ...item,
                      otherUnits: removeAt({
                        index,
                        list: [...item.otherUnits],
                      }),
                    });
                  setUpdate({
                    ...updateItem,
                    otherUnits: removeAt({
                      index,
                      list: [...updateItem.otherUnits],
                    }),
                  });
                }}
              />
            </AccordionDetails>
          </Accordion>

          <div className={classes.rowField}>
            <TextField
              fullWidth
              required
              variant="standard"
              type="number"
              name="quantity"
              value={modify ? updateItem.quantity : item.quantity}
              className={classes.inputText}
              inputProps={{ className: classes.inputText }}
              label={t("compo.item.quantity")}
              onChange={getInputValue}
            />

            <TextField
              fullWidth
              required
              variant="standard"
              type="number"
              name="cost"
              value={modify ? updateItem.cost : item.cost}
              className={classes.inputText}
              inputProps={{ className: classes.inputText }}
              label={t("compo.item.cost")}
              onChange={getInputValue}
            />
          </div>

          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMore style={{ color: "black" }} />}
              style={{ backgroundColor: "lightgrey" }}
            >
              <Typography> {t("compo.item.prices")}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <RepeatManager
                Component={AddPrices}
                readOnlyValues={modify ? updateItem.prices : item.prices}
                validate={validatePrice}
                sx={{ width: "95%", margin: "5px 0" }}
                sxAddBtn={{ color: "black" }}
                sxRepeat={{
                  border: "1px solid grey",
                  borderRadius: 8,
                  maxHeight: 80,
                }}
                handleAdd={(price) => {
                  if (!modify)
                    return setItem({
                      ...item,
                      prices: [...item.prices, price],
                    });
                  setUpdate({
                    ...updateItem,
                    prices: [...updateItem.prices, price],
                  });
                }}
                handleDelete={(index) => {
                  if (!modify)
                    return setItem({
                      ...item,
                      prices: removeAt({ index, list: [...item.prices] }),
                    });
                  setUpdate({
                    ...updateItem,
                    prices: removeAt({ index, list: [...updateItem.prices] }),
                  });
                }}
              />
            </AccordionDetails>
          </Accordion>

          <div className={classes.rowField}>
            <TextField
              fullWidth
              required
              variant="standard"
              type="number"
              name="commission"
              value={modify ? updateItem.commission : item.commission}
              className={classes.inputText}
              inputProps={{ className: classes.inputText }}
              label={t("compo.item.commission")}
              onChange={getInputValue}
            />

            <TextField
              fullWidth
              required
              variant="standard"
              type="number"
              name="commissionRatio"
              value={modify ? updateItem.commissionRatio : item.commissionRatio}
              className={classes.inputText}
              inputProps={{ className: classes.inputText }}
              label={t("compo.item.commissionRatio")}
              onChange={getInputValue}
            />
          </div>

          <div className={classes.rowField}>
            <span>
              <Checkbox
                checked={modify ? updateItem.isBlocked : item.isBlocked}
                onChange={() => {
                  if (modify)
                    return setUpdate({
                      ...updateItem,
                      isBlocked: !updateItem.isBlocked,
                    });

                  setItem({
                    ...item,
                    isBlocked: !item.isBlocked,
                  });
                }}
                id="isBlocked"
              />
              <label htmlFor="isBlocked" style={{ color: "black" }}>
                {t("compo.item.isBlocked")}
              </label>
            </span>
            <Dropdown
              label={t("compo.item.store")}
              values={stores}
              value={item.storeId}
              textColor={"black"}
              handleChange={(storeId) => {
                if (!modify) return setItem({ ...item, storeId });
                return setUpdate({ ...updateItem, storeId });
              }}
              sx={{ width: "50%" }}
              capitalised={false}
            />
          </div>
        </div>
      )}

      {modify ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: 20,
          }}
        >
          <LoadingButton loading={loading} variant="contained" type="submit">
            {t("pages.admin.modify-storeItem.modify-btn")}
          </LoadingButton>
          <Button
            variant="contained"
            style={{ backgroundColor: "#FF0000" }}
            onClick={() => {
              setError("");
              setImage(modifyItem.imageUrl);
              setUpdate(modifyItem);
            }}
          >
            {t("pages.admin.modify-storeItem.cancel-btn")}
          </Button>
        </div>
      ) : (
        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          style={{ marginTop: 20 }}
        >
          {t("pages.admin.add-storeItem.add-btn")}
        </LoadingButton>
      )}
    </form>
  );
}
