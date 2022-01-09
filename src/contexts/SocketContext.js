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
    if (user && !socketConnected) socket?.emit("register", _user);
  };

  // this is to attempt registration immediately user logs in
  useEffect(() => {
    if (!user) {
      socket?.close();
      setSocketConnected(false);
    }
  }, [socket, user]);

  const connectErrorE = (data) => {
    // console.log("Connection error:", data);
  };

  const disconnectE = () => {
    setSocketConnected(false);
    console.log("Disconnected");
  };

  const registeredE = (data) => {
    setSocketConnected(true);
    console.log("Connected");
    // console.log("Registration:", data);
  };

  useEffect(() => {
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

  const sendEvent = ({ name = "", props = {}, rooms = [] }) => {
    if (!socketConnected || !name || !rooms.length) return;
    // console.log("event:", { name, props, rooms });
    return socket.emit("_clientEvent", { name, props, rooms });
  };

  const context = { socket, socketConnected, sendEvent };

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
