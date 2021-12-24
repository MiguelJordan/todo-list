import { Route, Routes } from "react-router-dom";

import Layout from "../../components/_layout/Layout";

import Drinks from "./Drinks";
import Orders from "./Orders";

const mainLinks = [
  { text: "Drinks", path: "/waiter/" },
  { text: "Orders", path: "/waiter/orders" },
  { text: "Yoyo", path: "/waiter/orders" },
];

export default function Waiter() {
  return (
    <Routes>
      <Route path="/" element={<Layout Main={Drinks} links={mainLinks} />} />
      <Route
        path="/orders"
        element={<Layout Main={Orders} links={mainLinks} />}
      />
    </Routes>
  );
}
