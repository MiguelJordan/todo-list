import { useContext, useState } from "react";

import { TextField, createTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
//import { makeStyles } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import Dropdown from "../../components/subComponents/Dropdown";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { TranslationContext } from "../../contexts/TranslationContext";

const theme = createTheme();

const useStyles = makeStyles(() => ({
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
      marginTop: "60px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "100px",
    },
  },
}));

export default function AddStaff() {
  const { t } = useContext(TranslationContext);
  const { user } = useContext(AuthContext);

  const classes = useStyles();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [personInfo, setPersonInfo] = useState({
    firstName: "",
    lastName: "",
    role: "cashier",
    companyCode: user.company.code,
    email: "",
    tel: "",
    workUnit: user.workUnits[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError();

    if (!personInfo.email) return setError(t("_errors.Invalid email"));

    if (!personInfo.firstName) return setError(t("_errors.Invalid first name"));

    if (!personInfo.lastName) return setError(t("_errors.Invalid last name"));

    if (!personInfo.role) return setError(t("_errors.Invalid role"));

    setLoading(true);

    setLoading(false);
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
        label="First Name*"
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
        label="Last Name*"
        style={{ color: "#B3B3B3" }}
        onChange={(e) =>
          setPersonInfo({
            ...personInfo,
            [e.target.name]: e.target.value.trim(),
          })
        }
      />
      <TextField
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
        label="Role*"
        values={["cashier", "waiter"]}
        value={personInfo.role}
        handleChange={(val) => setPersonInfo({ ...personInfo, role: val })}
        variant="standard"
        sx={{ margin: 0 }}
        textColor={"black"}
      />
      <Dropdown
        label="Work Unit*"
        values={user.workUnits}
        value={personInfo.workUnit}
        handleChange={(val) => setPersonInfo({ ...personInfo, workUnit: val })}
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
        label="Email*"
        name="email"
        onChange={(e) =>
          setPersonInfo({
            ...personInfo,
            [e.target.name]: e.target.value.trim(),
          })
        }
      />

      <LoadingButton
        loading={loading}
        variant="contained"
        type="submit"
        style={{ marginTop: 20 }}
      >
        {t("pages.admin.add-staff.register")}
      </LoadingButton>
    </form>
  );
}
