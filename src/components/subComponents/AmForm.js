import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

// components
import Dropdown from "./Dropdown";
import ImagePreview from "./ImagePreview";
import PopOver from "./PopOver";

import AlertDialogSlide from "./Dialog";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";

// icons
import {
  CameraAlt,
  PhotoCamera,
  DeleteRounded,
  EditRounded,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  inputText: {
    color: "black",
    width: "100px",
    marginLeft: "9px",
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
  item = {},
  handleSubmit,
  target = "storeItems",
  image,
  AddImage,
  RemoveImage,
  loading,
  error,
}) {
  const classes = useStyles();

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
        {error && <div className="formError"> {error}</div>}
        {target === "storeItems" && (
          <div
            style={{
              display: "flex",
              flexFlow: "column",
              justifyContent: "space-between",
              maxHeight: "190px",
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
                value={updatedItem.family}
                handleChange={(val) => setItem({ ...updatedItem, family: val })}
                textColor={"black"}
                variant="standard"
                sx={{ marginTop: "-3px", width: "100%" }}
                read={modify}
              />
              <FormControl fullWidth>
                <InputLabel style={{ marginTop: "2px", marginLeft: "-10px" }}>
                  {"Category*"}
                </InputLabel>
                <Input
                  fullWidth
                  label="Category*"
                  type="text"
                  name="category"
                  value={updatedItem.category}
                  // variant="standard"
                  inputProps={{
                    className: classes.inputText,
                    readOnly: modify,
                  }}
                  endAdornment={
                    modify ? (
                      <InputAdornment position="end">
                        <IconButton
                          style={{ margin: 0 }}
                          onClick={() => {
                            setContent({
                              name: "category",
                              label: "Category*",
                              value: updatedItem.category,
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
                      ...updatedItem,
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
                <InputLabel style={{ marginTop: "2px", marginLeft: "-10px" }}>
                  {"Name*"}
                </InputLabel>
                <Input
                  fullWidth
                  required
                  type="text"
                  variant="standard"
                  name="name"
                  value={updatedItem.name}
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
                              value: updatedItem.name,
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
                      ...updatedItem,
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
                <InputLabel style={{ marginTop: "2px", marginLeft: "-10px" }}>
                  {"Measure Unit*"}
                </InputLabel>
                <Input
                  fullWidth
                  required
                  type="text"
                  name="measureUnit"
                  value={updatedItem.measureUnit}
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
                              value: updatedItem.measureUnit,
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
                      ...updatedItem,
                      [e.target.name]: e.target.value.trim(),
                    })
                  }
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel style={{ marginTop: "2px", marginLeft: "-10px" }}>
                  {"Measure Unit Plural*"}
                </InputLabel>
                <Input
                  fullWidth
                  required
                  type="text"
                  name="measureUnitPlural"
                  value={updatedItem.measureUnitPlural}
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
                              value: updatedItem.measureUnitPlural,
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
                      ...updatedItem,
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
                <InputLabel style={{ marginTop: "2px", marginLeft: "-10px" }}>
                  {"Quantity"}
                </InputLabel>
                <Input
                  fullWidth
                  type="number"
                  name="quantity"
                  value={updatedItem.quantity}
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
                              value: updatedItem.quantity,
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
                      ...updatedItem,
                      [e.target.name]: e.target.value.trim(),
                    })
                  }
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel style={{ marginTop: "2px", marginLeft: "-10px" }}>
                  {"Cost"}
                </InputLabel>
                <Input
                  fullWidth
                  type="number"
                  name="cost"
                  value={updatedItem.cost}
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
                              value: updatedItem.cost,
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
                      ...updatedItem,
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
                <InputLabel style={{ marginTop: "2px", marginLeft: "-10px" }}>
                  {"Commission Amount"}
                </InputLabel>
                <Input
                  fullWidth
                  type="number"
                  name="commissionAmount"
                  value={updatedItem.commissionAmount}
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
                              value: updatedItem.commissionAmount,
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
                      ...updatedItem,
                      [e.target.name]: e.target.value.trim(),
                    })
                  }
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel style={{ marginTop: "2px", marginLeft: "-10px" }}>
                  {"Commission Ratio"}
                </InputLabel>
                <Input
                  fullWidth
                  type="number"
                  name="commissionRatio"
                  value={updatedItem.commissionRatio}
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
                              value: updatedItem.commissionRatio,
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
                      ...updatedItem,
                      [e.target.name]: e.target.value.trim(),
                    })
                  }
                />
              </FormControl>
            </div>

            <div style={{ display: "flex" }}>
              <Checkbox
                checked={updatedItem.isBlocked}
                onChange={() =>
                  setItem({ ...updatedItem, isBlocked: !updatedItem.isBlocked })
                }
                id="isBlocked"
              />
              <label
                htmlFor="isBlocked"
                style={{ color: "black", marginTop: "15px" }}
              >
                Blocked
              </label>
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
