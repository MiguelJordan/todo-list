import { useContext } from "react";
import { useParams, Navigate } from "react-router-dom";

// components
import OrderDetails from "../../components/orders/OrderDetails";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";

// functions
import { findElement } from "../../functions/data";

const getOrderRoute = (role = "") => {
  if (role === "admin") return "/admin";
  if (role === "cashier") return "/cashier";
  if (role === "waiter") return "/waiter/orders";
  return "/orders";
};

export default function OrderDetail() {
  const { user } = useContext(AuthContext);
  const { orders } = useContext(OrderContext);
  const { id } = useParams();

  const order = findElement({ data: orders, key: "id", value: id });

  if (!order) return <Navigate to={getOrderRoute(user.role)} />;

  return <OrderDetails order={order} />;
}
