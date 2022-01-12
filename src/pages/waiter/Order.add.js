import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { SocketContext } from "../../contexts/SocketContext";
import { TrContext } from "../../contexts/TranslationContext";
import { post } from "../../functions/http";

import Dropdown from "../../components/subComponents/Dropdown";

const apiUrl = process.env.REACT_APP_API_URL;

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
      marginTop: "160px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "160px",
    },
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
    consumptionPoint: user.workUnit.consumptionPoints[0],
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let order = { ...orderInfo };

    console.log(order);

    if (!order.tableName) return setError(t("server_err.Invalid table name"));

    if (!order.consumptionPoint) {
      return setError(t("server_err.Invalid consumption point"));
    }

    if (order.balanceForward < 0) {
      return setError(t("server_err.Invalid balance carried forward"));
    }

    //request order creation
    const res = await post({ url: "/orders", body: order });

    // handle order creation errors
    if (res?.error) return setError(res.error);

    // sending order created event
    sendEvent({
      name: "cE-order-created",
      props: {
        companyCode: user.company.code,
        id: res.insertedId,
      },
      rooms: [user.workUnit.code],
    });

    // navigation
    navigate(`/waiter/orders/add-item/${res.insertedId}`);
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
        {t("pages.waiter.orders.form_add_order.title")}
      </h2>
      {error && <div className="formError"> {t(`server_err.${error}`)}</div>}
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
        style={{ color: "black", marginBottom: "5px", marginTop: "0px" }}
        onChange={(e) =>
          setOrderInfo({
            ...orderInfo,
            [e.target.name]: e.target.value.trim(),
          })
        }
      />
      <TextField
        // fullWidth
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
        value={orderInfo.consumptionPoint}
        handleChange={(val) =>
          setOrderInfo({ ...orderInfo, consumptionPoint: val })
        }
        sx={{ margin: 0 }}
        textColor={"black"}
      />

      <Button
        variant="contained"
        type="submit"
        style={{ marginTop: "20px", marginBottom: "25px" }}
      >
        {t("pages.waiter.orders.form_add_order.add_btn")}
      </Button>
    </form>
  );
}
