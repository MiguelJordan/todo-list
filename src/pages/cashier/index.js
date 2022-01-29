import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../../components/_layout/Layout";

import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import Recovery from "./Recovery";

const NotFound = React.lazy(() => import("../404"));

const mainLinks = [
  { text: "bills", path: "/cashier" },
  { text: "recovery", path: "/cashier/recovery" },
];

export default function Cashier() {
  return (
    <Routes>
      <Route path="/" element={<Layout Main={Orders} links={mainLinks} />} />
      <Route
        path="/orders/:id"
        element={<Layout Main={OrderDetails} links={mainLinks} />}
      />
      <Route
        path="/recovery"
        element={<Layout Main={Recovery} links={mainLinks} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
