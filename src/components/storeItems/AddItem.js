import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";

import Dropdown from "../subComponents/Dropdown";

import { TranslationContext } from "../../contexts/TranslationContext";
import { AuthContext } from "../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  inputText: {
    color: "black",
  },
  form: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    margin: "auto",
    maxWidth: "350px",

    padding: "20px",
    color: "#B3B3B3",
    borderRadius: "3px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "135px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "120px",
    },
  },
}));

export default function AddItem() {
  const { t } = useContext(TranslationContext);
  const { user } = useContext(AuthContext);

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [item, setItem] = React.useState({
    name: "",
    family: "",
    category: "",
    cost: "",
    prices: [],
    imageUrl: "",
    commissionAmount: "",
    companyCode: user.company.code,
    storeId: user.workUnit.storeId,
    quantity: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!item.name) {
      setLoading(false);
      return setError("Invalid Name");
    }
    if (!item.family) {
      setLoading(false);
      return setError("Invalid Family");
    }
    if (!item.category) {
      setLoading(false);
      return setError("Invalid Category");
    }
    if (!item.cost) {
      setLoading(false);
      return setError("Invalid Cost Price");
    }
    if (!item.commissionAmount) {
      setLoading(false);
      return setError("Invalid commission Amount");
    }
    if (!item.quantity || item.quantity < 0) {
      setLoading(false);
      return setError("Invalid Quantity");
    }

    setLoading(false);
    console.log(item);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h2
        style={{
          color: "#001D42",
          marginTop: "15px",
          alignSelf: "center",
        }}
      >
        {"Add Item"}
      </h2>
      {error && <div className="formError"> {error}</div>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "3px",
        }}
      >
        <TextField
          // fullWidth
          type="text"
          name="family"
          variant="standard"
          inputProps={{
            className: classes.inputText,
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Family"
        />
        <TextField
          // fullWidth
          type="text"
          name="category"
          variant="standard"
          inputProps={{
            className: classes.inputText,
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Category"
        />
        <TextField
          required
          type="text"
          variant="standard"
          name="name"
          inputProps={{
            className: classes.inputText,
          }}
          label="Name"
          style={{ color: "black", marginBottom: "5px", marginTop: "0px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
        />
        <TextField
          // fullWidth
          type="number"
          name="cost"
          variant="standard"
          inputProps={{
            className: classes.inputText,
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Cost"
        />

        <TextField
          // fullWidth
          type="number"
          name="commissionAmount"
          variant="standard"
          inputProps={{
            className: classes.inputText,
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Commission Amount"
        />
        <TextField
          // fullWidth
          type="number"
          name="quantity"
          variant="standard"
          inputProps={{
            className: classes.inputText,
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Quantity"
        />
        <TextField
          // fullWidth
          type="file"
          name="imageUrl"
          variant="standard"
          inputProps={{
            className: classes.inputText,
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setItem({
              ...item,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Image"
          required
        />
      </div>

      {/* <Dropdown
        values={item.prices}
        label="Consumption Point"
        variant="standard"
        value={orderInfo.consumptionPoint}
        handleChange={(val) => setItem({ ...item, consumptionPoint: val })}
        sx={{ margin: 0 }}
        textColor={"black"}
      /> */}

      <LoadingButton
        loading={loading}
        variant="contained"
        type="submit"
        style={{ marginTop: "20px", marginBottom: "25px" }}
      >
        {"Add"}
      </LoadingButton>
    </form>
  );
}
