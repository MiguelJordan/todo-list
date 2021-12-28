import * as React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../../components/_layout/Layout";

import Bills from "./Bills";
import StaffList from "./Staff";
import AddStaff from "./Staff.add";
import StaffDetails from "./Staff.details";
import Stores from "./Stores";
import StoreDetails from "./Store.details";

const NotFound = React.lazy(() => import("../404"));

const mainLinks = [
  { text: "bills", path: "/admin" },
  { text: "staff", path: "/admin/staff" },
  { text: "staff_add", path: "/admin/staff/add" },
  // { text: "staff_details", path: "/admin/staff/:id" },
  { text: "stores", path: "/admin/stores" },
  // { text: "store_details", path: "/admin/store/:id" },
];

export default function Admin() {
  return (
    <Routes>
      <Route path="/" element={<Layout Main={Bills} links={mainLinks} />} />
      <Route
        path="/staff"
        element={<Layout Main={StaffList} links={mainLinks} />}
      />
      <Route
        path="/staff/add"
        element={<Layout Main={AddStaff} links={mainLinks} />}
      />
      <Route
        path="/staff/:id"
        element={<Layout Main={StaffDetails} links={mainLinks} />}
      />
      <Route
        path="/stores"
        element={<Layout Main={Stores} links={mainLinks} />}
      />
      <Route
        path="/store/:id"
        element={<Layout Main={StoreDetails} links={mainLinks} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
