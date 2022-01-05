import { createContext, useState } from "react";

import { get, post } from "../functions/http";

const apiUrl = process.env.REACT_APP_API_URL;

export const AuthContext = createContext();

const loadUser = () => JSON.parse(localStorage.getItem("user"));

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(loadUser);

  const saveUser = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const removeUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const login = async (credentials) => {
    let res;

    try {
      const data = await post({
        url: `${apiUrl}/accounts/login`,
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
      const data = await get({ url: `${apiUrl}/accounts/logout` });

      if (data.success) removeUser();
      res = data;
    } catch (err) {
      res = { error: err.message };
    }

    return res;
  };

  const context = { user, login, logout };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
