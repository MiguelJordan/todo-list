import "./App.css";
import Router from "./components/Router";

// contexts
import AuthProvider from "./contexts/AuthContext";
import DataLayerProvider from "./contexts/DataLayerContext";
import ItemProvider from "./contexts/ItemContext";
import OrderProvider from "./contexts/OrderContext";
import SocketProvider from "./contexts/SocketContext";
import ThemeProvider from "./contexts/ThemeContext";
import TranslationProvider from "./contexts/TranslationContext";

// feedbacks
import BackdropProvider from "./contexts/feedback/BackdropContext";
import NotificationProvider from "./contexts/feedback/NotificationContext";

function App() {
  return (
    <TranslationProvider>
      <NotificationProvider>
        <BackdropProvider>
          <ThemeProvider>
            <AuthProvider>
              <SocketProvider>
                <OrderProvider>
                  <ItemProvider>
                    <DataLayerProvider>
                      <Router />
                    </DataLayerProvider>
                  </ItemProvider>
                </OrderProvider>
              </SocketProvider>
            </AuthProvider>
          </ThemeProvider>
        </BackdropProvider>
      </NotificationProvider>
    </TranslationProvider>
  );
}

export default App;
