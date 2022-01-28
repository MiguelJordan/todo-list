import { useContext } from "react";
import { useParams, Navigate } from "react-router-dom";

// components
import OrderDetails from "../../components/orders/OrderDetails";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";

const getOrderRoute = (role = "") => {
  if (role === "admin") return "/admin";
  if (role === "cashier") return "/cashier";
  if (role === "waiter") return "/waiter/orders";
  return "/orders";
};

export default function OrderDetail({ role = "waiter" }) {
  const { user } = useContext(AuthContext);
  const { findOrder } = useContext(OrderContext);
  const { id } = useParams();

  const order = findOrder({ key: "id", value: id });

  if (!order) return <Navigate to={getOrderRoute(user.role)} />;

  return <OrderDetails order={order} role={role} />;
}
