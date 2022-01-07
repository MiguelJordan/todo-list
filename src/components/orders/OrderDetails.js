import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
  Avatar,
  Typography,
  Button,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

//icons
import { DeleteRounded, EditRounded, ExpandMore } from "@mui/icons-material";

import Dropdown from "../subComponents/Dropdown";
import PopOver from "../subComponents/PopOver";
import Dialogs from "../subComponents/Dialog";

const useStyles = makeStyles((theme) => ({
  accordion: {
    backgroundColor: "#173153",
    fill: "trasparent",
    borderRadius: 0,
  },
  table: {
    maxHeight: 250,
    //minWidth: 400,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 670,
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: 670,
    },
  },
  grid: {
    justifyContent: "center",
    color: "#B3B3B3",
    marginTop: "50%",
    //margin: 0,
    flexFlow: "column",
    [theme.breakpoints.down("sm")]: {
      //marginRight: "20%",
      marginBottom: 0,
    },
    [theme.breakpoints.between("sm", "md")]: {
      // marginLeft: "1%",
      //marginRight: "20%",
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      //marginRight: "20%",
      marginBottom: 0,
      marginTop: "50%",
    },
  },
  container: {
    marginTop: "10%",
    //marginLeft: "5%",
    //marginRight: "5%",
    height: "calc(80vh - 10%)",
    // minWidth: "50px",
    // minHeight: "300px",
    //position: "fixed",
    justifyContent: "center",
    overflowX: "hidden",
    overflowY: "scroll",
    display: "relative",
    webkitScrollbar: {
      width: 0,
    },
    position: "absolute",
    top: 0,
    bottom: 0,
    [theme.breakpoints.up("lg")]: {
      width: "calc(96vw - 150px)",
      marginLeft: "10px",
      //maxWidth: 1500,
      height: "calc(80vh - 9%)",
    },
    [theme.breakpoints.up("md")]: {
      width: "calc(100vw - 230px)",
      marginLeft: "0px",
      //maxWidth: 1500,
      height: "calc(80vh - 10%)",
      marginTop: "8%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "20%",
    },
  },
  text: {
    color: "#B3B3B3",
  },
  inputText: {
    color: "#FFFFFF",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    flexWrap: "wrap",

    gap: "15px",
  },
}));

export default function OrderDetails({
  list = [],
  role = "",
  methods = [],
  point = [],
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  let { id } = useParams();

  //contain the item to be delete or modified
  const [element, setElement] = useState({ modify: "", delete: "" });

  //control dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [msgDialog, setMsgDialog] = useState("");

  //add another payment for an order
  const [addPayment, setAddPayement] = useState([]);
  const [payment, setPayment] = React.useState([]);
  const [orderInfo, setOrderInfo] = useState({
    paymentMethod: payment,
  });

  //func that completely delete an item
  const handleDelete = () => {
    setOpenDialog(false);
    console.log("Delete", element.delete);
  };

  //use to close the dialog
  const CloseDialog = () => {
    setOpenDialog(false);
  };

  //trigger the dialog to delete an item
  const DeleteItem = (item) => {
    console.log("Delete", item);
    setMsgDialog(`Are you sure you want to delete this product(${item.name})?`);
    setElement({ ...element, ["delete"]: item });
    setOpenDialog(true);
  };

  //used modify an item
  const ModifyItem = (item) => {
    console.log("Modify", item);
    setElement({ ...element, ["modify"]: item });
  };

  //used by cashier to add payment field
  const handleRemoveField = (i) => {
    const values = [...addPayment];
    values.splice(i, 1);
    setAddPayement(values);
  };
  const handleAddField = () => {
    const values = [...addPayment];
    values.push({ value: null });
    setAddPayement(values);
  };

  //these expressions are used to calculate the total amount of an order
  const familly = Object.keys(list);
  let total = 0;

  familly.map((fam) => {
    list[fam].map((item) => {
      total += item.total;
    });
  });

  //contains pop over options
  const popMenu = [
    {
      name: "Supprimer",
      color: "#FF0000",
      action: (item) => DeleteItem(item),
      Icon: <DeleteRounded />,
    },
    {
      name: "Modifier",
      color: "#04A5E0",
      action: (item) => ModifyItem(item),
      Icon: <EditRounded />,
    },
  ];

  return (
    <>
      <Dialogs
        content={<Typography>{msgDialog}</Typography>}
        openDialog={openDialog}
        closeDialog={CloseDialog}
        PositiveRes={handleDelete}
      />
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          height: "65vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            placeContent: "center",
            placeItems: "center",
          }}
        >
          {familly.map((fam) => (
            <Grid
              align="center"
              item
              xs={6}
              sm={8}
              md={10}
              lg={12}
              style={{ flexFlow: "column" }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  style={{
                    backgroundColor: "#7F8DA0",
                    color: "#FFFFFF",
                  }}
                >
                  <Typography>{fam}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordion}>
                  <TableContainer className={classes.table}>
                    <Table
                      stickyHeader
                      aria-label="simple table"
                      className={classes.accordion}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="center"
                            style={{
                              backgroundColor: "#28405F",

                              color: "#B3B3B3",
                              fontSize: 20,
                            }}
                          >
                            Nom
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              backgroundColor: "#28405F",
                              fontSize: 20,
                              color: "#B3B3B3",
                            }}
                          >
                            Categorie
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              backgroundColor: "#28405F",
                              fontSize: 20,
                              color: "#B3B3B3",
                            }}
                          >
                            Quantite
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              backgroundColor: "#28405F",
                              fontSize: 20,
                              color: "#B3B3B3",
                            }}
                          >
                            Unite_de_mesure&nbsp;
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              backgroundColor: "#28405F",
                              fontSize: 20,
                              color: "#B3B3B3",
                            }}
                          >
                            Prix&nbsp;
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              backgroundColor: "#28405F",
                              fontSize: 20,
                              color: "#B3B3B3",
                            }}
                          >
                            Total&nbsp;
                          </TableCell>
                          {role === "waiter" && (
                            <TableCell
                              align="center"
                              style={{
                                backgroundColor: "#28405F",
                                fontSize: 20,
                                color: "#B3B3B3",
                              }}
                            >
                              Action&nbsp;
                            </TableCell>
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {list[fam].map((row, index) => (
                          <TableRow
                            key={`${index}`}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                              style={{
                                color: "#7f8893",
                                fontSize: 25,
                              }}
                            >
                              {row.name}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                              style={{ color: "#7f8893", fontSize: 25 }}
                            >
                              {row.category}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{ color: "#7f8893", fontSize: 25 }}
                            >
                              {row.quantity}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{ color: "#7f8893", fontSize: 25 }}
                            >
                              {row.measureUnit}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{ color: "#B3B3B3", fontSize: 25 }}
                            >
                              {row.price}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{ color: "#B3B3B3", fontSize: 25 }}
                            >
                              {row.total}
                            </TableCell>
                            {role === "waiter" && (
                              <TableCell
                                align="center"
                                style={{ color: "#B3B3B3", fontSize: 25 }}
                              >
                                <PopOver
                                  items={popMenu}
                                  Icon={
                                    <Avatar
                                      alt={row.name.toUpperCase()}
                                      src="/broken-image.jpg"
                                    />
                                  }
                                  event={row}
                                />
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </div>

        {role === "waiter" && (
          <div className={classes.buttonGroup}>
            <Button variant="contained" style={{ backgroundColor: "#04A5E0" }}>
              {"Enregistrer"}
            </Button>
            <Button variant="contained" style={{ backgroundColor: "#65C466" }}>
              {"Imprimer"}
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(`/waiter/orders/detail/add/${id}`)}
              // style={{ marginLeft: "10px" }}
            >
              {"Ajouter Produits"}
            </Button>
            <Button variant="contained" style={{ backgroundColor: "#FF0000" }}>
              Annuler
            </Button>
          </div>
        )}
        {role === "admin" && (
          <div style={{ margin: "15px" }}>
            <Grid item align="center">
              <FormControl color="success" variant="standard">
                <InputLabel
                  htmlFor="component-disabled"
                  style={{ color: "white" }}
                >
                  Waiter
                </InputLabel>
                <Input
                  id="component-helper"
                  type="text"
                  readOnly={true}
                  //defaultValue={newVal.familly}
                  name="familly"
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
                  Cashier
                </InputLabel>
                <Input
                  id="component-helper"
                  type="text"
                  readOnly={true}
                  //defaultValue={newVal.familly}
                  name="familly"
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
                  Payment Method
                </InputLabel>
                <Input
                  id="component-helper"
                  type="text"
                  readOnly={true}
                  //defaultValue={newVal.familly}
                  name="familly"
                  className={classes.form}
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
          </div>
        )}

        {role === "cashier" && (
          <div
            style={{
              marginTop: "25px",
              display: "flex",
              justifyContent: "center",
              flexFlow: "column",
              alignItems: "center",
            }}
          >
            <span>
              <FormControl color="success" variant="standard">
                <InputLabel
                  htmlFor="component-disabled"
                  style={{ color: "#B3B3B3" }}
                >
                  Payement
                </InputLabel>

                <Dropdown values={methods} onchange={setPayment} field="name" />
              </FormControl>
              <TextField
                type="number"
                label="Prix"
                name="price"
                inputProps={{
                  className: classes.text,
                }}
                variant="standard"
                autoFocus
                onChange={(e) =>
                  setPayment({ ...payment, [e.target.name]: e.target.value })
                }
                style={{ marginLeft: "20px", color: "#B3B3B3" }}
              />
            </span>
            {addPayment.map((field, idx) => (
              <span style={{ marginTop: "20px" }} key={`${field}-${idx}`}>
                <FormControl color="success" variant="standard">
                  <InputLabel
                    htmlFor="component-disabled"
                    style={{ color: "#B3B3B3" }}
                  >
                    Payement
                  </InputLabel>

                  <Dropdown values={methods} />
                </FormControl>
                <TextField
                  type="number"
                  label="Prix"
                  variant="standard"
                  autoFocus
                  name="price"
                  inputProps={{
                    className: classes.text,
                  }}
                  onChange={(e) =>
                    setOrderInfo({
                      ...orderInfo,
                      ["paymentMethod"]: [
                        {
                          [e.target.name]: e.target.value,
                        },
                      ],
                    })
                  }
                  style={{ marginLeft: "20px" }}
                />
                <Button
                  style={{ marginTop: "20px" }}
                  onClick={() => handleRemoveField(idx)}
                >
                  Supprimer
                </Button>
              </span>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "15px",
              }}
            >
              <Button onClick={() => console.log(payment)} variant="contained">
                Valider
              </Button>
              <Button
                variant="contained"
                onClick={handleAddField}
                style={{ marginLeft: "10px" }}
              >
                Ajouter(payement)
              </Button>
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "auto",
          marginTop: "20px",
        }}
      >
        <TextField
          variant="standard"
          label="Total(FCFA)"
          inputProps={{
            className: classes.inputText,
            readOnly: true,
          }}
          value={total}
        />
      </div>
    </>
  );
}
