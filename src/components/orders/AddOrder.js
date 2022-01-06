import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button, TextField } from "@mui/material";

import { AuthContext } from "../../contexts/AuthContext";
import { SocketContext } from "../../contexts/SocketContext";
import { TrContext } from "../../contexts/TranslationContext";
import { post } from "../../functions/http";

import { useNavigate } from "react-router-dom";
import Dropdown from "../subComponents/Dropdown";

const apiUrl = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  inputText: {
    color: "black",
  },
}));

export default function CreateOrder() {
  const { user } = useContext(AuthContext);
  const { sendEvent } = useContext(SocketContext);
  const { t } = useContext(TrContext);

  const navigate = useNavigate();

  const classes = useStyles();

  const [orderInfo, setOrderInfo] = useState({
    tableName: "",

    balanceForward: "",
    companyCode: user.company.code,
    unitCode: user.workUnit.code,
    waiterId: user.id,
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let order = { ...orderInfo, consumptionPoint: e.target[2].value };

    console.log(order);

    if (!order.tableName) return setError(t("server_err.Invalid table name"));

    if (!order.consumptionPoint) {
      return setError(t("server_err.Invalid consumption point"));
    }

    if (order.balanceForward < 0) {
      return setError(t("server_err.Invalid balance forward"));
    }

    // request order creation
    const res = await post({ url: `${apiUrl}/orders`, body: order });

    // handle order creation errors
    if (res?.error) return setError(res.error);

    navigate(`/waiter/orders/add/${res.insertedId}`);

    console.log(res);

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
        maxWidth: "400px",
        backgroundColor: "#FFFFFF",
        minWidth: "330px",
        borderRadius: "3px",
        margin: "auto",
        position: "relative",
        top: "25%",
      }}
    >
      <h2
        style={{
          color: "#001D42",
          display: "flex",
          marginTop: "35px",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        Ajouter Une Commande
      </h2>
      {error !== "" && (
        <div
          style={{
            border: "2px solid red",
            color: "#001D42",
            margin: "5px",
            display: "flex",
            justifyContent: "center",
            marginTop: "-10px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}
      <form
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          margin: "20px",

          width: "70%",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          required
          type="text"
          variant="standard"
          name="tableName"
          fullWidth
          inputProps={{
            className: classes.inputText,
          }}
          label="Table Name"
          style={{ color: "black", marginBottom: "5px", marginTop: "-20px" }}
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
          inputProps={{
            className: classes.inputText,
          }}
          style={{ color: "black", marginBottom: "5px" }}
          onChange={(e) =>
            setOrderInfo({
              ...orderInfo,
              [e.target.name]: e.target.value.trim(),
            })
          }
          label="Balance Forward"
        />

        <Dropdown
          values={user.workUnit.consumptionPoints}
          label="Consumption Point"
          variant="standard"
        />

        <Button
          variant="contained"
          type="submit"
          style={{ marginTop: "10px", marginBottom: "25px" }}
        >
          Ajouter
        </Button>
      </form>
    </div>
  );
}
