import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../../components/_layout/Layout";

// items
import AddItem from "./items/AddItem";
import Items from "./items";
import EditItem from "./items/EditItem";

// orders
import Orders from "./orders";
import OrderDetails from "./orders/OrderDetails";

const NotFound = React.lazy(() => import("../404"));

const mainLinks = [
  { text: "bills", path: "/admin" },
  { text: "items", path: "/admin/items" },
];

export default function Admin() {
  return (
    <Routes>
      <Route path="/" element={<Layout Main={Orders} links={mainLinks} />} />
      <Route
        path="/orders/:id"
        element={<Layout Main={OrderDetails} links={mainLinks} />}
      />
      <Route
        path="/items"
        element={<Layout Main={Items} links={mainLinks} />}
      />
      <Route
        path="/items/add"
        element={<Layout Main={AddItem} links={mainLinks} />}
      />
      <Route
        path="/items/edit/:id"
        element={<Layout Main={EditItem} links={mainLinks} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
