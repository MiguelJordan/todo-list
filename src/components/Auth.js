import { Navigate } from "react-router-dom";
import React from "react";
import { useContext } from "react";

// contexts
import { AuthContext } from "../contexts/AuthContext";

export default function Auth({ page, roles = [] }) {
  const { user } = useContext(AuthContext);

  // let go if user is auth & has rights
  if (user && roles.includes(user?.role)) return page;

  // if user is auth but no rights
  if (user) return <Navigate to={`/${user?.role ?? ""}`} />;

  // if user not logged in and page
  // is protected from logged in users
  // pages like login, sigin, etc.
  if (!roles.length) return page;

  // redirect to login otherwise
  return <Navigate to={"/login"} />;
}
