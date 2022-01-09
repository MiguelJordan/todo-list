import "./App.css";
import Router from "./components/Router";

// contexts
import AuthContextProvider from "./contexts/AuthContext";
import DLContextProvider from "./contexts/DLContext";
import ItemContexProvider from "./contexts/ItemContext";
import NTContextProvider from "./contexts/NTContext";
import OrderContextProvider from "./contexts/OrderContext";
import SocketContextProvider from "./contexts/SocketContext";
import StoreContextProvider from "./contexts/StoreContext";
import ThemeContextProvider from "./contexts/ThemeContext";
import TrCProvider from "./contexts/TranslationContext";

function App() {
  return (
    <NTContextProvider>
      <TrCProvider>
        <ThemeContextProvider>
          <AuthContextProvider>
            <SocketContextProvider>
              <StoreContextProvider>
                <OrderContextProvider>
                  <ItemContexProvider>
                    <DLContextProvider>
                      <Router />
                    </DLContextProvider>
                  </ItemContexProvider>
                </OrderContextProvider>
              </StoreContextProvider>
            </SocketContextProvider>
          </AuthContextProvider>
        </ThemeContextProvider>
      </TrCProvider>
    </NTContextProvider>
  );
}

export default App;
