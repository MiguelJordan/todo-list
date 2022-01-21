import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";
import ImageIcon from "@mui/icons-material/Image";
import {
  CameraAlt,
  PhotoCamera,
  DeleteRounded,
  EditRounded,
} from "@mui/icons-material";

//component
import Dropdown from "./Dropdown";

//context
import { TranslationContext } from "../../contexts/TranslationContext";
import { AuthContext } from "../../contexts/AuthContext";
import ImagePreview from "./ImagePreview";
import PopOver from "./PopOver";
import AlertDialogSlide from "./Dialog";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  inputText: {
    color: "black",
    width: "100px",
  },
  form: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    margin: "auto",
    maxWidth: "350px",

    padding: "20px",
    //color: "#B3B3B3",
    borderRadius: "3px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "55px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "90px",
    },
  },
  dialogText: {
    color: "#B3B3B3",
  },
}));
export default function AmForm({
  modify = false,
  items,
  handleSubmit,
  personnel,
  target = "storeItems",
  image,
  header,
  AddImage,
  RemoveImage,
  loading,
  error,
}) {
  const classes = useStyles();

  const [item, setItem] = useState(items ?? {});
  const [itemCpy, setItemCpy] = useState(item ?? {});
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
      setItem({ ...item, [DialogContent.name]: DialogContent.value });
      //console.log(item);
    },
  };
  const disAgree = {
    bgcolor: "red",
    color: "white",
    text: "Annuler",
    handler: () => {
      setItem({ ...item, [DialogContent.name]: itemCpy[DialogContent.name] });
      //console.log(item);
    },
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
      <form className={classes.form} onSubmit={(e) => handleSubmit(e, item)}>
        <h2
          style={{
            color: "#001D42",
            marginTop: "15px",
            alignSelf: "center",
          }}
        >
          {header}
        </h2>
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
        {error && <div className="formError"> {error}</div>}
        {target === "storeItems" && (
          <div
            style={{
              display: "flex",
              flexFlow: "column",
              justifyContent: "space-between",
              maxHeight: "160px",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                flexFlow: "row",
                marginTop: "4px",
              }}
            >
              <Dropdown
                label="Family*"
                values={["Drinks", "Meals"]}
                value={item.family}
                handleChange={(val) => setItem({ ...item, family: val })}
                textColor={"black"}
                variant="standard"
                sx={{ marginTop: "-3px", width: "100%" }}
                read={modify}
              />
              <FormControl fullWidth>
                <InputLabel>{"Category*"}</InputLabel>
                <Input
                  fullWidth
                  label="Category*"
                  type="text"
                  name="category"
                  value={item.category}
                  // variant="standard"
                  inputProps={{
                    className: classes.inputText,
                    readOnly: modify,
                  }}
                  endAdornment={
                    modify ? (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setContent({
                              name: "category",
                              label: "Category*",
                              value: item.category,
                              type: "text",
                            });
                            setOpen(true);
                          }}
                        >
                          <EditRounded />
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      ""
                    )
                  }
                  style={{ color: "black", marginBottom: "5px" }}
                  onChange={(e) =>
                    setItem({
                      ...item,
                      [e.target.name]: e.target.value.trim(),
                    })
                  }
                />
              </FormControl>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <FormControl fullWidth>
                <InputLabel>{"Name*"}</InputLabel>
                <Input
                  fullWidth
                  required
                  type="text"
                  variant="standard"
                  name="name"
                  value={item.name}
                  // variant="standard"
                  inputProps={{
                    className: classes.inputText,
                    readOnly: modify,
                  }}
                  endAdornment={
                    modify ? (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setContent({
                              name: "name",
                              label: "Name*",
                              value: item.name,
                              type: "text",
                            });
                            setOpen(true);
                          }}
                        >
                          <EditRounded />
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      ""
                    )
                  }
                  style={{ color: "black", marginBottom: "5px" }}
                  onChange={(e) =>
                    setItem({
                      ...item,
                      [e.target.name]: e.target.value.trim(),
                    })
                  }
                />
              </FormControl>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <FormControl fullWidth>
                <InputLabel>{"Measure Unit*"}</InputLabel>
                <Input
                  fullWidth
                  required
                  type="text"
                  name="measureUnit"
                  value={item.measureUnit}
                  // variant="standard"
                  inputProps={{
                    className: classes.inputText,
                    readOnly: modify,
                  }}
                  endAdornment={
                    modify ? (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setContent({
                              name: "measureUnit",
                              label: "Measure Unit*",
                              value: item.measureUnit,
                              type: "text",
                            });
                            setOpen(true);
                          }}
                        >
                          <EditRounded />
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      ""
                    )
                  }
                  style={{ color: "black", marginBottom: "5px" }}
                  onChange={(e) =>
                    setItem({
                      ...item,
                      [e.target.name]: e.target.value.trim(),
                    })
                  }
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>{"Measure Unit Plural*"}</InputLabel>
                <Input
                  fullWidth
                  required
                  type="text"
                  name="measureUnitPlural"
                  value={item.measureUnitPlural}
                  // variant="standard"
                  inputProps={{
                    className: classes.inputText,
                    readOnly: modify,
                  }}
                  endAdornment={
                    modify ? (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setContent({
                              name: "measureUnitPlural",
                              label: "Measure Unit Plural*",
                              value: item.measureUnitPlural,
                              type: "text",
                            });
                            setOpen(true);
                          }}
                        >
                          <EditRounded />
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      ""
                    )
                  }
                  style={{ color: "black", marginBottom: "5px" }}
                  onChange={(e) =>
                    setItem({
                      ...item,
                      [e.target.name]: e.target.value.trim(),
                    })
                  }
                />
              </FormControl>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <FormControl fullWidth>
                <InputLabel>{"Quantity"}</InputLabel>
                <Input
                  fullWidth
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  // variant="standard"
                  inputProps={{
                    className: classes.inputText,
                    readOnly: modify,
                  }}
                  endAdornment={
                    modify ? (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setContent({
                              name: "quantity",
                              label: "Quantity",
                              value: item.quantity,
                              type: "number",
                            });
                            setOpen(true);
                          }}
                        >
                          <EditRounded />
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      ""
                    )
                  }
                  style={{ color: "black", marginBottom: "5px" }}
                  onChange={(e) =>
                    setItem({
                      ...item,
                      [e.target.name]: e.target.value.trim(),
                    })
                  }
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>{"Cost"}</InputLabel>
                <Input
                  fullWidth
                  type="number"
                  name="cost"
                  value={item.cost}
                  // variant="standard"
                  inputProps={{
                    className: classes.inputText,
                    readOnly: modify,
                  }}
                  endAdornment={
                    modify ? (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setContent({
                              name: "cost",
                              label: "cost",
                              value: item.cost,
                              type: "number",
                            });
                            setOpen(true);
                          }}
                        >
                          <EditRounded />
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      ""
                    )
                  }
                  style={{ color: "black", marginBottom: "5px" }}
                  onChange={(e) =>
                    setItem({
                      ...item,
                      [e.target.name]: e.target.value.trim(),
                    })
                  }
                />
              </FormControl>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <FormControl fullWidth>
                <InputLabel>{"Commission Amount"}</InputLabel>
                <Input
                  fullWidth
                  type="number"
                  name="commissionAmount"
                  value={item.commissionAmount}
                  // variant="standard"
                  inputProps={{
                    className: classes.inputText,
                    readOnly: modify,
                  }}
                  endAdornment={
                    modify ? (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setContent({
                              name: "commissionAmount",
                              label: "Commission Amount",
                              value: item.commissionAmount,
                              type: "number",
                            });
                            setOpen(true);
                          }}
                        >
                          <EditRounded />
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      ""
                    )
                  }
                  style={{ color: "black", marginBottom: "5px" }}
                  onChange={(e) =>
                    setItem({
                      ...item,
                      [e.target.name]: e.target.value.trim(),
                    })
                  }
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>{"Commission Ratio"}</InputLabel>
                <Input
                  fullWidth
                  type="number"
                  name="commissionRatio"
                  value={item.commissionRatio}
                  // variant="standard"
                  inputProps={{
                    className: classes.inputText,
                    readOnly: modify,
                  }}
                  endAdornment={
                    modify ? (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setContent({
                              name: "commissionRatio",
                              label: "Commission Ratio",
                              value: item.commissionRatio,
                              type: "number",
                            });
                            setOpen(true);
                          }}
                        >
                          <EditRounded />
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      ""
                    )
                  }
                  style={{ color: "black", marginBottom: "5px" }}
                  onChange={(e) =>
                    setItem({
                      ...item,
                      [e.target.name]: e.target.value.trim(),
                    })
                  }
                />
              </FormControl>
            </div>

            <div style={{ display: "flex" }}>
              <label
                htmlFor="isBlocked"
                style={{ color: "black", marginTop: "15px" }}
              >
                Blocked
              </label>
              <Checkbox
                checked={item.isBlocked}
                onChange={() =>
                  setItem({ ...item, isBlocked: !item.isBlocked })
                }
                id="isBlocked"
              />
            </div>
          </div>
        )}
        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          style={{ marginTop: "20px", marginBottom: "25px" }}
        >
          {"Add"}
        </LoadingButton>
      </form>
    </>
  );
}
