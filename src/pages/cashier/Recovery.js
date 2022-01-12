import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
//import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
//import { SocketContext } from "../../contexts/SocketContext";
import { TrContext } from "../../contexts/TranslationContext";

import Dropdown from "../../components/subComponents/Dropdown";

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
      marginTop: "200px",
    },
  },
}));

export default function Recovery() {
  const { user } = useContext(AuthContext);
  //const { sendEvent } = useContext(SocketContext);
  const { t } = useContext(TrContext);

  const [recovery, setRecovery] = useState({
    id: "",
    paymentMethod: user.workUnit.paymentMethods[0],
    amount: "",
  });
  const [error, setError] = useState("");

  //const navigate = useNavigate();

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!recovery.id) return setError("Invalid ID");

    if (recovery.amount < 0) {
      return setError("Invalid Amount");
    }

    console.log(recovery);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {" "}
      <h2
        style={{
          color: "#001D42",
          marginTop: "15px",
          alignSelf: "center",
        }}
      >
        {"Recovery"}
      </h2>
      {error && <div className="formError"> {error}</div>}
      <TextField
        // fullWidth
        label="ID"
        type="text"
        name="id"
        variant="standard"
        inputProps={{
          className: classes.inputText,
        }}
        style={{ color: "black", marginBottom: "5px" }}
        onChange={(e) =>
          setRecovery({
            ...recovery,
            [e.target.name]: e.target.value.trim(),
          })
        }
        required
      />
      <Dropdown
        values={user.workUnit.paymentMethods}
        label="Payment Method"
        variant="standard"
        value={recovery.paymentMethod}
        handleChange={(val) => setRecovery({ ...recovery, paymentMethod: val })}
        sx={{ margin: 0 }}
        textColor={"black"}
      />
      <TextField
        // fullWidth
        label="Amount"
        type="number"
        name="amount"
        variant="standard"
        inputProps={{
          className: classes.inputText,
        }}
        style={{ color: "black", marginBottom: "5px" }}
        onChange={(e) =>
          setRecovery({
            ...recovery,
            [e.target.name]: e.target.value.trim(),
          })
        }
        required
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
