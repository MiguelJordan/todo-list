import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { Button, Typography, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";

//components
import Layout from "../components/_layout/Layout";

// contexts
import { AuthContext } from "../contexts/AuthContext";
import { TranslationContext } from "../contexts/TranslationContext";

// icons
import LockCloseOutlined from "@mui/icons-material/LockOutlined";

const useStyles = makeStyles((theme) => ({
  inputText: {
    color: "black",
  },
}));

const Page = () => {
  const { login } = useContext(AuthContext);
  const { t } = useContext(TranslationContext);
  const classes = useStyles();
  const navigate = useNavigate();

  const [user, setUser] = useState({ id: "", password: "" });
  const [disabled] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    setLoading(true);

    // validate data
    if (!user.id) {
      setLoading(false);
      return setError(t("Invalid user id"));
    }
    if (!user.password) {
      setLoading(false);
      return setError(t("Invalid password"));
    }

    // submit data
    const res = await login(user);

    // verify response
    if (res.error) {
      setLoading(false);
      return setError(res.error);
    }

    setLoading(false);
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
        maxWidth: "350px",
        backgroundColor: "#FFFFFF",
        borderRadius: "3px",
        margin: "170px auto",
        padding: "20px",
      }}
    >
      <form
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          color: "#B3B3B3",
          width: "70%",
        }}
        onSubmit={handleSubmit}
      >
        <Avatar style={{ backgroundColor: "#001D42", margin: "0 auto" }}>
          <LockCloseOutlined />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ color: "#001D42", textAlign: "center" }}
        >
          {t("pages.login.title")}
        </Typography>
        {error && (
          <div
            style={{
              border: "2px solid red",
              color: "#001D42",
              textAlign: "center",
              marginBottom: "10px",
              padding: "5px 10px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="subtitle2" style={{ color: "black" }}>
              {t(`server_err.${error}`)}
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

        <LoadingButton
          variant="contained"
          color="primary"
          type="submit"
          loading={loading}
          style={{ marginTop: "15px" }}
          disabled={disabled}
        >
          {t("pages.login.title")}
        </LoadingButton>
      </form>
    </div>
  );
};

export default function Login() {
  return <Layout Main={Page} showLoginBtn={false} />;
}
