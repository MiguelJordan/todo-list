import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";

import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  createTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { IconButton } from "@mui/material";

import { Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";

//components
import Layout from "../components/_layout/Layout";

// contexts
import { AuthContext } from "../contexts/AuthContext";
import { TranslationContext } from "../contexts/TranslationContext";

// icons
import LockCloseOutlined from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    margin: "auto",
    maxWidth: "350px",
    marginTop: "120px",
    padding: "20px",
    borderRadius: "3px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "55px",
      width: 300,
    },
  },
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
  const [showpassword, setShowPass] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();

    // validate data
    if (!user.id) return setError("Invalid user id");

    if (!user.password) return setError("Invalid password");

    setLoading(true);

    // submit data
    const res = await login(user);

    setLoading(false);

    // verify response
    if (res.error) return setError(res.error);

    // redirect to dashboard
    return navigate(`/${res.role}`);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
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
            {t(`_errors.${error}`)}
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
      <FormControl style={{ marginTop: "20px" }} variant="outlined">
        <InputLabel>{t("pages.auth.passwordField") + "*"}</InputLabel>
        <OutlinedInput
          label={t("pages.auth.passwordField") + "*"}
          name="password"
          type={showpassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPass(!showpassword)} edge="end">
                {showpassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          onChange={handleChange}
          inputProps={{
            className: classes.inputText,
          }}
          required
        />
      </FormControl>
      {/* <TextField
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
        /> */}

      <LoadingButton
        variant="contained"
        color="primary"
        loadingPosition="start"
        startIcon={<LoginIcon />}
        type="submit"
        loading={loading}
        style={{ marginTop: "15px" }}
        disabled={disabled}
      >
        {t("pages.login.title")}
      </LoadingButton>
    </form>
  );
};

export default function Login() {
  return <Layout Main={Page} showLoginBtn={false} />;
}
