import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../../components/_layout/Layout";

import Orders from "./Orders";
import OrderDetails from "./Order.details";
import AddItem from "./Item.add";
import Items from "./Items";
import EditItem from "./Item.edit";

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
      {/* <Route
        path="/staff/add"
        element={<Layout Main={AddStaff} links={mainLinks} />}
      />
      <Route
        path="/staff/:id"
        element={<Layout Main={StaffDetails} links={mainLinks} />}
      /> */}
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
      {/* <Route
        path="/store/:id"
        element={<Layout Main={StoreDetails} links={mainLinks} />}
      /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
