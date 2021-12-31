import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { get } from "../functions/http";

const apiUrl = process.env.REACT_APP_API_URL;

export const ItemContext = createContext();

const ItemContexProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);

  const getItems = async () => {
    const _items = await get(apiUrl + "/storeItems", {
      companyCode: user.company.code,
      storeId: user.workUnit.storeId,
      query: JSON.stringify({ isBlocked: false }),
    });

    if (_items?.error) return console.log(_items?.error);

    setItems(_items);
  };

  useEffect(() => {
    if (user?.role == "waiter") getItems();
  }, [user]);

  const context = { items };
  return (
    <ItemContext.Provider value={context}>{children}</ItemContext.Provider>
  );
};

export default ItemContexProvider;
