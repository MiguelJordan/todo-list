import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();
const apiUrl = process.env.REACT_APP_API_URL;

const SocketContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const _user = user
    ? {
        companyCode: user.company.code,
        id: user.id,
        role: user.role,
        unitCode: user.workUnit.code,
      }
    : null;

  const [socket] = useState(
    io(apiUrl, { transports: ["websocket", "polling"] })
  );

  const [socketConnected, setSocketConnected] = useState(false);

  const connectE = () => {
    console.log("connectE", user, socket);
    if (user && !socketConnected) {
      socket.emit("register", _user);
      // socket.emit("_clientEvent", {
      //   event: "_cE-presence",
      //   props: { ..._user, source: "company" },
      //   rooms: [_user.companyCode],
      // });
    }
  };

  // this is to attempt registration immediately user logs in
  useEffect(() => {
    if (user) {
      socket.connect();
      connectE();
    } else {
      socket.close();
    }
    // console.log("uE", user, socket);
  }, [socket, user]);

  const connectErrorE = (data) => {
    // console.log("Connection error:", data);
  };

  const disconnectE = () => {
    console.log("Disconnected");
    setSocketConnected(false);
  };

  const registeredE = (data) => {
    setSocketConnected(true);
    // console.log("Registration:", data);
  };

  useEffect(() => {
    socket.on("_cE-test-orders", (data) => console.log("_cE-orders", data));

    socket.on("_cE-test-users", (data) => console.log("_cE-users", data));

    socket.on("connect", connectE);

    socket.on("connect_error", connectErrorE);

    socket.on("disconnect", disconnectE);

    socket.on("registered", registeredE);

    return () => {
      socket.off("connect", connectE);

      socket.off("connect_error", connectErrorE);

      socket.off("disconnect", disconnectE);

      socket.off("registered", registeredE);
    };
  }, [socket]);

  const context = { socket, socketConnected };

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
