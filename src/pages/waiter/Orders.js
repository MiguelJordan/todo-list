import { useContext, useState } from "react";
import OrderList from "../../components/orders/OrderList";
// import { TrContext } from "../../contexts/TranslationContext";
import { OrderContext } from "../../contexts/OrderContext";

// components
import Search from "../../components/subComponents/Search";
import Fabs from "../../components/subComponents/Fabs";

export default function Orders() {
  // const { t } = useContext(TrContext);
  const { orders } = useContext(OrderContext);

  const [searchVal, setSearchVal] = useState();

  const filterArray = [];

  orders.filter((val) => {
    if (!searchVal) return filterArray.push(val);
    if (val.tableName.toLowerCase().includes(searchVal.toLowerCase().trim()))
      return filterArray.push(val);
    return "";
  });

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

      <OrderList array={filterArray} role="waiter" />

      <Fabs path="/waiter/orders/add" />
    </>
  );
}
