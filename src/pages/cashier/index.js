import * as React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../../components/_layout/Layout";

import Bills from "./Bills";
import BillDetails from "./Bill.details";
import Recovery from "./Recovery";

const NotFound = React.lazy(() => import("../404"));

const mainLinks = [
  { text: "bills", path: "/cashier" },
  // { text: "bill_details", path: "/cashier/:id" },
  { text: "Recovery", path: "/cashier/recovery" },
];

export default function Cashier() {
  return (
    <Routes>
      <Route path="/" element={<Layout Main={Bills} links={mainLinks} />} />
      <Route
        path="/recovery"
        element={<Layout Main={Recovery} links={mainLinks} />}
      />
      <Route
        path="/:id"
        element={<Layout Main={BillDetails} links={mainLinks} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
