import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// components
import Dropdown from "../../components/subComponents/Dropdown";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { SocketContext } from "../../contexts/SocketContext";
import { TranslationContext } from "../../contexts/TranslationContext";

// functions
import { post } from "../../functions/http";

const useStyles = makeStyles((theme) => ({
  inputText: { color: "black", marginBottom: "5px", marginTop: "0px" },
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
      marginTop: 45,
      width: 250,
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "100px",
    },
  },
}));

export default function CreateOrder() {
  const { user } = useContext(AuthContext);
  const { sendEvent } = useContext(SocketContext);
  const { t } = useContext(TranslationContext);

  const navigate = useNavigate();

  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const [orderInfo, setOrderInfo] = useState({
    tableName: "",
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

    // console.log(order);
    order.tableName = order.tableName?.trim();
    if (!order.tableName) return setError("Invalid table name");

    if (!order.consumptionPoint) return setError("Invalid consumption point");

    setLoading(true);

    // request order creation
    const res = await post({ url: "/orders", body: order });

    // handle order creation errors
    if (res?.error) {
      setLoading(false);
      return setError(res.error);
    }

    // sending order created event
    sendEvent({
      name: "cE-order-created",
      props: {
        companyCode: user.company.code,
        id: res.insertedId,
      },
      rooms: [user.workUnit.code],
    });

    setLoading(false);

    // navigation
    navigate(`/waiter/orders/${res.insertedId}/add-items`);
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
      {error && <div className="formError"> {t(`_errors.${error}`)}</div>}

      <TextField
        required
        type="text"
        variant="standard"
        name="tableName"
        fullWidth
        className={classes.inputText}
        inputProps={{ className: classes.inputText }}
        label="Table Name"
        onChange={(e) =>
          setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value })
        }
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

      <LoadingButton
        loading={loading}
        loadingPosition="start"
        variant="contained"
        type="submit"
        style={{ marginTop: 30 }}
      >
        {t("pages.waiter.orders.form_add_order.add_btn")}
      </LoadingButton>
    </form>
  );
}
