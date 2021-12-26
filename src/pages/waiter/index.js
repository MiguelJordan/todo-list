import * as React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../../components/_layout/Layout";

import Drinks from "./Drinks";
import Orders from "./Orders";

const NotFound = React.lazy(() => import("../404"));

const mainLinks = [
  { text: "Drinks", path: "/waiter" },
  { text: "Orders", path: "/waiter/orders" },
  // { text: "Yoyo", path: "/wankiter/ordersgsn" },
];

export default function Waiter() {
  return (
    <Routes>
      <Route path="/" element={<Layout Main={Drinks} links={mainLinks} />} />
      <Route
        path="/orders"
        element={<Layout Main={Orders} links={mainLinks} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
