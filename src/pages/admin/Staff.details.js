import { TextField, Button } from "@mui/material";
import { useContext, useState } from "react";

import { makeStyles } from "@material-ui/styles";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { TranslationContext } from "../../contexts/TranslationContext";

const useStyles = makeStyles((theme) => ({
  input: {
    color: "#FFFFFF",
  },
}));

export default function StaffDetail({
  list = {
    firstName: "john",
    lastName: "mark",
    role: "waiter",
    workUnit: "Wu1",
    email: "abc@gmail.com",
    tel: "68555255",
  },
}) {
  const { t } = useContext(TranslationContext);
  const { user } = useContext(AuthContext);
  const classes = useStyles();

  const [read, setRead] = useState(true);
  const [error, setError] = useState("");

  const [userInfo, setUserInfo] = useState(list);

  const handleModify = (e) => {
    e.preventDefault();

    if (
      !userInfo.email ||
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.role ||
      !userInfo.workUnit ||
      !userInfo.tel ||
      userInfo.tel < 0
    )
      return setError("Invalid value(s)");
    console.log(userInfo);
    setRead(true);
    setError("");
  };

  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        width: "330px",
        alignItems: "center",
        position: "absolute",
        transform: "translate(-50%,-5%)",
        marginTop: "40px",
        left: "50%",
      }}
      onSubmit={handleModify}
    >
      {error !== "" && (
        <div
          style={{
            margin: "5px",
            border: "2px solid red",
            maxWidth: "290px",
          }}
        >
          {error}
        </div>
      )}
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
      <TextField
        type="text"
        label="Role"
        name="role"
        variant="standard"
        defaultValue={userInfo.role}
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
        label="Post de Travail"
        name="workUnit"
        variant="standard"
        defaultValue={userInfo.workUnit}
        inputProps={{
          className: classes.input,
          readOnly: read,
        }}
        onChange={(e) => {
          setUserInfo({ ...userInfo, [e.target.name]: e.target.value.trim() });
        }}
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

      <Button
        disabled={!read}
        variant="contained"
        style={{ marginTop: "15px", backgroundColor: "#FF0000" }}
      >
        Supprimer
      </Button>

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
      <Button
        disabled={!read}
        variant="contained"
        style={{ marginTop: "15px" }}
      >
        Reset Password
      </Button>
    </form>
  );
}
