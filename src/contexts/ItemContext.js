import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const apiUrl = process.env.REACT_APP_API_URL;

export const ItemContext = createContext();

const ItemContexProvider = ({ children }) => {
  const [items, setItems] = useState({});
  const { user } = useContext(AuthContext);

  const context = {};
  return (
    <ItemContext.Provider value={context}>{children}</ItemContext.Provider>
  );
};

export default ItemContexProvider;
