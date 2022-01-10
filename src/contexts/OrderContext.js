import { createContext, useContext, useEffect, useState } from "react";

// contexts
import { AuthContext } from "./AuthContext";

// functions
import { filter, getUnique } from "../functions/data";
import { get } from "../functions/http";

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  const getQuery = () => {
    let query = {
      companyCode: user.company.code,
      unitCode: user.workUnit.code,
    };

    if (user.role == "admin") {
      return { ...query, date: true, source: "unit", startTime: new Date() };
    }

    if (user.role == "cashier") {
      return { ...query, date: true, source: "unit", startTime: new Date() };
    }

    if (user.role == "waiter") {
      return {
        ...query,
        // date: true,
        source: "waiter",
        // startTime: new Date(),
        waiterId: user.id,
      };
    }
  };

  const getOrders = async () => {
    const query = getQuery();

    const _orders = await get({ url: "/orders", params: query });

    if (_orders?.error) return console.log(_orders?.error);
    // console.log("Orders", _orders);

    setOrders(_orders);
  };

  const findOrder = ({ key = "id", value = "" }) => {
    return orders.find((order) => order[key] === value);
  };

  const removeOrder = (id) => {
    setOrders(
      filter({ data: orders, criteria: "id", value: id, exclude: true })
    );
  };

  const updateOrders = (_orders = []) => {
    setOrders(getUnique({ data: [...orders, ..._orders] }));
  };

  useEffect(() => {
    if (!["waiter"].includes(user?.role)) return;
    // if (!["admin", "cashier", "waiter"].includes(user?.role)) return;
    getOrders();
  }, [user]);

  const context = { orders, findOrder, removeOrder, updateOrders };
  return (
    <OrderContext.Provider value={context}>{children}</OrderContext.Provider>
  );
};

export default OrderContextProvider;
