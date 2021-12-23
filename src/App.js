import "./App.css";
import Router from "./components/Router";

// contexts
import AuthContexProvider from "./contexts/AuthContext";
import SocketContextProvider from "./contexts/SocketContext";
//
function App() {
  return (
    <AuthContexProvider>
      <SocketContextProvider>
        <Router />
      </SocketContextProvider>
    </AuthContexProvider>
  );
}

export default App;
