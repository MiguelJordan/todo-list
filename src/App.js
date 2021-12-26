import "./App.css";
import Router from "./components/Router";

// contexts
import AuthContexProvider from "./contexts/AuthContext";
import SocketContextProvider from "./contexts/SocketContext";
import ThemeContextProvider from "./contexts/ThemeContext";
import TrCProvider from "./contexts/TranslationContext";

function App() {
  return (
    <TrCProvider>
      <ThemeContextProvider>
        <AuthContexProvider>
          <SocketContextProvider>
            <Router />
          </SocketContextProvider>
        </AuthContexProvider>
      </ThemeContextProvider>
    </TrCProvider>
  );
}

export default App;
