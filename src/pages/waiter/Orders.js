import { useContext } from "react";
import OrderList from "../../components/orders/OrderList";
import { TrContext } from "../../contexts/TranslationContext";
import { useState } from "react";

import AddOrder from "../../components/orders/AddOrder";
import Fabs from "../../components/subComponents/Fabs";

export default function Drinks() {
  const { t } = useContext(TrContext);

  const list = [
    {
      id: "1",
      tableN: "1",
      createdDate: "2021-12-28",
      drink: 10000,
      waiterN: "Anne",
      paymentMethod: ["MOMO"],
    },
    {
      id: "2",
      tableN: "2",
      createdDate: "2021-12-29",
      drink: 10000,
      waiterN: "Jacob",
      paymentMethod: ["OM"],
    },
    {
      id: "3",
      tableN: "3",
      createdDate: "2021-12-30",
      drink: 10000,
      waiterN: "Jack",
      paymentMethod: ["OM"],
    },
    {
      id: "4",
      tableN: "4",
      createdDate: "2021-12-31",
      drink: 10000,
      waiterN: "Michelle",
      paymentMethod: ["OM"],
    },
    {
      id: "5",
      tableN: "5",
      createdDate: "2021-12-18",
      drink: 10000,
      waiterN: "Anne",
      paymentMethod: ["OM"],
    },
    {
      id: "6",
      tableN: "6",
      createdDate: "2021-12-19",
      drink: 10000,
      waiterN: "Anne",
      paymentMethod: ["OM", "CASH"],
    },
    {
      id: "7",
      tableN: "7",
      createdDate: "2021-12-20",
      drink: 10000,
      waiterN: "Anne",
      paymentMethod: ["OM", "MOMO"],
    },
  ];

  return (
    <div>
      {/* <h1 className="center">{t("pages.waiter.orders")}</h1> */}

      <OrderList array={list} role="waiter" />

      <Fabs Element={<AddOrder />} />
    </div>
  );
}
