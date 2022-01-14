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
export const DataLayerContext = createContext();

const DataLayerProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { updateItems } = useContext(ItemContext);
  const { removeOrder, updateOrders } = useContext(OrderContext);
  const { socket } = useContext(SocketContext);

  const createOrder = (_order) => {
    if (!["admin", "cashier", "waiter"].includes(user?.role)) {
      return;
    }

    if (user.role == "waiter") {
      if (_order.waiterId != user.id) return;
    }

    updateOrders([_order]);
  };

  const deleteOrder = (id) => (user ? removeOrder(id) : null);

  const updateStoreItems = (_items = []) => {
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
      _items = filter({ data: _items, criteria: "isBlocked", value: false });
      updateItems(_items);
    }
  };

  useEffect(() => {
    // orders
    socket.on("cE-order-created", createOrder);
    socket.on("cE-order-deleted", deleteOrder);

    // order items
    socket.on("cE-order-item-created", createOrder);

    // store items
    socket.on("cE-store-items-updated", updateStoreItems);

    return () => {
      // orders
      socket.off("cE-order-created", createOrder);
      socket.off("cE-order-deleted", deleteOrder);

      // order items
      socket.off("cE-order-item-created", createOrder);

      // store items
      socket.off("cE-store-items-updated", updateStoreItems);
    };
  }, [removeOrder, socket, updateItems, updateOrders, user]);

  const context = {};
  return (
    <DataLayerContext.Provider value={context}>
      {children}
    </DataLayerContext.Provider>
  );
};

export default DataLayerProvider;
