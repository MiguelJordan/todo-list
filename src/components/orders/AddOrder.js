import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button, TextField } from "@mui/material";

import { AuthContext } from "../../contexts/AuthContext";
import { SocketContext } from "../../contexts/SocketContext";
import { TrContext } from "../../contexts/TranslationContext";
import { post } from "../../functions/http";

const apiUrl = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  inputText: {
    color: "#B3B3B3",
  },
}));

export default function AddOrder() {
  const { user } = useContext(AuthContext);
  const { sendEvent } = useContext(SocketContext);
  const { t } = useContext(TrContext);

  const classes = useStyles();

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
    setError("");

    if (!orderInfo.tableName)
      return setError(t("server_err.Invalid table name"));

    if (!orderInfo.consumptionPoint) {
      return setError(t("server_err.Invalid consumption point"));
    }

    if (orderInfo.balanceForward < 0) {
      return setError(t("server_err.Invalid balance forward"));
    }

    // request order creation
    const res = await post({ url: `${apiUrl}/orders`, body: orderInfo });

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
          inputProps={{
            className: classes.inputText,
          }}
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
          inputProps={{
            className: classes.inputText,
          }}
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
          inputProps={{ className: classes.inputText }}
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
