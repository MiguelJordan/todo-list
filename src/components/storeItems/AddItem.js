import React from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Button, Grid, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "80vw",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("sm")]: {
      //   maxWidth: "100px",
      minWidth: "95vw",
      //   minHeight: "100px",
      //width: "100vw",
    },
  },
  loginBackground: {
    justifyContent: "center",
    minHeight: "30vh",
    padding: "50px",
    minWidth: "37vw",
    backgroundColor: "#FFFFFF",

    [theme.breakpoints.down("sm")]: {
      padding: "10px",
      margin: "auto",
      minWidth: "87vw",
    },
    [theme.breakpoints.between("sm", "md")]: {
      padding: "70px",
      minWidth: "33vw",
    },
    [theme.breakpoints.up("md")]: {
      padding: "70px",
      minWidth: "30vw",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "60px",
      minWidth: "20vw",
    },
  },
}));

export default function AddItem() {
  const classes = useStyles();

  const [serverError, setServerError] = React.useState("");

  return (
    <Grid container className={classes.root}>
      <Paper
        variant="elevation"
        elevation={2}
        className={classes.loginBackground}
      >
        <Grid align="center" style={{ marginBottom: "5%" }}>
          <Typography component="h1" variant="h5">
            ADD Item
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
        <Grid>
          <form>
            <Grid container spacing={1} direction={"column"}>
              <Grid item>
                <TextField
                  type="text"
                  label="Familly*"
                  fullWidth
                  name="Familly"
                  variant="standard"
                  required
                  autoComplete="off"
                />
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  label="Category*"
                  fullWidth
                  name="Category"
                  variant="standard"
                  required
                  autoComplete="off"
                />
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  label="Name*"
                  fullWidth
                  name="Name"
                  variant="standard"
                  required
                  autoComplete="off"
                />
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  label="Cost*"
                  fullWidth
                  name="Number"
                  variant="standard"
                  required
                  autoComplete="off"
                />
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  label="Price(s)*"
                  fullWidth
                  name="Number"
                  variant="standard"
                  multiline
                  required
                  autoComplete="off"
                />
              </Grid>
              <Grid item>
                <TextField
                  type="file"
                  label="Image*"
                  fullWidth
                  name="Number"
                  variant="standard"
                  required
                  autoComplete="off"
                />
              </Grid>
              <Grid item align="center">
                <Button variant="contained">Add</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}
