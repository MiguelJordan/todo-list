import { useContext } from "react";
import { useParams, Navigate } from "react-router-dom";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";

// components
import OrderDetails from "../../components/orders/OrderDetails";

export default function OrderDetail() {
  const { user } = useContext(AuthContext);
  const { findOrder } = useContext(OrderContext);
  const { id } = useParams();

  const order = findOrder({ key: "id", value: id });

  if (!order) return <Navigate to={`/${user.role}/orders`} />;

  return <OrderDetails role="waiter" items={order?.items ?? []} />;
}
