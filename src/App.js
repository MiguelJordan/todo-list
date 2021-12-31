import "./App.css";
import Router from "./components/Router";

// contexts
import AuthContexProvider from "./contexts/AuthContext";
import ItemContexProvider from "./contexts/ItemContext";
import OrderContexProvider from "./contexts/OrderContext";
import SocketContextProvider from "./contexts/SocketContext";
import StoreContexProvider from "./contexts/StoreContext";
import ThemeContextProvider from "./contexts/ThemeContext";
import TrCProvider from "./contexts/TranslationContext";

function App() {
  return (
    <TrCProvider>
      <ThemeContextProvider>
        <AuthContexProvider>
          <SocketContextProvider>
            <StoreContexProvider>
              <OrderContexProvider>
                <ItemContexProvider>
                  <Router />
                </ItemContexProvider>
              </OrderContexProvider>
            </StoreContexProvider>
          </SocketContextProvider>
        </AuthContexProvider>
      </ThemeContextProvider>
    </TrCProvider>
  );
}

export default App;
