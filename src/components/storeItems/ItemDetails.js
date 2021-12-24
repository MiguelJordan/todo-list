import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Hidden, alpha, Container, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "2%",
    //display: "flex",
    //marginLeft: "5%",
    //marginRight: "5%",
    height: "calc(80vh - 10%)",
    // minWidth: "50px",
    // minHeight: "300px",
    //position: "fixed",
    justifyContent: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    alignItems: "center",

    margin: "auto",
    webkitScrollbar: {
      width: 0,
    },
    transform: "translate(-50%, -50%)",
    position: "absolute",
    top: "50%",
    left: "50%",
    bottom: 0,
    [theme.breakpoints.up("lg")]: {
      minWidth: "94vw",
      //marginLeft: "10px",
      //maxWidth: 1500,
      height: "calc(80vh - 10%)",
    },
    [theme.breakpoints.up("md")]: {
      width: "calc(100vw - 230px)",
      marginLeft: "0px",
      //maxWidth: 1500,
      height: "calc(80vh - 10%)",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
      width: "calc(100vw - 30px)",
    },
  },
  form: {
    borderBottom: "3px solid green",
    color: "white",
    "&:hover": {
      color: "white",
    },
    "&:focus": {
      color: "white",
    },
  },
}));

export default function ItemDetails() {
  const [newVal, setNewVal] = useState({
    familly: "Boisson",
    category: "Beer",
    name: "Castel",
    measureUnit: "Bouteille",
    price: [],
    commissionAmt: 50,
    cost: 5000,
  });
  const [read, setRead] = useState(true);
  const classes = useStyles();
  const [val, setVal] = useState(2);
  const [error, setError] = useState("");

  const handleModifier = (e) => {
    e.preventDefault();

    if (
      !newVal.familly ||
      !newVal.category ||
      !newVal.measureUnit ||
      !newVal.commissionAmt ||
      !newVal.name
    )
      return setError("S'il vous plais entrez des valeurs valid ");

    console.log(newVal);
  };

  return (
    <div>
      <Container>
        <Select
          native
          variant="standard"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
        </Select>
        <Grid
          conatainer
          className={classes.grid}
          align="center"
          style={{ margin: "15px" }}
        >
          <form onSubmit={handleModifier}>
            <Grid item align="center">
              <FormControl color="success" variant="standard">
                <InputLabel
                  htmlFor="component-disabled"
                  style={{ color: "white" }}
                >
                  Famille
                </InputLabel>
                <Input
                  id="component-helper"
                  type="text"
                  readOnly={read}
                  defaultValue={newVal.familly}
                  name="familly"
                  className={classes.form}
                  onChange={(e) =>
                    setNewVal({ ...newVal, [e.target.name]: e.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item align="center">
              <FormControl color="success" variant="standard">
                <InputLabel
                  htmlFor="component-disabled"
                  style={{ color: "white" }}
                >
                  Categorie
                </InputLabel>
                <Input
                  id="component-helper"
                  type="text"
                  name="category"
                  readOnly={read}
                  defaultValue={newVal.category}
                  className={classes.form}
                  onChange={(e) =>
                    setNewVal({ ...newVal, [e.target.name]: e.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item align="center">
              <FormControl color="success" variant="standard">
                <InputLabel
                  htmlFor="component-disabled"
                  style={{ color: "white" }}
                >
                  Nom
                </InputLabel>
                <Input
                  id="component-helper"
                  type="text"
                  name="name"
                  defaultValue={newVal.name}
                  readOnly={read}
                  className={classes.form}
                  onChange={(e) =>
                    setNewVal({ ...newVal, [e.target.name]: e.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item align="center">
              <FormControl color="success" variant="standard">
                <InputLabel
                  htmlFor="component-disabled"
                  style={{ color: "white" }}
                >
                  Qauntite En Stock
                </InputLabel>
                <Input
                  type="number"
                  readOnly={true}
                  defaultValue={50}
                  className={classes.form}
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item align="center">
              <FormControl color="success" variant="standard">
                <InputLabel
                  htmlFor="component-disabled"
                  style={{ color: "white" }}
                >
                  Unite De Mesure
                </InputLabel>
                <Input
                  type="text"
                  name="measureUnit"
                  readOnly={read}
                  defaultValue={newVal.measureUnit}
                  className={classes.form}
                  onChange={(e) =>
                    setNewVal({ ...newVal, [e.target.name]: e.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item align="center">
              <FormControl color="success" variant="standard">
                <InputLabel
                  htmlFor="component-disabled"
                  style={{ color: "white" }}
                >
                  Commission
                </InputLabel>
                <Input
                  type="number"
                  name="commissionAmt"
                  readOnly={read}
                  defaultValue={newVal.commissionAmt}
                  className={classes.form}
                  onChange={(e) =>
                    setNewVal({ ...newVal, [e.target.name]: e.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item align="center">
              <FormControl color="success" variant="standard">
                <InputLabel
                  htmlFor="component-disabled"
                  style={{ color: "white" }}
                >
                  Prix D'achat
                </InputLabel>
                <Input
                  type="number"
                  name="cost"
                  readOnly={read}
                  defaultValue={newVal.cost}
                  className={classes.form}
                  onChange={(e) =>
                    setNewVal({ ...newVal, [e.target.name]: e.target.value })
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item align="center">
              <FormControl color="success" variant="standard">
                <InputLabel
                  htmlFor="component-disabled"
                  style={{ color: "white" }}
                >
                  Prix De Vente
                </InputLabel>
                <Input
                  type="number"
                  readOnly={read}
                  defaultValue={1000}
                  className={classes.form}
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>

            <Grid item style={{ marginTop: "5%" }}>
              <Button
                disabled={!read}
                variant="contained"
                style={{ backgroundColor: "#FF0000" }}
              >
                Supprimer
              </Button>
              <Button
                variant="contained"
                type={read ? "" : "submit"}
                onClick={(e) => {
                  if (read) setRead(false);
                }}
                style={{ backgroundColor: "#04A5E0", marginLeft: "5%" }}
              >
                {read ? "Modifier" : "Valider"}
              </Button>
            </Grid>
          </form>
        </Grid>
      </Container>
    </div>
  );
}
