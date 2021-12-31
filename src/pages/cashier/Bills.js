import { useContext } from "react";
import OrderDetails from "../../components/orders/OrderDetails";
import { TrContext } from "../../contexts/TranslationContext";

export default function Bills() {
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
      {/* <h1 className="center">{t("Cashier's Bills")}</h1> */}

      <OrderDetails
        role="cashier"
        list={lists}
        methods={["OM", "MOMO", "CASH", "AUCUN"]}
        point={["Snack", "Cabaret"]}
      />
    </>
  );
}
