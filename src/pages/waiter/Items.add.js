import { useContext } from "react";
import { useParams, Navigate } from "react-router-dom";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";

import Items from "./Items";

export default function AddItems() {
  const { user } = useContext(AuthContext);
  const { findOrder } = useContext(OrderContext);
  const { id } = useParams();

  const order = findOrder({ key: "id", value: id });

  if (!order) return <Navigate to={`/${user.role}/orders`} />;

  return <Items orderId={id} preview={false} />;
}
