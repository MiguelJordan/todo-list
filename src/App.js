import "./App.css";
import Router from "./components/Router";

// contexts
import AuthContexProvider from "./contexts/AuthContext";
import SocketContextProvider from "./contexts/SocketContext";
import ThemeContextProvider from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeContextProvider>
      <AuthContexProvider>
        <SocketContextProvider>
          <Router />
        </SocketContextProvider>
      </AuthContexProvider>
    </ThemeContextProvider>
  );
}

export default App;
