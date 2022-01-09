import { useContext } from "react";

import { OrderContext } from "../../contexts/OrderContext";
import OrderDetails from "../../components/orders/OrderDetails";

import { useParams } from "react-router-dom";

export default function OrderDetail() {
  const { findOrder } = useContext(OrderContext);
  let { id } = useParams();
  const order = findOrder({ key: "id", value: id });

  return <OrderDetails role="waiter" items={order?.items ?? []} />;
}
