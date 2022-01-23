import { createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

// const apiUrl = process.env.REACT_APP_API_URL;

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  // const [stores, setStores] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // console.log("Store Context", user);
  }, [user]);

  const context = {};
  return (
    <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
