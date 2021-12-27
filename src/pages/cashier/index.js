import * as React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../../components/_layout/Layout";

import Bills from "./Bills";
import BillDetails from "./Bill.details";

const NotFound = React.lazy(() => import("../404"));

const mainLinks = [
  { text: "bills", path: "/cashier" },
  // { text: "bill_details", path: "/cashier/:id" },
];

export default function Cashier() {
  return (
    <Routes>
      <Route path="/" element={<Layout Main={Bills} links={[]} />} />
      <Route path="/:id" element={<Layout Main={BillDetails} links={[]} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
