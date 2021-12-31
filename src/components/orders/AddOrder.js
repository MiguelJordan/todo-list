import React from "react";
import { makeStyles } from "@material-ui/core";
import { Button, Typography } from "@mui/material";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export default function AddOrder() {
  const classes = useStyles();

  const [orderInfo, setOrderInfo] = React.useState({
    tableName: "",
    consumptionPoint: "",
    balanceForward: "",
  });
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!orderInfo.tableName || !orderInfo.consumptionPoint)
      return setError("Invalid value(s)");
    setError("");
    console.log(orderInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "500px",
        backgroundColor: "#FFFFFF",
        minWidth: "330px",
        borderRadius: "3px",
      }}
    >
      <Typography style={{ color: "#001D42", marginTop: "15px" }}>
        Ajouter Une Commande
      </Typography>
      <form
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          margin: "15px",
          color: "#B3B3B3",
          width: "70%",
        }}
        onSubmit={handleSubmit}
      >
        {error !== "" && (
          <div
            style={{
              border: "2px solid red",
              color: "#001D42",
              margin: "5px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {error}
          </div>
        )}

        <TextField
          type="text"
          variant="standard"
          name="tableName"
          fullWidth
          color=""
          label="Table Name"
          style={{ color: "#B3B3B3" }}
          onChange={(e) =>
            setOrderInfo({
              ...orderInfo,
              [e.target.name]: e.target.value.trim(),
            })
          }
          required
        />
        <TextField
          fullWidth
          type="number"
          name="balanceForward"
          variant="standard"
          style={{ color: "#B3B3B3" }}
          onChange={(e) =>
            setOrderInfo({
              ...orderInfo,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Balance Forward"
        />
        <TextField
          variant="standard"
          fullWidth
          label="Consumption Point"
          name="consumptionPoint"
          onChange={(e) =>
            setOrderInfo({
              ...orderInfo,
              [e.target.name]: e.target.value.trim(),
            })
          }
          style={{ color: "#B3B3B3" }}
          required
        />

        <Button variant="contained" type="submit" style={{ marginTop: "15px" }}>
          Ajouter
        </Button>
      </form>
    </div>
  );
}
