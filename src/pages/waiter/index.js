import * as React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../../components/_layout/Layout";

import Items from "./Items";
import Orders from "./Orders";

const NotFound = React.lazy(() => import("../404"));

const mainLinks = [
  { text: "items", path: "/waiter" },
  { text: "orders", path: "/waiter/orders" },
  // { text: "Yoyo", path: "/wankiter/ordersgsn" },
];

export default function Waiter() {
  return (
    <Routes>
      <Route path="/" element={<Layout Main={Items} links={mainLinks} />} />
      <Route
        path="/orders"
        element={<Layout Main={Orders} links={mainLinks} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
