import { createContext, useState } from "react";

// functions
import { get, post } from "../functions/http";

// hooks
import useStorage from "../hooks/useStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storage = useStorage();
  const [user, setUser] = useState(storage.get("user"));

  const removeUser = () => {
    storage.remove("user");
    setUser(null);
  };

  const saveUser = (data) => {
    storage.set("user", data);
    setUser(data);
  };

  const updateUser = (updates) => {
    let newUser = { ...user, ...updates };
    storage.set("user", newUser);
    setUser(newUser);
  };

  const login = async (credentials) => {
    let res;

    try {
      const data = await post({
        url: "/accounts/login",
        body: credentials,
      });

      if (data.error) throw new Error(data.error);

      saveUser(data);

      res = data;
    } catch (err) {
      res = { error: err.message };
    }

    return res;
  };

  const logout = async () => {
    let res;

    try {
      const data = await get({ url: "/accounts/logout" });

      if (data.success) removeUser();
      res = data;
    } catch (err) {
      res = { error: err.message };
    }

    return res;
  };

  const context = { user, login, logout, updateUser };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
