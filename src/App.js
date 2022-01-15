import "./App.css";
import Router from "./components/Router";

// contexts
import AuthProvider from "./contexts/AuthContext";
import DataLayerProvider from "./contexts/DataLayerContext";
import ItemProvider from "./contexts/ItemContext";
import OrderProvider from "./contexts/OrderContext";
import SocketProvider from "./contexts/SocketContext";
import StoreProvider from "./contexts/StoreContext";
import ThemeProvider from "./contexts/ThemeContext";
import TranslationProvider from "./contexts/TranslationContext";

// feedbacks
import BackdropProvider from "./contexts/feedback/BackdropContext";
import NotificationProvider from "./contexts/feedback/NotificationContext";

function App() {
  return (
    <NotificationProvider>
      <BackdropProvider>
        <TranslationProvider>
          <ThemeProvider>
            <AuthProvider>
              <SocketProvider>
                <StoreProvider>
                  <OrderProvider>
                    <ItemProvider>
                      <DataLayerProvider>
                        <Router />
                      </DataLayerProvider>
                    </ItemProvider>
                  </OrderProvider>
                </StoreProvider>
              </SocketProvider>
            </AuthProvider>
          </ThemeProvider>
        </TranslationProvider>
      </BackdropProvider>
    </NotificationProvider>
  );
}

export default App;
