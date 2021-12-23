import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// route guard
import Auth from "./Auth";

// components
// const Cashier = React.lazy(() => import("../Routes/cashierRoute"));
const Home = React.lazy(() => import("../pages/home"));
const NotFound = React.lazy(() => import("../pages/404"));
const Login = React.lazy(() => import("../pages/login"));
const Waiter = React.lazy(() => import("../pages/waiter"));

export default function Router(props) {
  return (
    <BrowserRouter forceRefresh={false}>
      <div className="App">
        <React.Suspense fallback={<p>Loading</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Auth page={<Login />} roles={[]} />}
            />
            <Route
              path="/waiter/*"
              element={<Auth page={<Waiter />} roles={["waiter"]} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </div>
    </BrowserRouter>
  );
}
