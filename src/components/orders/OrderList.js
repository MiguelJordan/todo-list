import { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// components
import DateTime from "../subComponents/DateTime";
import DisplayField from "../subComponents/DisplayField";
import TimeAgo from "../subComponents/TimeAgo";
import PopOver from "../subComponents/PopOver";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { BackdropContext } from "../../contexts/feedback/BackdropContext";
import { NotificationContext } from "../../contexts/feedback/NotificationContext";
import { SocketContext } from "../../contexts/SocketContext";
import { TranslationContext } from "../../contexts/TranslationContext";

// functions
import { _delete } from "../../functions/http";
import queries from "../../functions/queries";

// icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeleteRounded } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    overflowY: "auto",
    flexWrap: "wrap",

    height: ({ role }) => {
      if (role === "admin") return "63vh";
      return "68vh";
    },
    [theme.breakpoints.up("sm")]: {
      height: "75vh",
    },
  },
  card: {
    color: "#B3B3B3",
    position: "relative",
    padding: "5px",
    paddingLeft: "15px",
    margin: "8px",
    width: "250px",
    height: "fit-content",
    backgroundColor: "hsl(214, 53%, 22%)",
    border: "3px solid #2B4362",
    borderRadius: "8px",
  },
  orderStatus: {
    position: "absolute",
    width: "5px",
    height: "90%",
    left: -1,
    top: "50%",
    transform: "translateY(-50%)",
    margin: 0,
    borderRadius: "0 5px 5px 0",
    // backgroundColor: "green",
    backgroundColor: "#2B4362",
  },
  orderPaid: { backgroundColor: "green" },
}));

export default function OrderList({ role = "", orders = [] }) {
  const { user } = useContext(AuthContext);
  const { toggleBackdrop } = useContext(BackdropContext);
  const { showNotification } = useContext(NotificationContext);
  const { sendEvent } = useContext(SocketContext);
  const { t } = useContext(TranslationContext);
  const classes = useStyles({ role });
  const navigate = useNavigate();

  const deleteOrder = async (order) => {
    if (!["admin", "waiter"].includes(user.role)) return;

    if (order.isPaid && user.role != "admin") {
      return showNotification({
        msg: t("server_err.Invalid operation"),
        color: "error",
      });
    }

    toggleBackdrop(true);

    const res = await _delete({
      url: "/orders",
      params: { companyCode: user.company.code, id: order.id },
    });

    toggleBackdrop(false);

    if (res.error) {
      return showNotification({
        msg: t(`server_err.${res.error}`),
        color: "error",
      });
    }

    // send order deleted event
    sendEvent({
      name: "cE-order-deleted",
      props: { id: order.id },
      rooms: [user.workUnit.code],
    });

    if (!order.isPaid && order.items.length) {
      // send order deleted event
      sendEvent({
        name: "cE-store-items-updated",
        props: {
          companyCode: user.company.code,
          query: queries["cE-store-items-updated"]({
            items: order.items.map((item) => item.name),
            storeId: user.workUnit.storeId,
          }),
        },
        rooms: [user.workUnit.code],
      });
    }

    return showNotification({
      msg: t("feedback.waiter.order deleted success"),
      color: "success",
    });
  };

  const viewOrderDetails = (e) => {
    navigate(`/waiter/orders/${e.id}`);
  };

  const WaiterPopMenu = [
    {
      name: "Supprimer",
      Icon: <DeleteRounded />,
      color: "#FF0000",
      action: (order) => deleteOrder(order),
    },
    {
      name: "Details",
      color: "#04A5E0",
      Icon: <InfoIcon />,
      action: (order) => viewOrderDetails(order),
    },
  ];
  const cashierPopMenu = [
    {
      name: "Details",
      color: "#04A5E0",
      Icon: <InfoIcon />,
      action: (order) => viewOrderDetails(order),
    },
  ];

  const AdminPopMenu = [
    {
      name: "Details",
      color: "#04A5E0",
      Icon: <InfoIcon />,
      action: (e) => viewOrderDetails(e),
    },
  ];

  return (
    <div className={classes.container}>
      {orders.length === 0 ? (
        <h2 style={{ marginTop: "100px" }}>No Order Found</h2>
      ) : (
        orders.map((order) => {
          return (
            <div className={classes.card} key={order.id}>
              <div
                className={`${classes.orderStatus} ${
                  order.isPaid ? classes.orderPaid : ""
                }`}
              />

              <div
                style={{
                  display: "flex",
                  flexFlow: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <DisplayField
                  value={
                    ["cashier", "waiter"].includes(role)
                      ? order.tableName
                      : `${order.waiter.name} (${order.waiter.id})`
                  }
                  sx={{
                    margin: 0,
                    padding: 0,
                    width: "45%",
                    color: "white",
                    fontSize: 18,
                    textAlign: "left",
                  }}
                />
                <div style={{ fontSize: 15 }}>
                  {dayjs(new Date()).diff(order.createdAt, "day") < 1 ? (
                    <TimeAgo date={order.createdAt} />
                  ) : (
                    <DateTime date={order.createdAt} />
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexFlow: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    {t("compo.order.items")}: {order.items.length}
                  </div>
                  <div>
                    Total:{" "}
                    {order.items.reduce((prev, next) => {
                      if (next.isOffer) return prev;
                      return (prev += next.quantity * next.price);
                    }, 0)}
                  </div>
                </div>

                {role === "waiter" ? (
                  <PopOver
                    items={WaiterPopMenu}
                    Icon={<MoreVertIcon />}
                    event={order}
                  />
                ) : role === "cashier" ? (
                  <PopOver
                    items={cashierPopMenu}
                    Icon={<MoreVertIcon />}
                    event={order}
                  />
                ) : (
                  <PopOver
                    items={AdminPopMenu}
                    Icon={<MoreVertIcon />}
                    event={order}
                  />
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
