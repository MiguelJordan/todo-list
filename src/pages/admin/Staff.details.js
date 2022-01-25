import { TextField, Button, createTheme } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

//import { makeStyles } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import Dropdown from "../../components/subComponents/Dropdown";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  input: {
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
      marginTop: "60px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "105px",
    },
  },
}));

export default function StaffDetail() {
  //const { t } = useContext(TrContext);
  const { user } = useContext(AuthContext);
  const classes = useStyles();

  const [read, setRead] = useState(true);
  const [error, setError] = useState("");
  const [_user] = useState({
    firstName: "john",
    lastName: "mark",
    role: "waiter",
    workUnit: user.workUnits[0],
    email: "abc@gmail.com",
    tel: "68555255",
  });

  const [userInfo, setUserInfo] = useState(_user);

  const [userCpy] = useState(_user);

  const handleModify = (e) => {
    e.preventDefault();

    if (!userInfo.firstName) return setError("Invalid firstName");
    if (!userInfo.lastName) return setError("Invalid lastName");
    if (!userInfo.tel || userInfo.tel < 0) return setError("Invalid tel");
    if (!userInfo.email) return setError("Invalid email");

    console.log(userInfo);
    setRead(true);
    setError("");
  };

  const cancelChanges = (e) => {
    setUserInfo({ ...userCpy });
    setRead(!read);
  };

  return (
    <form className={classes.form} onSubmit={handleModify}>
      {error !== "" && <div className="formError">{error}</div>}
      <TextField
        type="text"
        variant="standard"
        label="First Name"
        name="firstName"
        defaultValue={userInfo.firstName}
        inputProps={{
          className: classes.input,
          readOnly: read,
        }}
        onChange={(e) => {
          setUserInfo({ ...userInfo, [e.target.name]: e.target.value.trim() });
        }}
      />
      <TextField
        type="text"
        label="Last Name"
        name="lastName"
        variant="standard"
        defaultValue={userInfo.lastName}
        inputProps={{
          className: classes.input,
          readOnly: read,
        }}
        onChange={(e) => {
          setUserInfo({ ...userInfo, [e.target.name]: e.target.value.trim() });
        }}
      />
      <Dropdown
        label="Work Unit"
        values={user.workUnits}
        value={userInfo.workUnit}
        handleChange={(val) => setUserInfo({ ...userInfo, workUnit: val })}
        sx={{ margin: 0 }}
        variant="standard"
        textColor={"black"}
        read={read}
      />
      <Dropdown
        label="Role"
        values={["waiter", "cashier"]}
        value={userInfo.role}
        handleChange={(val) => setUserInfo({ ...userInfo, role: val })}
        sx={{ margin: 0 }}
        variant="standard"
        textColor={"black"}
        read={read}
      />

      <TextField
        type="email"
        variant="standard"
        label="Email"
        name="email"
        defaultValue={userInfo.email}
        inputProps={{
          className: classes.input,
          readOnly: read,
        }}
        onChange={(e) => {
          setUserInfo({ ...userInfo, [e.target.name]: e.target.value.trim() });
        }}
      />
      <TextField
        type="number"
        variant="standard"
        label="Tel"
        name="tel"
        defaultValue={userInfo.tel}
        inputProps={{
          className: classes.input,
          readOnly: read,
        }}
        onChange={(e) => {
          setUserInfo({ ...userInfo, [e.target.name]: e.target.value.trim() });
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {read && (
          <Button
            variant="contained"
            style={{ marginTop: "15px", backgroundColor: "#FF0000" }}
          >
            Supprimer
          </Button>
        )}
        {!read && (
          <Button
            variant="contained"
            style={{ marginTop: "15px", backgroundColor: "#FF0000" }}
            onClick={cancelChanges}
          >
            Annuler
          </Button>
        )}

        {!read && (
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#04A5E0", marginTop: "15px" }}
          >
            Valider
          </Button>
        )}
        {read && (
          <Button
            variant="contained"
            onClick={() => setRead(false)}
            style={{ backgroundColor: "#04A5E0", marginTop: "15px" }}
          >
            Modifier
          </Button>
        )}
        {read && (
          <Button variant="contained" style={{ marginTop: "15px" }}>
            Reset Password
          </Button>
        )}
      </div>
    </form>
  );
}
