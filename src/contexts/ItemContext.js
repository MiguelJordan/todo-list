import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { get } from "../functions/http";
import { groupData } from "../functions/data";

const apiUrl = process.env.REACT_APP_API_URL;

export const ItemContext = createContext();

const ItemContexProvider = ({ children }) => {
  const [items, setItems] = useState({});
  const { user } = useContext(AuthContext);

  const getItems = async () => {
    const _items = await get(apiUrl + "/storeItems", {
      companyCode: user.company.code,
      storeId: user.workUnit.storeId,
      query: JSON.stringify({}),
    });

    if (_items?.error) return console.log(_items?.error);

    const fams = [...new Set(_items.map((item) => item.family))];
    const data = fams.reduce((obj, fam) => {
      obj[fam] = groupData({
        criteria: "category",
        data: _items,
        filters: [{ name: "family", value: fam }],
      });
      return obj;
    }, {});

    setItems(data);
  };

  useEffect(() => {
    console.log("Item Context");
    getItems();
  }, [user]);

  const context = { items };
  return (
    <ItemContext.Provider value={context}>{children}</ItemContext.Provider>
  );
};

export default ItemContexProvider;
