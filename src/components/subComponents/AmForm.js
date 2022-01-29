import React, { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../contexts/AuthContext";
import { NotificationContext } from "../../contexts/feedback/NotificationContext";
import { TranslationContext } from "../../contexts/TranslationContext";
import { SocketContext } from "../../contexts/SocketContext";

// functions
import { getImage, removeAt, toBase64 } from "../../functions/data";
import { sendFormData } from "../../functions/http";
import queries from "../../functions/queries";

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
    borderRadius: "8px",
    "&::before": {
      opacity: 0,
    },
  },
  accordionDetails: {
    height: "fit-content",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 0,
  },
  accordionSummary: {
    backgroundColor: "lightgrey",
    borderRadius: "8px",
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
    marginTop: "40px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "35px",
      width: 300,
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

export default function AmForm({ storeItem, modify = false }) {
  const { t } = useContext(TranslationContext);
  const { user } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const { sendEvent } = useContext(SocketContext);

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

  const [item, setItem] = useState(_item);
  const [updateItem, setUpdate] = useState(storeItem);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const getInputValue = (e) => {
    return modify
      ? setUpdate({ ...updateItem, [e.target.name]: e.target.value })
      : setItem({ ...item, [e.target.name]: e.target.value });
  };

  const reset = () => {
    setError("");

    if (!modify) {
      setImage(null);
      return setItem(_item);
    }

    setImage(getImage({ url: storeItem.imageUrl }));
    setUpdate(storeItem);
  };

  const AddImage = async (e) => {
    if (!e) return "";
    setError("");
    let file = e.target.files[0];

    const typeInfo = file.type.split("/"); // [mimeType ,extension]

    // validate type & extension
    if (
      typeInfo[0] !== "image" ||
      !["jpg", "png", "jpeg"].includes(typeInfo[1])
    ) {
      return setError("Invalid image - format");
    }

    // validate file size
    if (file.size > 5 * 1024 * 1024) {
      return setError("Invalid image - size too large");
    }

    let base64 = await toBase64(file);

    setImage(base64);
    setImageUrl(file);
  };

  const RemoveImage = () => {
    setImage(null);
    setImageUrl(null);
  };

  const validateItem = (item) => {
    item.name = item.name?.trim();
    if (!item.name) return { valid: false, message: "Invalid item name" };

    item.family = item.family?.trim();
    if (!item.family) return { valid: false, message: "Invalid family" };

    item.category = item.category?.trim();
    if (!item.category) return { valid: false, message: "Invalid category" };

    item.measureUnit = item.measureUnit?.trim();
    if (!item.measureUnit) {
      return { valid: false, message: "Invalid measure unit" };
    }

    item.measureUnitPlural = item.measureUnitPlural?.trim();
    if (!item.measureUnitPlural) {
      return { valid: false, message: "Invalid measure unit" };
    }

    if (isNaN(item.quantity) || item.quantity < 0) {
      return { valid: false, message: "Invalid quantity" };
    }
    item.quantity = Number(item.quantity);

    if (isNaN(item.cost) || item.cost < 0) {
      return { valid: false, message: "Invalid cost price" };
    }
    item.cost = Number(item.cost);

    if (isNaN(item.commission) || item.commission < 0) {
      return { valid: false, message: "Invalid commission" };
    }
    item.commission = Number(item.commission);

    if (isNaN(item.commissionRatio) || item.commissionRatio < 1) {
      return { valid: false, message: "Invalid commission ratio" };
    }
    item.commissionRatio = Number(item.commissionRatio);

    if (imageUrl) {
      item.imageUrl = imageUrl;
    } else {
      if (modify) {
        item.imageUrl = "";
        delete item.image;
      } else {
        delete item?.imageUrl;
      }
    }

    return { valid: true, validated: item };
  };

  const handleSubmit = async ({ item, method = "POST" }) => {
    setError("");

    const { valid, validated, message } = validateItem(item, imageUrl);

    if (!valid) return setError(message);

    item = validated;

    setLoading(true);

    const res = await sendFormData({
      url: "/storeItems",
      values: item,
      method,
    });

    if (res.error) {
      setLoading(false);
      return setError(res.error);
    }

    // reset create form if all is good
    reset();

    // send store item created/updated event
    sendEvent({
      name: "cE-store-items-updated",
      props: {
        companyCode: user.company.code,
        query: queries["cE-store-items-updated"]({
          items: [item.name],
          storeId: item.storeId,
        }),
      },
      rooms: [user.workUnit.code],
    });

    const feedbackMsg = modify
      ? "feedback.admin.store item updated success"
      : "feedback.admin.store item created success";

    showNotification({ msg: t(feedbackMsg), color: "success" });

    setLoading(false);
  };

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

  useEffect(() => {
    const _imageUrl = storeItem?.imageUrl;
    const _image = _imageUrl ? getImage({ url: _imageUrl }) : null;

    setImage(_image);
    setUpdate(storeItem);
  }, [storeItem]);

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        const data = modify ? updateItem : item;
        const method = modify ? "PATCH" : "POST";

        handleSubmit({ item: data, method });
      }}
    >
      <ImagePreview
        button={
          <PopOver items={popMenu} Icon={<CameraAlt />} tooltipText="Upload" />
        }
        imageSrc={image}
      />

      {error && <div className="formError"> {t(`_errors.${error}`)}</div>}

      <div
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "flex-start",
          height: "270px",
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
            className={classes.accordionSummary}
          >
            <Typography>{t("compo.item.otherUnits")}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            <RepeatManager
              Component={AddOtherUnits}
              readOnlyValues={modify ? updateItem.otherUnits : item.otherUnits}
              validate={validateOtherUnits}
              sx={{ width: "95%", margin: "5px auto" }}
              sxAddBtn={{ color: "black" }}
              sxAddField={{ flexFlow: "column", width: "90%" }}
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
            className={classes.accordionSummary}
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
            disabled={loading ? true : false}
            variant="contained"
            style={{ backgroundColor: "#FF0000" }}
            onClick={reset}
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
