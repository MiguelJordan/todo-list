import { createContext, useContext, useEffect } from "react";

// contexts
import { AuthContext } from "./AuthContext";
import { OrderContext } from "./OrderContext";
import { SocketContext } from "./SocketContext";
import { ItemContext } from "./ItemContext";

// functions
import { filter } from "../functions/data";

// data layer context to handle
// client state/context data to be
// updated in realtime
export const DLContext = createContext();

const DLContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { updateItems } = useContext(ItemContext);
  const { removeOrder, updateOrders } = useContext(OrderContext);
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

  const orderDeleted = (id) => removeOrder(id);

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

  const storeItemsUpdated = (_items = []) => {
    _items.forEach((item) => storeItemUpdated(item));
  };

  useEffect(() => {
    // orders
    socket.on("cE-order-created", orderCreated);
    socket.on("cE-order-deleted", orderDeleted);

    // order items
    socket.on("cE-order-item-created", orderCreated);

    // store items
    socket.on("cE-store-item-updated", storeItemUpdated);
    socket.on("cE-store-items-updated", storeItemsUpdated);

    return () => {
      // orders
      socket.off("cE-order-created", orderCreated);
      socket.off("cE-order-deleted", orderDeleted);

      // order items
      socket.off("cE-order-item-created", orderCreated);

      // store items
      socket.off("cE-store-item-updated", storeItemUpdated);
      socket.off("cE-store-items-updated", storeItemsUpdated);
    };
  }, [removeOrder, socket, user, updateItems, updateOrders]);

  const context = {};
  return <DLContext.Provider value={context}>{children}</DLContext.Provider>;
};

export default DLContextProvider;
