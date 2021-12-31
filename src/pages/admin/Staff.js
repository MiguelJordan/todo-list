import { useContext } from "react";
import { TrContext } from "../../contexts/TranslationContext";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

//icon
import EditRounded from "@mui/icons-material/EditRounded";

export default function Staff() {
  const { t } = useContext(TrContext);

  const list = [
    { id: "1", name: "john", role: "waiter" },
    { id: "2", name: "Anne", role: "waiter" },
    { id: "3", name: "Jack", role: "cashier" },
    { id: "4", name: "one", role: "admin" },
    { id: "5", name: "paul", role: "waiter" },
  ];

  return (
    <>
      {/* <h1 className="center">{t("List of Staff Members")}</h1> */}

      <Grid container justifyContent={"center"} align="center" spacing={2}>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          align="center"
          style={{ backgroundColor: "#001d42" }}
        >
          <List style={{ backgroundColor: "#001d42" }}>
            {list.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  // secondary={secondary ? "Secondary text" : null}
                />
                <ListItemText
                  primary={item.role}
                  //secondary={secondary ? "Secondary text" : null}
                />
                <ListItemAvatar
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Avatar>
                    <EditRounded />
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
}
