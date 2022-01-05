import { useContext } from "react";
import { Button } from "@mui/material";

import { ArrowBack } from "@mui/icons-material";

import { TrContext } from "../../contexts/TranslationContext";
import { OrderContext } from "../../contexts/OrderContext";

import OrderDetails from "../../components/orders/OrderDetails";

import { useParams, useNavigate } from "react-router-dom";

export default function OrderDetail() {
  const { t } = useContext(TrContext);
  const { findOrder } = useContext(OrderContext);
  let { id } = useParams();

  const navigate = useNavigate();

  const order = findOrder({ key: "id", value: id });
  const items = order.items;

  const families = [];
  let filterList = {};

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

  return (
    <>
      {/* <h1 className="center">{t("pages.waiter.orders")}</h1> */}
      <div
        style={{
          display: "flex",
          marginTop: "10px",
          position: "relative",

          justifyContent: "flex-start",
        }}
      >
        <Button onClick={() => navigate("/waiter/orders")}>
          <ArrowBack />
        </Button>
        <span style={{ marginTop: "12px" }}>{"Toutes les Commandes"}</span>
      </div>

      <hr
        width="100%"
        color="gray"
        height="2"
        style={{
          height: 0.1,
          //marginLeft: "5%",
          //marginRight: "10%",
        }}
      />

      <OrderDetails role="waiter" list={filterList} />
    </>
  );
}
