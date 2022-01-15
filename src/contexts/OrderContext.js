import { createContext, useContext, useEffect, useState } from "react";

// contexts
import { AuthContext } from "./AuthContext";

// functions
import { filter, getUnique, getPeriod } from "../functions/data";
import { get } from "../functions/http";

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  const getQuery = () => {
    let req = { companyCode: user.company.code };

    if (user.role == "admin") {
      return { ...req, date: true, source: "unit", startTime: new Date() };
    }

    if (user.role == "cashier") {
      return { ...req, date: true, source: "unit", startTime: new Date() };
    }

    if (user.role == "waiter") {
      // const { startTime, stopTime } = getPeriod({ useDistance: true });

      return {
        ...req,
        // query: JSON.stringify({ createdAt: { $gt: startTime, $lt: stopTime } }),
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

export default OrderProvider;
