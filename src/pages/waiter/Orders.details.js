import { useContext } from "react";

import { OrderContext } from "../../contexts/OrderContext";
import OrderDetails from "../../components/orders/OrderDetails";

import { useParams } from "react-router-dom";

export default function OrderDetail() {
  const { findOrder } = useContext(OrderContext);
  let { id } = useParams();

  const order = findOrder({ key: "id", value: id });

  let filterList = {};

  if (order) {
    const items = order.items;

    const families = [];

    items.filter((item) => {
      if (!families.includes(item.family)) families.push(item.family);
    });

    families.map((fam) => {
      filterList = { ...filterList, [fam]: [] };
    });

    items.map((item) => {
      filterList[item.family].push(item);
    });

    console.log(order);
  }

  return <OrderDetails role="waiter" list={filterList} />;
}
