import { useContext, useState } from "react";
import OrderList from "../../components/orders/OrderList";
// import { TrContext } from "../../contexts/TranslationContext";
import { OrderContext } from "../../contexts/OrderContext";

// components
import Search from "../../components/subComponents/Search";
// import AddOrder from "../../components/orders/AddOrder";
// import Fabs from "../../components/subComponents/Fabs";

export default function Bills() {
  // const { t } = useContext(TrContext);
  const { orders } = useContext(OrderContext);

  const [searchVal, setSearchVal] = useState();

  const filterArray = [];

  orders.filter((val) => {
    if (!searchVal) return filterArray.push(val);
    if (val.waiter.name.toLowerCase().includes(searchVal.toLowerCase().trim()))
      return filterArray.push(val);
    return "";
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
      </div>

      <OrderList array={filterArray} role="admin" />

      {/* <Fabs Element={<AddOrder />} /> */}
    </>
  );
}
