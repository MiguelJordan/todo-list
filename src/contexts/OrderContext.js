import { createContext, useContext, useEffect, useState } from "react";

// contexts
import { AuthContext } from "./AuthContext";

// functions
import { filter, getPeriod, getUnique } from "../functions/data";
import { get } from "../functions/http";

export const OrderContext = createContext();

const getBaseQuery = (user) => {
  if (["admin", "cashier", "waiter"].includes(user?.role)) {
    const { start, stop } = getPeriod({ useDistance: true });

    let _query = {};
    // let _query = { createdAt: { $gt: start, $lt: stop } };

    if (user.role === "admin" && user.orderQuery) _query = user.orderQuery;

    return {
      companyCode: user.company.code,
      query: JSON.stringify(_query),
    };
  }

  return null;
};

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState(getBaseQuery(user));

  const getOrders = async () => {
    if (!["admin", "cashier", "waiter"].includes(user?.role)) return;

    const _orders = await get({ url: "/orders", params: query });

    if (_orders?.error) return console.log(_orders?.error);

    setOrders(_orders);
  };

  const makeQuery = ({ _start, _stop }) => {
    const { start, stop } = getPeriod({
      start: _start,
      stop: _stop,
      useDistance: _stop ? true : false,
    });

    let _query = { createdAt: { $gt: start, $lt: stop } };

    return {
      companyCode: user?.company?.code,
      query: JSON.stringify(_query),
    };
  };

  const removeOrder = (id) => {
    setOrders(
      filter({ data: orders, criteria: "id", value: id, exclude: true })
    );
  };

  const updateOrders = (_orders = []) => {
    setOrders(getUnique({ data: [...orders, ..._orders] }));
  };

  useEffect(() => getOrders(), [query]);

  const context = {
    orders,
    makeQuery,
    removeOrder,
    setQuery,
    updateOrders,
  };
  return (
    <OrderContext.Provider value={context}>{children}</OrderContext.Provider>
  );
};

export default OrderProvider;
