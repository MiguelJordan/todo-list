import { useContext } from "react";
import { TrContext } from "../../contexts/TranslationContext";

import OrderDetails from "../../components/orders/OrderDetails";

export default function BillDetails() {
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
      {/* <h1 className="center">{t("Bill Details")}</h1> */}

      <OrderDetails
        role="cashier"
        list={lists}
        methods={["OM", "MOMO", "CASH"]}
        point={["Snack", "Cabaret"]}
      />
    </>
  );
}
