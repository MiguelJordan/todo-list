import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { get } from "../functions/http";

// functions
import { getList } from "../functions/data";

const apiUrl = process.env.REACT_APP_API_URL;

export const ItemContext = createContext();

const ItemContexProvider = ({ children }) => {
  const [families, setFams] = useState([]);
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);

  const getItems = async () => {
    const query = {
      companyCode: user.company.code,
      storeId: user.workUnit.storeId,
      query: JSON.stringify({ isBlocked: false }),
    };

    const _items = await get({ url: `${apiUrl}/storeItems`, params: query });

    if (_items?.error) return console.log(_items?.error);
    console.log("Store items", _items);
    const _families = getList({ data: _items, criteria: "family" });
    console.log("Families", _families);
    setItems(_items);
    setFams(_families);
  };

  useEffect(() => {
    if (user?.role != "waiter") return;
    getItems();
  }, [user]);

  const context = { families, items };
  return (
    <ItemContext.Provider value={context}>{children}</ItemContext.Provider>
  );
};

export default ItemContexProvider;
