import { createContext, useContext, useEffect, useState } from "react";

// contexts
import { AuthContext } from "./AuthContext";
import { get } from "../functions/http";

// functions
import { getList, getUnique } from "../functions/data";

export const ItemContext = createContext();

const ItemProvider = ({ children }) => {
  const [families, setFams] = useState([]);
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);

  const getItems = async () => {
    let query = {};

    if (user?.role === "admin") {
      query = {
        companyCode: user.company.code,
        query: JSON.stringify({
          storeId: { $in: [user.workUnit.storeId, user.company.storeId] },
        }),
      };
    } else {
      query = {
        companyCode: user.company.code,
        query: JSON.stringify({
          $and: [{ storeId: user.workUnit.storeId }, { isBlocked: false }],
        }),
      };
    }

    const _items = await get({ url: "/storeItems", params: query });

    if (_items?.error) return console.log(_items?.error);
    // console.log("Store items", _items);
    const _families = getList({ data: _items, criteria: "family" }).sort(
      (a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1)
    );
    // console.log("Families", _families);
    setItems(_items);
    setFams(_families);
  };

  const updateItems = (_items = []) => {
    setItems(getUnique({ data: [...items, ..._items] }));
  };

  useEffect(() => {
    if (!["admin", "waiter"].includes(user?.role)) return;
    getItems();
  }, [user]);

  const context = { families, items, updateItems };
  return (
    <ItemContext.Provider value={context}>{children}</ItemContext.Provider>
  );
};

export default ItemProvider;
