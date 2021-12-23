import { createContext, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export const AuthContext = createContext();

const loadUser = () => JSON.parse(localStorage.getItem("user"));

const AuthContexProvider = ({ children }) => {
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
    try {
      const data = await (
        await fetch(apiUrl + "/accounts/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        })
      ).json();

      if (!data.error) saveUser(data);

      return data;
    } catch (err) {
      return { error: err.message };
    }
  };

  const logout = async () => {
    const res = await (await fetch(apiUrl + "/accounts/logout")).json();

    if (res.success) removeUser();
    return res;
  };

  const context = { user, login, logout };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContexProvider;
