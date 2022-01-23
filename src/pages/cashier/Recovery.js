import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//context
import { AuthContext } from "../../contexts/AuthContext";
import { TranslationContext } from "../../contexts/TranslationContext";

//components
import Dropdown from "../../components/subComponents/Dropdown";
import Fabs from "../../components/subComponents/Fabs";

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
      marginTop: "150px",
    },
  },
}));

export default function Recovery() {
  const { user } = useContext(AuthContext);
  const { t } = useContext(TranslationContext);
  const classes = useStyles();

  const [error] = useState("");

  const [addPayment, setAddPayement] = useState([]);

  const [payment, setPayment] = useState([]);
  const [recovery, setRecovery] = useState({
    id: "",
    paymentMethods: payment,
    isRecovery: true,
    customerName: "",
  });

  //used to add payment field
  const handleRemoveField = (i) => {
    const values = [...addPayment];
    values.splice(i, 1);
    setAddPayement(values);
  };
  const handleAddField = (e) => {
    const values = [...addPayment];
    console.log(payment);
    console.log(e);
    values.push({ value: null });
    setAddPayement(values);
  };

  //const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(e);
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
        {"Recovery"}
      </h2>
      {error && <div className="formError"> {error}</div>}
      <TextField
        // fullWidth
        label="ID*"
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexFlow: "column",
          maxHeight: "120px",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropdown
            values={user.workUnit.paymentMethods}
            label="Payment Method"
            variant="standard"
            value={user.workUnit.paymentMethods[0]}
            handleChange={(val) =>
              setPayment([{ ...payment, paymentMethod: val }])
            }
            sx={{ margin: 0, width: "40%" }}
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
            style={{ color: "black", marginBottom: "5px", width: "50%" }}
            onChange={(e) =>
              setPayment([{ ...payment, amount: e.target.value.trim() }])
            }
            required
          />
        </div>

        {addPayment.map((field, idx) => (
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            key={`${field}-${idx}`}
          >
            <Dropdown
              values={user.workUnit.paymentMethods}
              label="Payment Method"
              variant="standard"
              name="paymentMethod"
              value={user.workUnit.paymentMethods[0]}
              handleChange={(val) =>
                setPayment([{ ...payment, paymentMethod: val }])
              }
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
                setPayment([
                  {
                    ...payment,
                    [e.target.name]: e.target.value.trim(),
                  },
                ])
              }
              required
            />
            <Button
              style={{
                marginTop: "20px",
                width: "5px",
                color: "red",
                alignSelf: "flex-end",
              }}
              onClick={() => handleRemoveField(idx)}
            >
              <CloseIcon />
            </Button>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Fabs
          handleClick={(e) => handleAddField(e)}
          sx={{
            marginTop: "10px",
            marginBottom: "25px",
            backgroundColor: "#04A5E0",
            height: "45px",
            width: "50px",
          }}
          ToolTipText={"Add Payment Method"}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          style={{
            marginBottom: "15px",
            width: "150px",
          }}
        >
          {t("pages.waiter.orders.form_add_order.add_btn")}
        </Button>
      </div>
    </form>
  );
}
