import { useContext, useState, useEffect } from "react";

// contexts
//import { TrContext } from "../../contexts/TranslationContext";
import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";

//components
import OrderList from "../../components/orders/OrderList";
import Search from "../../components/subComponents/Search";
import Dropdown from "../../components/subComponents/Dropdown";

export default function Bills() {
  // const { t } = useContext(TrContext);
  const { user } = useContext(AuthContext);
  const { orders } = useContext(OrderContext);
  const [_orders, setOrders] = useState([]);
  const [waiterList, setWaiterList] = useState([]);

  const paymentMethods = [...user.workUnit.paymentMethods, "NOT PAID"];

  useEffect(() => {
    const waiters = [];
    orders.map((order) => {
      if (!waiterList.includes(order.waiterName)) waiters.push(order);
    });

    setWaiterList(waiters);
  }, [orders]);

  const [waiter, setWaiter] = useState(waiterList[0] ?? "");
  const [payment, setPayment] = useState(paymentMethods[0] ?? "");
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const filtered = orders.filter((order) => {
      if (payment === "NOT PAID") {
        if (
          !order.isPaid &&
          (!searchVal ||
            order.tableName
              .toLowerCase()
              .includes(searchVal.toLowerCase().trim()))
        )
          return true;
      }
      if (
        order.paymentMethods.includes(payment) &&
        (!searchVal ||
          order.tableName
            .toLowerCase()
            .includes(searchVal.toLowerCase().trim()))
      )
        return true;
      return false;
    });

    setOrders(filtered);
  }, [orders, searchVal, payment, waiter]);

  return (
    <>
      {/* <h1 className="center">{t("Cashier's Bills")}</h1> */}

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
        <Dropdown
          label="Waiter"
          values={waiterList}
          value={waiter}
          handleChange={setWaiter}
        />

        <Dropdown
          label="Paymennt"
          value={payment}
          values={paymentMethods}
          handleChange={setPayment}
        />
        <Search onChange={setSearchVal} />
      </div>

      <OrderList array={_orders} role="cashier" />
    </>
  );
}
