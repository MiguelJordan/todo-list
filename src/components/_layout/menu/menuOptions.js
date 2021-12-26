import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
// import TranslateIcon from "@mui/icons-material/Translate";

const useOptions = (user) => {
  const Navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // general opts
  // const CompanyOpt = {
  //   handleClick: () => {},
  //   icon: <DashboardIcon color="primary" />,
  //   label: "Company",
  //   text: "Dashboard",
  // };

  // const wuOpt = {
  //   handleClick: () => {},
  //   icon: <DashboardIcon color="primary" />,
  //   label: "Unit",
  //   text: "Dashboard",
  // };

  const nameOpt = {
    handleClick: () => {},
    icon: <PersonIcon style={{ color: "white" }} />,
    text: `${user?.firstName || user?.lastName || "--name--"}`,
  };

  const dashboardOpt = {
    handleClick: () => {
      Navigate(`/${user.role}`);
    },
    icon: <DashboardIcon color="primary" />,
    text: "dashboard",
  };

  const logoutOpt = {
    handleClick: logout,
    icon: <Logout style={{ color: "red" }} />,
    text: "logout",
  };

  const options = {
    admin: { dividers: [], options: [nameOpt, dashboardOpt, logoutOpt] },
    cashier: { dividers: [], options: [nameOpt, dashboardOpt, logoutOpt] },
    waiter: { dividers: [0], options: [nameOpt, dashboardOpt, logoutOpt] },
    root: [dashboardOpt, logoutOpt],
  };

  return options[user.role] ?? [];
};

export default useOptions;
