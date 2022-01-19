import { useContext } from "react";

// components
import OrderList from "../../components/orders/OrderList";
import Search from "../../components/subComponents/Search";
import Fabs from "../../components/subComponents/Fabs";

// contexts
import { OrderContext } from "../../contexts/OrderContext";

// hooks
import useSearch from "../../hooks/useSearch";

export default function Orders() {
  const { orders } = useContext(OrderContext);
  const { filtered, setSearchVal } = useSearch({
    data: orders,
    criteria: "tableName",
  });

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
        <Fabs
          path="/waiter/orders/add"
          sx={{ width: "40px", height: "40px" }}
        />
      </div>

      <OrderList orders={filtered} role="waiter" />
    </>
  );
}
