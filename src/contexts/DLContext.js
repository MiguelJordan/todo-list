import { createContext, useContext, useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";
import { OrderContext } from "./OrderContext";
import { SocketContext } from "./SocketContext";

// const apiUrl = process.env.REACT_APP_API_URL;

// data layer context
// to handle client events
export const DLContext = createContext();

const DLContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { updateOrders } = useContext(OrderContext);
  const { socket } = useContext(SocketContext);

  const orderCreated = (data = []) => {
    if (!["admin", "cashier", "waiter"].includes(user?.role)) {
      return;
    }

    if (user.role == "waiter") {
      data = data.filter((order) => order.waiterId == user.id);
      if (!data.length) return;
    }

    updateOrders(data);
  };

  useEffect(() => {
    socket.on("cE-order-created", orderCreated);

    return () => {
      socket.off("cE-order-created", orderCreated);
    };
  }, [user, socket]);

  const context = {};
  return <DLContext.Provider value={context}>{children}</DLContext.Provider>;
};

export default DLContextProvider;
