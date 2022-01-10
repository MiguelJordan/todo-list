import { useContext, useEffect, useState } from "react";

// components
import OrderList from "../../components/orders/OrderList";
import Search from "../../components/subComponents/Search";
import Fabs from "../../components/subComponents/Fabs";

// contexts
import { OrderContext } from "../../contexts/OrderContext";

export default function Orders() {
  const { orders } = useContext(OrderContext);

  const [searchVal, setSearchVal] = useState("");

  const [_orders, setOrders] = useState([]);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      if (!searchVal?.trim()) return true;
      if (
        order.tableName.toLowerCase().includes(searchVal.toLowerCase().trim())
      ) {
        return true;
      }
      return false;
    });

    setOrders(filtered);
  }, [orders, searchVal]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "15px 0",
        }}
      >
        <Search onChange={setSearchVal} />
      </div>

      <OrderList orders={_orders} role="waiter" />

      <Fabs path="/waiter/orders/add" />
    </>
  );
}
