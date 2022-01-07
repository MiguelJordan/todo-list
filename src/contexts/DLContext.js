import { createContext, useContext, useEffect } from "react";

import { AuthContext } from "./AuthContext";
import { OrderContext } from "./OrderContext";
import { SocketContext } from "./SocketContext";
import { ItemContext } from "./ItemContext";

// data layer context to handle
// client state/context data to be
// updated in realtime
export const DLContext = createContext();

const DLContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { updateItems } = useContext(ItemContext);
  const { updateOrders } = useContext(OrderContext);
  const { socket } = useContext(SocketContext);

  const orderCreated = (_order) => {
    if (!["admin", "cashier", "waiter"].includes(user?.role)) {
      return;
    }

    if (user.role == "waiter") {
      if (_order.waiterId != user.id) return;
    }

    updateOrders([_order]);
  };

  const storeItemUpdated = (_item) => {
    if (!["admin", "waiter"].includes(user?.role)) {
      return;
    }

    if (user.role == "admin") {
      // group data by stores
      // if (!data.length) return;
      return;
      // updateAdminStore(_items)
    }

    if (user.role == "waiter") {
      if (_item.isBlocked) return;
      updateItems([_item]);
    }
  };

  useEffect(() => {
    // orders
    socket.on("cE-order-created", orderCreated);

    // order items
    socket.on("cE-order-item-created", orderCreated);

    // store items
    socket.on("cE-store-item-updated", storeItemUpdated);

    return () => {
      // orders
      socket.off("cE-order-created", orderCreated);

      // order items
      socket.on("cE-order-item-created", orderCreated);

      // store items
      socket.off("cE-store-item-updated", storeItemUpdated);
    };
  }, [user, updateItems, updateOrders, socket]);

  const context = {};
  return <DLContext.Provider value={context}>{children}</DLContext.Provider>;
};

export default DLContextProvider;
