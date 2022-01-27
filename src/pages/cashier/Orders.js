import { useContext, useState } from "react";
import { IconButton } from "@mui/material";

// contexts
// import { TranslationContext } from "../../contexts/TranslationContext";
// import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";

//components
import OrderList from "../../components/orders/OrderList";
import Search from "../../components/subComponents/Search";
// import Dropdown from "../../components/subComponents/Dropdown";
// import PopUp from "../../components/subComponents/PopUp";

// functions
import useSearch from "../../hooks/useSearch";

//icon
import { FilterAlt } from "@mui/icons-material";

export default function Bills() {
  // const { t } = useContext(TranslationContext);
  // const { user } = useContext(AuthContext);
  const { orders } = useContext(OrderContext);

  const { filtered, setSearchVal } = useSearch({
    data: orders,
    criteria: "waiterId",
  });

  // const [waiterList, setWaiterList] = useState([]);

  // const paymentMethods = [...user.workUnit.paymentMethods, "NOT PAID"];

  // useEffect(() => {
  //   const waiters = [];
  //   orders.forEach((order) => {
  //     if (!waiterList.includes(order.waiterName)) waiters.push(order);
  //   });

  //   setWaiterList(waiters);
  // }, [orders]);

  // const [waiter, setWaiter] = useState(waiterList[0] ?? "");
  // const [payment, setPayment] = useState(paymentMethods[0] ?? "");
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const filtered = orders.filter((order) => {
  //     if (payment === "NOT PAID") {
  //       if (
  //         !order.isPaid &&
  //         (!searchVal ||
  //           order.tableName
  //             .toLowerCase()
  //             .includes(searchVal.toLowerCase().trim()))
  //       )
  //         return true;
  //     }
  //     if (
  //       order.paymentMethods.includes(payment) &&
  //       (!searchVal ||
  //         order.tableName
  //           .toLowerCase()
  //           .includes(searchVal.toLowerCase().trim()))
  //     )
  //       return true;
  //     return false;
  //   });

  //   setOrders(filtered);
  // }, [orders, searchVal, payment, waiter]);

  return (
    <>
      {/* <PopUp open={open} close={setOpen}>
        <div style={{ display: "flex", marginLeft: "-20px" }}>
          <Dropdown
            label="Waiter"
            values={waiterList}
            value={waiter}
            handleChange={setWaiter}
          />

          <Dropdown
            label="Payment"
            value={payment}
            values={paymentMethods}
            handleChange={setPayment}
          />
        </div>
      </PopUp> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "25px",
        }}
      >
        <Search onChange={setSearchVal} />
        <IconButton
          onClick={() => setOpen(true)}
          style={{ marginLeft: "10px" }}
        >
          <FilterAlt style={{ color: "#9e9e9e" }} />
        </IconButton>
      </div>

      <OrderList orders={filtered} />
    </>
  );
}
