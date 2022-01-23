import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";

// components
import ImagePreview from "./ImagePreview";
import PopOver from "./PopOver";
import AlertDialogSlide from "./Dialog";

// contexts
import { TranslationContext } from "../../contexts/TranslationContext";
import { AuthContext } from "../../contexts/AuthContext";
import Dropdown from "./Dropdown";

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
  modify = false,
  item = {},
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

  const [updatedItem, setItem] = useState(item);

  const [open, setOpen] = useState(false);

  const [DialogContent, setContent] = useState({
    name: "",
    label: "",
    value: "",
    type: "",
  });

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

  const agree = {
    bgcolor: "#04A5E0",
    color: "white",
    text: "Valider",
    handler: () => {
      setItem({ ...updatedItem, [DialogContent.name]: DialogContent.value });
      //console.log(item);
    },
  };

  const disAgree = {
    bgcolor: "red",
    color: "white",
    text: "Annuler",
    handler: () => {
      setItem({
        ...updatedItem,
        [DialogContent.name]: item[DialogContent.name],
      });
      //console.log(item);
    },
  };

  const getInputValue = (e) => {
    setItem({
      ...updatedItem,
      [e.target.name]:
        e.target.name === "prices" ? [e.target.value] : e.target.value,
    });
  };

  return (
    <>
      <AlertDialogSlide
        _open={open}
        content={
          <FormControl sx={{ m: 1 }}>
            <InputLabel>{DialogContent.label}</InputLabel>
            <Input
              fullWidth
              type={DialogContent.type}
              name={DialogContent.name}
              variant="standard"
              value={DialogContent.value}
              inputProps={{
                className: classes.dialogText,
              }}
              style={{ color: "black", marginBottom: "5px" }}
              onChange={(e) => {
                setContent({
                  ...DialogContent,
                  value: e.target.value.trim(),
                });
              }}
            />
          </FormControl>
        }
        agree={agree}
        disagree={disAgree}
      />

      <form
        className={classes.form}
        onSubmit={(e) => handleSubmit(e, updatedItem)}
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
                value={updatedItem.family}
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
                value={updatedItem.category}
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
              value={updatedItem.name}
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
                value={updatedItem.measureUnit}
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
                value={updatedItem.measureUnitPlural}
                className={classes.inputText}
                inputProps={{ className: classes.inputText }}
                label={t("compo.item.measureUnitPlural") + "*"}
                onChange={getInputValue}
              />
            </div>

            <div className={classes.rowField}>
              <TextField
                fullWidth
                required
                variant="standard"
                type="number"
                name="quantity"
                value={updatedItem.quantity}
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
                value={updatedItem.cost}
                className={classes.inputText}
                inputProps={{ className: classes.inputText }}
                label={t("compo.item.cost")}
                onChange={getInputValue}
              />
            </div>

            <TextField
              fullWidth
              required
              variant="standard"
              type="number"
              name="prices"
              value={updatedItem.prices}
              className={classes.inputText}
              inputProps={{ className: classes.inputText }}
              label={t("compo.item.price")}
              onChange={getInputValue}
            />

            <div className={classes.rowField}>
              <TextField
                fullWidth
                required
                variant="standard"
                type="number"
                name="commission"
                value={updatedItem.commission}
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
                value={updatedItem.commissionRatio}
                className={classes.inputText}
                inputProps={{ className: classes.inputText }}
                label={t("compo.item.commissionRatio")}
                onChange={getInputValue}
              />
            </div>

            <div className={classes.rowField}>
              <span>
                <Checkbox
                  checked={updatedItem.isBlocked}
                  onChange={() =>
                    setItem({
                      ...updatedItem,
                      isBlocked: !updatedItem.isBlocked,
                    })
                  }
                  id="isBlocked"
                />
                <label
                  htmlFor="isBlocked"
                  style={{ color: "black", marginTop: "15px" }}
                >
                  {t("compo.item.isBlocked")}
                </label>
              </span>
              <Dropdown
                label={t("compo.item.store")}
                values={stores}
                value={stores[0]}
                textColor={"black"}
                handleChange={(val) =>
                  setItem({ ...updatedItem, storeId: val })
                }
                sx={{ width: "50%" }}
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
    </>
  );
}
