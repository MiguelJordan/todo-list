import { useContext } from "react";
import { TrContext } from "../../contexts/TranslationContext";

import OrderDetails from "../../components/orders/OrderDetails";

export default function BillDetail() {
  const { t } = useContext(TrContext);

  return (
    <>
      <OrderDetails role="admin" list={[]} />
    </>
  );
}
