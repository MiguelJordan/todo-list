import React, { useContext, useState } from "react";
import { Button, Typography, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router";

import LockCloseOutlined from "@mui/icons-material/LockOutlined";

//components
import Layout from "../components/_layout/Layout";
import { AuthContext } from "../contexts/AuthContext";
import { TrContext } from "../contexts/TranslationContext";

const useStyles = makeStyles((theme) => ({
  inputText: {
    color: "black",
  },
}));

const Page = () => {
  const [user, setUser] = useState({ id: "", password: "", role: "" });
  const classes = useStyles();

  const [serverError, setServerError] = useState("");
  const [disabled] = useState(false);
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const { t } = useContext(TrContext);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    // validate data
    if (!user.id || !user.password) {
      return setServerError("Please Enter your Id and Password");
    }

    // submit data
    const res = await login(user);

    // verify response
    if (res.error) return setServerError(res.error);

    // redirect to dashboard
    return navigate(`/${res.role}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "330px",
        backgroundColor: "#FFFFFF",
        borderRadius: "3px",

        /* to center it on the page */
        position: "absolute",
        transform: "translate(-50%,-50%)",
        top: "50%",
        left: "50%",
        height: "350px",
      }}
    >
      <Avatar
        style={{
          backgroundColor: "#001D42",
          display: "flex",
          alignItems: "center",
          alignSelf: "center",
          marginTop: "5px",
        }}
      >
        <LockCloseOutlined />
      </Avatar>
      <span style={{ alignItems: "center" }}>
        <Typography
          component="h1"
          variant="h5"
          style={{
            color: "#001D42",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {t("pages.login.title")}
        </Typography>
      </span>

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
        {serverError !== "" && (
          <div
            style={{
              border: "2px solid red",
              color: "#001D42",
              margin: "5px",
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Typography variant="subtitle2" style={{ color: "black" }}>
              {t(`server_err.${serverError}`)}
            </Typography>
          </div>
        )}
        <TextField
          type="text"
          label="ID*"
          fullWidth
          name="id"
          variant="outlined"
          inputProps={{
            className: classes.inputText,
          }}
          onChange={handleChange}
          required
          style={{ color: "#001D42" }}
          autoComplete="off"
        />

        <TextField
          onChange={handleChange}
          type="password"
          label={t("pages.auth.passwordField") + "*"}
          fullWidth
          name="password"
          variant="outlined"
          inputProps={{
            className: classes.inputText,
          }}
          required
          style={{ marginTop: "10px" }}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "15px" }}
          disabled={disabled}
        >
          {t("pages.login.title")}
        </Button>
      </form>
    </div>
  );
};

export default function Login() {
  return <Layout Main={Page} showLoginBtn={false} />;
}
