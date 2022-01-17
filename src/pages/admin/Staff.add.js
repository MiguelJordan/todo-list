import { useContext, useState } from "react";

import { Button, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Dropdown from "../../components/subComponents/Dropdown";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { TranslationContext } from "../../contexts/TranslationContext";

const useStyles = makeStyles((theme) => ({
  inputText: {
    color: "black",
  },
  form: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    margin: "130px auto",
    padding: "20px",
    color: "#B3B3B3",
    maxWidth: "350px",
    borderRadius: "3px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "130px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "140px",
    },
  },
}));

export default function AddStaff() {
  const { t } = useContext(TranslationContext);
  const { user } = useContext(AuthContext);

  const classes = useStyles();

  const [error, setError] = useState();

  const [personInfo, setPersonInfo] = useState({
    firstName: "",
    lastName: "",
    role: "cashier",
    companyCode: user.company.code,
    email: "",
    tel: "",
    unitCode: user.workUnit.code,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError();

    if (!personInfo.email) return setError(t("Invalid email"));
    if (!personInfo.firstName) return setError(t("Invalid first name"));
    if (!personInfo.lastName) return setError(t("Invalid last name"));
    if (!personInfo.role) return setError(t("Invalid role"));
    if (!personInfo.tel) return setError(t("Invalid email"));

    console.log(personInfo);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h2 style={{ color: "#001D42", margin: "10px auto" }}>Create User</h2>
      {error && <div className="formError">{error}</div>}

      <TextField
        required
        type="text"
        variant="standard"
        name="firstName"
        inputProps={{
          className: classes.inputText,
        }}
        fullWidth
        label="First Name"
        style={{ color: "#B3B3B3" }}
        onChange={(e) =>
          setPersonInfo({
            ...personInfo,
            [e.target.name]: e.target.value.trim(),
          })
        }
      />
      <TextField
        required
        type="text"
        variant="standard"
        name="lastName"
        inputProps={{
          className: classes.inputText,
        }}
        fullWidth
        label="Last Name"
        style={{ color: "#B3B3B3" }}
        onChange={(e) =>
          setPersonInfo({
            ...personInfo,
            [e.target.name]: e.target.value.trim(),
          })
        }
      />
      <TextField
        required
        fullWidth
        type="number"
        name="tel"
        inputProps={{
          className: classes.inputText,
        }}
        variant="standard"
        style={{ color: "#B3B3B3" }}
        onChange={(e) =>
          setPersonInfo({
            ...personInfo,
            [e.target.name]: e.target.value.trim(),
          })
        }
        label="Tel"
      />
      <Dropdown
        values={["cashier", "waiter"]}
        value={personInfo.role}
        handleChange={(val) => setPersonInfo({ ...personInfo, role: val })}
        variant="standard"
        sx={{ margin: 0 }}
        textColor={"black"}
      />

      <TextField
        required
        variant="standard"
        type="email"
        inputProps={{
          className: classes.inputText,
        }}
        fullWidth
        label="Email"
        name="email"
        onChange={(e) =>
          setPersonInfo({
            ...personInfo,
            [e.target.name]: e.target.value.trim(),
          })
        }
      />

      <Button variant="contained" type="submit" style={{ margin: "15px auto" }}>
        Ajouter
      </Button>
    </form>
  );
}
