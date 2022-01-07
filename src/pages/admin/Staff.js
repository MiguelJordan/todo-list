import { useContext, useState } from "react";
import { TrContext } from "../../contexts/TranslationContext";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

//icon
import EditRounded from "@mui/icons-material/EditRounded";
import Fabs from "../../components/subComponents/Fabs";
import AddStaff from "./Staff.add";
import Search from "../../components/subComponents/Search";

export default function Staff() {
  const { t } = useContext(TrContext);

  const users = [
    { id: "1", name: "john", role: "waiter" },
    { id: "2", name: "Anne", role: "waiter" },
    { id: "3", name: "Jack", role: "cashier" },
    { id: "4", name: "one", role: "admin" },
    { id: "5", name: "paul", role: "waiter" },
    { id: "6", name: "jones", role: "waiter" },
    { id: "7", name: "Agne", role: "waiter" },
    { id: "8", name: "Jacky", role: "cashier" },
    { id: "9", name: "oneMan", role: "admin" },
    { id: "10", name: "pauline", role: "waiter" },
  ];

  const [searchVal, setSearchVal] = useState("");

  const filterUsers = [];

  users.filter((user) => {
    if (!searchVal || user.name.includes(searchVal.toLowerCase().trim()))
      return filterUsers.push(user);
    return "";
  });

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className="center">{t("List of Staff Members")}</h1>

      <Search onChange={setSearchVal} />

      <div
        style={{
          maxWidth: "500px",
          minWidth: "300px",
          height: "68vh",
          overflowY: "auto",
        }}
      >
        <List>
          {filterUsers.length !== 0 ? (
            filterUsers.map((_user) => (
              <ListItem
                key={_user.id}
                style={{
                  marginBottom: "5px",
                  backgroundColor: "#2196f3",
                  borderRadius: "5px",
                }}
              >
                <ListItemText
                  primary={_user.name}
                  // secondary={secondary ? "Secondary text" : null}
                />
                <ListItemText
                  primary={_user.role}
                  //secondary={secondary ? "Secondary text" : null}
                />
                <ListItemAvatar
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Avatar style={{ backgroundColor: "#4caf50" }}>
                    <EditRounded />
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
            ))
          ) : (
            <h2
              style={{
                marginTop: "100px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              No User Found
            </h2>
          )}
        </List>
      </div>

      <Fabs path="/admin/staff/add" />
    </div>
  );
}
