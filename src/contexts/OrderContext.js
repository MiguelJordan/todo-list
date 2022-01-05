import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getUnique } from "../functions/data";
import { get } from "../functions/http";

const apiUrl = process.env.REACT_APP_API_URL;

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  const getOrders = async () => {
    let query = {
      companyCode: user.company.code,
      unitCode: user.workUnit.code,
    };

    if (user.role == "admin") {
      query = { ...query, date: true, source: "unit", startTime: new Date() };
    } else if (user.role == "cashier") {
      query = { ...query, date: true, source: "unit", startTime: new Date() };
    } else if (user.role == "waiter") {
      query = {
        ...query,
        date: true,
        source: "waiter",
        startTime: new Date(),
        waiterId: user.id,
      };
    }

    const _orders = await get(apiUrl + "/orders", query);

    if (_orders?.error) return console.log(_orders?.error);
    console.log("Orders", _orders);

    setOrders(_orders);
  };

  const updateOrders = (data = []) => {
    setOrders(getUnique([...orders, ...data]));
  };

  const findOrder = ({ key = "id", value = "" }) => {
    return orders.find((order) => order[key] == value);
  };

  useEffect(() => {
    if (!["admin", "waiter"].includes(user?.role)) return;
    // if (!["admin", "cashier", "waiter"].includes(user?.role)) return;
    getOrders();
  }, [user]);

  const context = { orders, findOrder, updateOrders };
  return (
    <OrderContext.Provider value={context}>{children}</OrderContext.Provider>
  );
};

export default OrderContextProvider;
