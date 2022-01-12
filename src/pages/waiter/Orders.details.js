import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";
import OrderDetails from "../../components/orders/OrderDetails";

import { useParams } from "react-router-dom";

export default function OrderDetail() {
  const { user } = useContext(AuthContext);
  const { findOrder } = useContext(OrderContext);
  let { id } = useParams();

  const order = findOrder({ key: "id", value: id });

  if (!order) return <Navigate to={`/${user.role}/orders`} />;

  return <OrderDetails role="waiter" items={order?.items ?? []} />;
}
