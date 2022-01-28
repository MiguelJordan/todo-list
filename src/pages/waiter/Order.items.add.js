import { useContext } from "react";
import { useParams, Navigate } from "react-router-dom";

// components
import Items from "./Items";

// contexts
import { OrderContext } from "../../contexts/OrderContext";

// functions
import { findElement } from "../../functions/data";

export default function AddOrderItems() {
  const { orders } = useContext(OrderContext);
  const { id } = useParams();

  const order = findElement({ data: orders, key: "id", value: id });

  if (!order) return <Navigate to={"/waiter/orders"} />;

  return <Items orderId={id} orderItems={order.items} preview={false} />;
}
