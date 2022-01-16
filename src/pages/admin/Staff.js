import { useContext, useState } from "react";
import { TranslationContext } from "../../contexts/TranslationContext";
import { makeStyles } from "@material-ui/core";

import { filter } from "../../functions/data";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditRounded, DeleteRounded } from "@mui/icons-material";

//import { NTContext } from "../../contexts/NTContext";
import Dropdown from "../../components/subComponents/Dropdown";
//import Dialog from "../../components/subComponents/Dialog";
import DisplayField from "../../components/subComponents/DisplayField";
import PopOver from "../../components/subComponents/PopOver";
import useSearch from "../../hooks/useSearch";
import Search from "../../components/subComponents/Search";

import { List, ListItem, ListItemText } from "@mui/material";
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
  const { t } = useContext(TranslationContext);
  //const { showNotification } = useContext(NTContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState("");

  var users = [
    {
      id: 1,
      name: "Snowdsbgbgdsesvsvbbgbrbgr",

      role: "waiter",
    },
    { id: 2, name: "Lannister", role: "cashier" },
    { id: 3, name: "Lannister", role: "waiter" },
    { id: 4, name: "Stark", role: "cashier" },
    { id: 5, name: "Targaryen", role: "barman" },
    { id: 6, name: "Melisandre", role: "waiter" },
    { id: 7, name: "Clifford", role: "cashier" },
    { id: 8, name: "Frances", role: "waiter" },
    { id: 9, name: "Roxie", role: "cashier" },
    { id: 10, name: "Roxie", role: "cashier" },
    { id: 11, name: "Roxie", role: "cashier" },
    { id: 12, name: "Roxie", role: "cashier" },
  ];

  const [criteria, setCriteria] = useState("role");
  const [user, setUser] = useState(users);

  const { filtered, setSearchVal } = useSearch({
    data: user,
    criteria: criteria,
  });

  // func that trigers to delete a user
  const DeleteUser = (e) => {
    console.log("delete", e);
    setMsg("Are you sure you want to delete this user ?");
    setOpenDialog(true);
  };

  const userDetails = (user) => {
    console.log("details", user);
    navigate(`/admin/staff/${user.id}`);
  };

  const AdminPopMenu = [
    {
      name: "Supprimer",
      color: "#FF0000",
      Icon: <DeleteRounded />,
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
          values={["role", "name"]}
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
                <ListItemText style={{ maxWidth: "50px", marginLeft: "1px" }}>
                  <DisplayField
                    value={user.name}
                    sx={{ maxWidth: "75px", marginLeft: "1px" }}
                  />
                </ListItemText>

                <ListItemText style={{ maxWidth: "50px", marginLeft: "1px" }}>
                  <DisplayField
                    value={user.role}
                    sx={{ maxWidth: "75px", marginLeft: "1px" }}
                  />
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
