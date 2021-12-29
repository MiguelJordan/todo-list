import React from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Button, Grid, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    //minWidth: "80vw",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      //minWidth: "95vw",
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
  const [item, setItem] = React.useState({
    name: "",
    familly: "",
    category: "",
    cost: "",
    price: [],
    image: "",
  });
  const [serverError, setServerError] = React.useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(item);
  };

  return (
    <Grid container align="center" className={classes.root}>
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
        <Grid item xs={8}>
          <form onSubmit={handleAdd}>
            <Grid container spacing={1} direction={"column"}>
              <Grid item>
                <TextField
                  type="text"
                  label="Familly*"
                  fullWidth
                  name="familly"
                  variant="standard"
                  required
                  onChange={(e) => {
                    setItem({ ...item, [e.target.name]: e.target.value });
                  }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  label="Category*"
                  fullWidth
                  name="category"
                  variant="standard"
                  required
                  onChange={(e) => {
                    setItem({ ...item, [e.target.name]: e.target.value });
                  }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  label="Name*"
                  fullWidth
                  name="name"
                  variant="standard"
                  required
                  onChange={(e) => {
                    setItem({ ...item, [e.target.name]: e.target.value });
                  }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  label="Cost*"
                  fullWidth
                  name="cost"
                  variant="standard"
                  required
                  onChange={(e) => {
                    setItem({ ...item, [e.target.name]: e.target.value });
                  }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  label="Price(s)*"
                  fullWidth
                  name="price"
                  variant="standard"
                  multiline
                  required
                  onClick={(e) => {
                    setItem({
                      ...item,
                      [e.target.name]: [...item.price, e.target.value],
                    });
                  }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item>
                <TextField
                  type="file"
                  label="Image*"
                  fullWidth
                  name="image"
                  variant="standard"
                  required
                  onChange={(e) => {
                    setItem({ ...item, [e.target.name]: e.target.value });
                  }}
                  autoComplete="off"
                />
              </Grid>
              <Grid item align="center">
                <Button type="submit" variant="contained">
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}
