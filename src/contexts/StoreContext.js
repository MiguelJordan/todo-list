import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const apiUrl = process.env.REACT_APP_API_URL;

export const StoreContext = createContext();

const StoreContexProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const { user } = useContext(AuthContext);

  const context = {};
  return (
    <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
  );
};

export default StoreContexProvider;
