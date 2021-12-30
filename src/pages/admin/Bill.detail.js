import { useContext } from "react";
import { TrContext } from "../../contexts/TranslationContext";

import OrderDetails from "../../components/orders/OrderDetails";

export default function BillDetail() {
  const { t } = useContext(TrContext);

  const lists = {
    repas: [
      {
        id: "5",
        name: "Ndole",
        quantity: 1,
        price: 3000,
        total: 3000,
        category: "Dejeuner",
        measureUnit: "plat",
      },
      {
        id: "6",
        name: "Riz",
        quantity: 1,
        price: 1000,
        total: 1000,
        category: "Dejeuner",
        measureUnit: "plat",
      },
    ],
  };

  return (
    <>
      <OrderDetails role="admin" list={lists} />
    </>
  );
}
