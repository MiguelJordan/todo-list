import React from "react";
import { makeStyles } from "@material-ui/core";
import { Button } from "@mui/material";
import { TextField } from "@material-ui/core";

import { AuthContext } from "../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({}));

export default function AddOrder() {
  const { user } = React.useContext(AuthContext);

  const classes = useStyles();

  const [orderInfo, setOrderInfo] = React.useState({
    tableName: "",
    consumptionPoint: "",
    balanceForward: "",
    companyCode: user.company.code,
    unitCode: user.workUnit.code,
    cashierId: user.id,
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
      <h2 style={{ color: "#001D42", marginTop: "15px" }}>
        Ajouter Une Commande
      </h2>
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
          fullWidth
          type="text"
          name="consumptionPoint"
          variant="standard"
          style={{ color: "#B3B3B3" }}
          onChange={(e) =>
            setOrderInfo({
              ...orderInfo,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label=" consumptionPoint"
        />
        <Button variant="contained" type="submit" style={{ marginTop: "15px" }}>
          Ajouter
        </Button>
      </form>
    </div>
  );
}
