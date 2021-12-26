import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const apiUrl = process.env.REACT_APP_API_URL;

export const OrderContext = createContext();

const OrderContexProvider = ({ children }) => {
  const [orders, setOrders] = useState({});
  const { user } = useContext(AuthContext);

  const context = {};
  return (
    <OrderContext.Provider value={context}>{children}</OrderContext.Provider>
  );
};

export default OrderContexProvider;
