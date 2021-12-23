import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

// icons
import Logout from "@mui/icons-material/Logout";
// import { white } from "@mui/material/colors";

const useOptions = (role = "") => {
  const { logout } = useContext(AuthContext);

  // general opts
  const logoutOpt = {
    handleClick: logout,
    icon: <Logout color="primary" />,
    text: "Logout",
  };
  // const logoutOpt = { handleClick: () => {}, icon: <Logout />, text: "Logout" };

  const options = {
    admin: [logoutOpt],
    cashier: [logoutOpt],
    waiter: [logoutOpt],
    root: [logoutOpt],
  };

  return options[role] ?? [];
};

export default useOptions;
