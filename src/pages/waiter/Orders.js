import { useContext, useEffect, useState } from "react";
import OrderList from "../../components/orders/OrderList";
// import { TrContext } from "../../contexts/TranslationContext";
import { OrderContext } from "../../contexts/OrderContext";

// components
import Search from "../../components/subComponents/Search";
import AddOrderForm from "../../components/orders/AddOrder";
import Fabs from "../../components/subComponents/Fabs";

export default function Orders() {
  // const { t } = useContext(TrContext);
  const { orders } = useContext(OrderContext);

  const [searchVal, setSearchVal] = useState();

  const [_orders, setOrders] = useState([]);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      if (!searchVal) return true;
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
      {/* <h1 className="center">{t("pages.waiter.orders")}</h1> */}
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

      <OrderList array={_orders} role="waiter" />

      <Fabs Element={<AddOrderForm />} />
    </>
  );
}
