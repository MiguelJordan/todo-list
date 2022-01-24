import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { Checkbox, TextField } from "@mui/material";

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
import { CameraAlt, PhotoCamera, DeleteRounded } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
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
  handleSubmit,
  target = "storeItems",
  image,
  AddImage,
  RemoveImage,
  loading,
  error,
}) {
  const { t } = useContext(TranslationContext);
  const { user } = useContext(AuthContext);
  const classes = useStyles();

  const stores = [user.workUnit.storeId ?? "", user.company.storeId ?? ""];

  const _item = {
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
  };

  const [item, setItem] = useState(_item);

  item.storeId = stores[0];

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
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const reset = () => setItem(_item);

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(item, reset);
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
              value={item.family}
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
              value={item.category}
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
            value={item.name}
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
              value={item.measureUnit}
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
              value={item.measureUnitPlural}
              className={classes.inputText}
              inputProps={{ className: classes.inputText }}
              label={t("compo.item.measureUnitPlural") + "*"}
              onChange={getInputValue}
            />
          </div>

          {t("compo.item.otherUnits")}
          <RepeatManager
            Component={AddOtherUnits}
            readOnlyValues={item.otherUnits}
            validate={validateOtherUnits}
            sx={{ width: "95%", margin: "5px auto" }}
            sxAddbtn={{ color: "black" }}
            sxRepeat={{
              border: "1px solid grey",
              borderRadius: 8,
              maxHeight: 80,
            }}
            handleAdd={(unit) => {
              setItem({
                ...item,
                otherUnits: [...item.otherUnits, unit],
              });
            }}
            handleDelete={(index) => {
              setItem({
                ...item,
                otherUnits: removeAt({ index, list: [...item.otherUnits] }),
              });
            }}
          />

          <div className={classes.rowField}>
            <TextField
              fullWidth
              required
              variant="standard"
              type="number"
              name="quantity"
              value={item.quantity}
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
              value={item.cost}
              className={classes.inputText}
              inputProps={{ className: classes.inputText }}
              label={t("compo.item.cost")}
              onChange={getInputValue}
            />
          </div>

          {t("compo.item.prices")}
          <RepeatManager
            Component={AddPrices}
            readOnlyValues={item.prices}
            validate={validatePrice}
            sx={{ width: "95%", margin: "5px auto" }}
            sxAddbtn={{ color: "black" }}
            sxRepeat={{
              border: "1px solid grey",
              borderRadius: 8,
              maxHeight: 80,
            }}
            handleAdd={(price) => {
              setItem({
                ...item,
                prices: [...item.prices, price],
              });
            }}
            handleDelete={(index) => {
              setItem({
                ...item,
                prices: removeAt({ index, list: [...item.prices] }),
              });
            }}
          />

          <div className={classes.rowField}>
            <TextField
              fullWidth
              required
              variant="standard"
              type="number"
              name="commission"
              value={item.commission}
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
              value={item.commissionRatio}
              className={classes.inputText}
              inputProps={{ className: classes.inputText }}
              label={t("compo.item.commissionRatio")}
              onChange={getInputValue}
            />
          </div>

          <div className={classes.rowField}>
            <span>
              <Checkbox
                checked={item.isBlocked}
                onChange={() =>
                  setItem({
                    ...item,
                    isBlocked: !item.isBlocked,
                  })
                }
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
              handleChange={(storeId) => setItem({ ...item, storeId })}
              sx={{ width: "50%" }}
              capitalised={false}
            />
          </div>
        </div>
      )}
      <LoadingButton
        loading={loading}
        variant="contained"
        type="submit"
        style={{ marginTop: 20 }}
      >
        {t("pages.admin.add-storeItem.add-btn")}
      </LoadingButton>
    </form>
  );
}
