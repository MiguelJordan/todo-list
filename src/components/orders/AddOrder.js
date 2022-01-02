import { useContext, useState } from "react";
// import { makeStyles } from "@material-ui/core";
import { Button } from "@mui/material";
import { TextField } from "@material-ui/core";

import { AuthContext } from "../../contexts/AuthContext";
import { SocketContext } from "../../contexts/SocketContext";
import { post } from "../../functions/http";

const apiUrl = process.env.REACT_APP_API_URL;

// const useStyles = makeStyles((theme) => ({}));

export default function AddOrder() {
  const { user } = useContext(AuthContext);
  const { sendEvent } = useContext(SocketContext);

  // const classes = useStyles();

  const [orderInfo, setOrderInfo] = useState({
    tableName: "",
    consumptionPoint: "",
    balanceForward: "",
    companyCode: user.company.code,
    unitCode: user.workUnit.code,
    waiterId: user.id,
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderInfo.tableName) return setError("Invalid table name");

    if (!orderInfo.consumptionPoint) {
      return setError("Invalid consumption point");
    }

    setError("");

    // request order creation
    const res = await post(apiUrl + "/orders", orderInfo);

    // handle order creation errors
    if (res?.error) return setError(res.error);

    // sending order created event
    sendEvent({
      name: "cE-order-created",
      props: {
        date: true,
        companyCode: user.company.code,
        source: "waiter",
        startTime: new Date(),
        unitCode: user.workUnit.code,
        waiterId: user.id,
      },
      rooms: [user.workUnit.code],
    });
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
          required
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
          required
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
