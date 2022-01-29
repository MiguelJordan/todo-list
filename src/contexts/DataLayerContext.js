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

  const _updateOrders = (order) => {
    if (!["admin", "cashier", "waiter"].includes(user?.role)) {
      return;
    }

    if (user.role === "waiter") {
      if (order.waiterId !== user.id) return;
    }
    // console.log(order);

    updateOrders([order]);
  };

  const deleteOrder = (id) => (user ? removeOrder(id) : null);

  const _updateItems = (_items = []) => {
    if (!["admin", "waiter"].includes(user?.role)) {
      return;
    }

    console.log("Updated items:", _items);

    updateItems(_items);
  };

  useEffect(() => {
    // items
    socket.on("cE-store-items-updated", _updateItems);

    // orders
    socket.on("cE-order-deleted", deleteOrder);
    socket.on("cE-order-updated", _updateOrders);

    return () => {
      // orders
      socket.off("cE-order-deleted", deleteOrder);
      socket.off("cE-order-updated", _updateOrders);

      // store items
      socket.off("cE-store-items-updated", _updateItems);
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
