import * as React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../../components/_layout/Layout";

import Items from "./Items";
import Orders from "./Orders";
import AddItems from "./Items.add";
import OrderDetail from "./Orders.details";

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
        path="/orders/add/:id"
        element={<Layout Main={AddItems} links={mainLinks} />}
      />
      <Route
        path="/orders/detail/:id"
        element={<Layout Main={OrderDetail} links={mainLinks} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
