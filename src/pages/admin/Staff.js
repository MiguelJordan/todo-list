import { useContext, useState } from "react";
import { TrContext } from "../../contexts/TranslationContext";
import { makeStyles } from "@material-ui/core";

import { filter } from "../../functions/data";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditRounded } from "@mui/icons-material";

import { NTContext } from "../../contexts/NTContext";
import Dropdown from "../../components/subComponents/Dropdown";
import Dialog from "../../components/subComponents/Dialog";
import Search from "../../components/subComponents/Search";
import PopOver from "../../components/subComponents/PopOver";
import useSearch from "../../hooks/useSearch";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    alignitems: "center",
    overflowY: "auto",
    height: "75vh",
    flexWrap: "wrap",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      height: "78vh",
    },
  },
}));

export default function Staff() {
  // const { t } = useContext(TrContext);
  const { showNotification } = useContext(NTContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  var users = [
    {
      id: 1,
      lastName: "Snowdsbgbgdsesvsvbbgbrbgr",
      firstName: "Jon",
      role: "waiter",
    },
    { id: 2, lastName: "Lannister", firstName: "Cersei", role: "cashier" },
    { id: 3, lastName: "Lannister", firstName: "Jaime", role: "waiter" },
    { id: 4, lastName: "Stark", firstName: "Arya", role: "cashier" },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", role: "barman" },
    { id: 6, lastName: "Melisandre", firstName: "John", role: "waiter" },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", role: "cashier" },
    { id: 8, lastName: "Frances", firstName: "Rossini", role: "waiter" },
    { id: 9, lastName: "Roxie", firstName: "Harvey", role: "cashier" },
    { id: 10, lastName: "Roxie", firstName: "Harvey", role: "cashier" },
    { id: 11, lastName: "Roxie", firstName: "Harvey", role: "cashier" },
    { id: 12, lastName: "Roxie", firstName: "Harvey", role: "cashier" },
  ];

  const [criteria, setCriteria] = useState("role");
  const [user, setUser] = useState(users);

  const { filtered, setSearchVal } = useSearch({
    data: user,
    criteria: criteria,
  });

  const DeleteUser = (e) => {
    console.log("delete", e);
    setMsg("Are you sure you want to delete this user ?");
    setOpen(true);
  };

  const userDetails = (user) => {
    console.log("details", user);
    navigate(`/admin/staff/${user.id}`);
  };

  const AdminPopMenu = [
    {
      name: "Supprimer",
      color: "#FF0000",
      Icon: <EditRounded />,
      action: (user) => DeleteUser(user),
    },
    {
      name: "Modifier",
      color: "#04A5E0",
      Icon: <EditRounded />,
      action: (user) => userDetails(user),
    },
  ];

  return (
    <>
      <Dialog openDialog={open} closeDialog={setOpen} content={msg} />
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        <Dropdown
          label="Criteria"
          values={["role", "firstName"]}
          value={criteria}
          handleChange={setCriteria}
        />
        <Search onChange={setSearchVal} />
      </div>
      <div className={classes.container}>
        {filtered.length !== 0 ? (
          <List
            style={{
              display: "flex",
              flexFlow: "column",
              //justifyContent: "space-between",
              width: "700px",
              minWidth: "400px",
              backgroundColor: "#001e3c",
            }}
          >
            {filtered.map((user) => (
              <ListItem
                key={user.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                  borderBottom: "2px solid #B3B3B3",
                }}
              >
                <ListItemText style={{ maxWidth: "90px", overflowX: "auto" }}>
                  {user.firstName}
                </ListItemText>
                <ListItemText style={{ maxWidth: "90px", overflowX: "auto" }}>
                  {user.lastName}
                </ListItemText>
                <ListItemText style={{ maxWidth: "90px", overflowX: "auto" }}>
                  {user.role}
                </ListItemText>

                <PopOver
                  items={AdminPopMenu}
                  Icon={<MoreVertIcon />}
                  event={user}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <h2 style={{ marginTop: "100px" }}>{"No User Found"}</h2>
        )}
      </div>
    </>
  );
}
