import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

import {
  Checkbox,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Select,
} from "@mui/material";

import { DeleteRounded, EditRounded, ExpandMore } from "@mui/icons-material";
import {
  Avatar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
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
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  accordion: {
    backgroundColor: "#173153",
    fill: "trasparent",
    borderRadius: 0,
  },
  table: {
    maxHeight: 250,
    backgroundColor: "blue",

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
}));

export default function OrderDetails({ list, role = "", methods }) {
  const classes = useStyles();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [method, setMethod] = useState([]);

  const handlechange = (e) => {
    const {
      target: { value },
    } = e;
    setMethod(typeof value === "string" ? value.split(",") : value);
  };
  const MenuProps = {
    PaperProps: {
      Styles: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  const handleOpenUser = (e) => {
    setAnchorElUser(e.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorElUser(null);
  };
  const DeleteItem = () => {
    console.log("Delete");
  };

  const ModifyItem = () => {
    console.log("Modify");
  };
  const familly = Object.keys(list);

  const option = [
    {
      name: "Supprimer",
      color: "#FF0000",
      func: DeleteItem,
      Icon: <DeleteRounded />,
    },
    {
      name: "Modifier",
      color: "#04A5E0",
      func: ModifyItem,
      Icon: <EditRounded />,
    },
  ];

  return (
    <div>
      <Container>
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
                        {list[fam].map((row) => (
                          <TableRow
                            key={row.name}
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
                                <Tooltip title="Action">
                                  <IconButton onClick={handleOpenUser}>
                                    <Avatar
                                      alt={row.name.toUpperCase()}
                                      src="/broken-image.jpg"
                                    />
                                  </IconButton>
                                </Tooltip>
                                <Menu
                                  anchorEl={anchorElUser}
                                  anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                  keepMounted
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                  open={Boolean(anchorElUser)}
                                  onClose={handleCloseUser}
                                >
                                  {option.map((item) => (
                                    <MenuItem
                                      key={item.name}
                                      onClick={item.func}
                                    >
                                      <ListItemIcon
                                        style={{
                                          color: `${item.color}`,
                                        }}
                                      >
                                        {item.Icon}
                                      </ListItemIcon>
                                      <Typography
                                        textAlign={"center"}
                                        style={{
                                          color: "white",
                                        }}
                                      >
                                        {item.name}
                                      </Typography>
                                    </MenuItem>
                                  ))}
                                </Menu>
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2%",
            }}
          >
            <Button variant="contained" style={{ backgroundColor: "#04A5E0" }}>
              {"Enregistrer & Imprimer"}
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#FF0000", marginLeft: "5%" }}
            >
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
          <div>
            <Grid item align="center">
              {" "}
              <FormControl color="success" variant="standard">
                <InputLabel
                  htmlFor="component-disabled"
                  style={{ color: "white" }}
                >
                  Payment Method
                </InputLabel>
                <Select
                  id="component-helper"
                  multiple
                  type="text"
                  readOnly={true}
                  onChange={handlechange}
                  value={method}
                  input={<OutlinedInput label="Method" />}
                  renderValue={(selected) => selected.join(",")}
                  MenuProps={MenuProps}
                  name="familly"
                  className={classes.form}
                >
                  {methods.map((name) => (
                    <MenuItem value={name} key={name}>
                      <Checkbox checked={method.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </div>
        )}
      </Container>
    </div>
  );
}
