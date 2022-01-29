import * as React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../../components/_layout/Layout";

// items
import Items from "./items";

// orders
import Orders from "./orders";
import AddItems from "./orders/AddItems";
import AddOrder from "./orders/AddOrder";
import OrderDetails from "./orders/OrderDetails";

const NotFound = React.lazy(() => import("../404"));

const mainLinks = [
  { text: "items", path: "/waiter" },
  { text: "orders", path: "/waiter/orders" },
];

export default function Waiter() {
  return (
    <Routes>
      <Route path="/" element={<Layout Main={Items} links={mainLinks} />} />
      <Route
        path="/orders"
        element={<Layout Main={Orders} links={mainLinks} />}
      />
      <Route
        path="/orders/:id"
        element={<Layout Main={OrderDetails} links={mainLinks} />}
      />
      <Route
        path="/orders/:id/add-items"
        element={<Layout Main={AddItems} links={mainLinks} />}
      />
      <Route
        path="/orders/add"
        element={<Layout Main={AddOrder} links={mainLinks} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
