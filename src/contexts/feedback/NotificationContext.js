import { createContext, useState } from "react";

import SnackBar from "../../components/subComponents/SnackBar";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    msg: "Hello,",
    color: "success",
    isOpen: false,
  });

  const closeNotification = () => {
    setNotification({ ...notification, isOpen: false });
  };

  const showNotification = ({ msg, color }) => {
    if (!["success", "info", "error", "warning"].includes(color)) {
      color = "error";
      msg = "Invalid color";
    }

    setNotification({ msg, color, isOpen: true });
  };

  const context = { showNotification };
  return (
    <NotificationContext.Provider value={context}>
      <SnackBar
        msg={notification.msg}
        color={notification.color}
        open={notification.isOpen}
        close={closeNotification}
      />
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
