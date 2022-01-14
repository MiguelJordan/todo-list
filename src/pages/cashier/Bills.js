import { useContext, useState } from "react";

// components
import Dropdown from "../../components/subComponents/Dropdown";
import OrderList from "../../components/orders/OrderList";
import Search from "../../components/subComponents/Search";

// contexts
import { TranslationContext } from "../../contexts/TranslationContext";

export default function Bills() {
  const { t } = useContext(TranslationContext);

  const list = {
    Anne: [
      {
        id: "1",
        tableName: "1",
        createdDate: "2021-12-28",
        drink: 10000,
        waiterN: "Anne",
        isPaid: true,
        paymentMethod: ["MOMO"],
      },
      {
        id: "7",
        tableName: "7",
        isPaid: true,
        createdDate: "2021-12-20",
        drink: 10000,
        waiterN: "Anne",
        paymentMethod: ["OM", "MOMO"],
      },
      {
        id: "5",
        tableName: "5",
        isPaid: true,
        createdDate: "2021-12-18",
        drink: 10000,
        waiterN: "Anne",
        paymentMethod: ["OM"],
      },
      {
        id: "6",
        tableName: "6",
        isPaid: true,
        createdDate: "2021-12-19",
        drink: 10000,
        waiterN: "Anne",
        paymentMethod: ["OM", "Cash"],
      },
    ],
    Michelle: [
      {
        id: "4",
        tableName: "4",
        createdDate: "2021-12-31",
        drink: 10000,
        waiterN: "Michelle",
        paymentMethod: ["OM"],
        isPaid: true,
      },
    ],
    Jacob: [
      {
        id: "2",
        tableName: "2",
        isPaid: true,
        createdDate: "2021-12-29",
        drink: 10000,
        waiterN: "Jacob",
        paymentMethod: ["OM"],
      },
      {
        id: "8",
        tableName: "8",
        isPaid: true,
        createdDate: "2021-12-29",
        drink: 10000,
        waiterN: "Jacob",
        paymentMethod: ["Cash"],
      },
    ],
    Jack: [
      {
        id: "3",
        tableName: "3",
        isPaid: true,
        createdDate: "2021-12-30",
        drink: 10000,
        waiterN: "Jack",
        paymentMethod: ["OM"],
      },
    ],
  };

  const paymentMethods = ["Cash", "OM", "MOMO", "Not Paid"];

  const waiterList = Object.keys(list);

  const [waiter, setWaiter] = useState(waiterList[0]);
  const [payment, setPayment] = useState(paymentMethods[0]);
  const [searchVal, setSearchVal] = useState("");

  const filterArray = [];

  list[waiter].filter((Bill) => {
    if (payment === "Not Paid") {
      if (
        !Bill.isPaid &&
        (!searchVal ||
          Bill.tableName.toLowerCase().includes(searchVal.toLowerCase().trim()))
      )
        filterArray.push(Bill);
    }
    if (
      Bill.paymentMethod.includes(payment) &&
      (!searchVal ||
        Bill.tableName.toLowerCase().includes(searchVal.toLowerCase().trim()))
    )
      filterArray.push(Bill);
  });

  return (
    <>
      {/* <h1 className="center">{t("Cashier's Bills")}</h1> */}

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <span>
          <label> Waiter: </label>
          <Dropdown values={waiterList} onchange={setWaiter} />
        </span>
        <span>
          <label>Payment: </label>
          <Dropdown values={paymentMethods} onchange={setPayment} />
        </span>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <Search onChange={setSearchVal} />
      </div>

      <OrderList array={filterArray} role="cashier" />
    </>
  );
}
