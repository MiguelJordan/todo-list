import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";

import { alpha, Container, TextField } from "@mui/material";
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

export default function ItemDetails({ list = {} }) {
  const [newVal, setNewVal] = useState(list);
  const [read, setRead] = useState(true);
  const classes = useStyles();
  const [error, setError] = useState("");

  const handleModifier = (e) => {
    e.preventDefault();

    if (
      !newVal.familly ||
      !newVal.category ||
      !newVal.measureUnit ||
      !newVal.commissionAmt ||
      !newVal.name ||
      newVal.cost <= 0
    )
      return setError(
        "S'il vous plais entrez des valeurs valid dans les champs approprier"
      );
    setError("");
    setRead(true);
    console.log(newVal);
  };

  return (
    <div>
      <Container>
        <Grid
          conatainer
          className={classes.grid}
          align="center"
          style={{ margin: "15px" }}
        >
          <form onSubmit={handleModifier}>
            {error !== "" && (
              <div
                style={{
                  margin: "15px",
                  border: "2px solid red",
                  maxWidth: "280px",
                }}
              >
                {error}
              </div>
            )}
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
                  Commission(FCFA)
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
                  Prix D'achat(FCFA)
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

            {/* <Grid item align="center">
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
            </Grid> */}

            <Grid item style={{ marginTop: "5%" }}>
              <Button
                disabled={!read}
                variant="contained"
                style={{ backgroundColor: "#FF0000" }}
              >
                Supprimer
              </Button>
              {read && (
                <Button
                  variant="contained"
                  onClick={() => setRead(false)}
                  style={{ backgroundColor: "#04A5E0", marginLeft: "5%" }}
                >
                  Modifier
                </Button>
              )}
              {!read && (
                <Button
                  variant="contained"
                  type="submit"
                  style={{ backgroundColor: "#04A5E0", marginLeft: "5%" }}
                >
                  Valider
                </Button>
              )}
            </Grid>
          </form>
        </Grid>
      </Container>
    </div>
  );
}
