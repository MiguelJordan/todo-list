import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
} from "@material-ui/core";
import { Avatar } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import LockCloseOutlined from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router";

import Layout from "../components/_layout/Layout";

import { AuthContext } from "../contexts/AuthContext";

import useTranslation from "../hooks/useTranslation";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      //   maxWidth: "100px",
      minWidth: "95vw",
      //   minHeight: "100px",
      //width: "100vw",
    },
  },
  loginForm: {
    justifyContent: "center",
    minHeight: "90vh",
    alignItems: "center",
  },
  loginBackground: {
    justifyContent: "center",
    minHeight: "30vh",
    padding: "50px",
    minWidth: "37vw",

    [theme.breakpoints.down("sm")]: {
      padding: "10px",
      margin: "auto",
      minWidth: "87vw",
    },
    [theme.breakpoints.between("sm", "md")]: {
      padding: "70px",
      minWidth: "57vw",
    },
    [theme.breakpoints.up("md")]: {
      padding: "70px",
    },
  },
  buttonBlock: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      //display: "block",
      width: "90%",
    },
  },
  Error: {
    display: "inline-block",
  },
}));

const Page = () => {
  const style = useStyles();

  const [user, setUser] = useState({ id: "", password: "", role: "" });

  const [serverError, setServerError] = useState("");
  const [rootRole, setRootRole] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate data
    if (!user.id || !user.password) {
      return setServerError("Please Enter your Id and Password");
    }

    // submit data
    const res = await login(user);

    // verify response
    if (res.error) {
      return setServerError(res.error);
    }

    // log user in if successful
    setRootRole("");
    setServerError("");

    // get routes and redirects
    if (res.role === "waiter") {
      navigate("/waiter");
    } else if (res.role === "cashier") {
      navigate("/cashier");
    }
  };

  return (
    <>
      <Grid align="center" className={style.root}>
        <Grid item xs={6} align="center">
          <Grid
            container
            align="center"
            justifyContent="center"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <Paper
              variant="elevation"
              elevation={2}
              className={style.loginBackground}
            >
              <Grid align="center" style={{ marginBottom: "5%" }}>
                <Avatar style={{ backgroundColor: "#001D42" }}>
                  <LockCloseOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                  {t("login_page.title")}
                </Typography>
              </Grid>
              {serverError !== "" ? (
                <Grid
                  item
                  align="center"
                  style={{
                    marginBottom: "5%",
                  }}
                >
                  <div
                    style={{
                      border: "2px solid red",
                      borderRadius: 5,
                      marginBottom: "2%",
                    }}
                  >
                    <Typography variant="subtitle2" style={{ color: "black" }}>
                      {serverError}
                    </Typography>
                  </div>
                </Grid>
              ) : (
                ""
              )}

              <Grid item>
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="text"
                        label="ID*"
                        fullWidth
                        name="id"
                        variant="outlined"
                        onChange={handleChange}
                        required
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        className={style.field}
                        onChange={handleChange}
                        type="password"
                        label={t("auth.passwordField") + "*"}
                        fullWidth
                        name="password"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    {rootRole !== "" ? (
                      <Grid item>
                        <TextField
                          className={style.field}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              [e.target.name]: e.target.value.trim(),
                            });
                          }}
                          type="text"
                          label="Role*"
                          fullWidth
                          name="role"
                          variant="outlined"
                          required
                        />
                      </Grid>
                    ) : (
                      ""
                    )}

                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={style.buttonBlock}
                        disabled={disabled}
                      >
                        {t("login_page.title")}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <span style={{ marginBottom: "3%" }}>
                <Link href="#" variant="body2">
                  {t("auth.forgot_password")}
                </Link>
              </span>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default function Login() {
  return <Layout Main={Page} showLoginBtn={false} />;
}
