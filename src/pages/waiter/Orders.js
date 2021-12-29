import { Select, TextField } from "@mui/material";
import { useContext } from "react";
import { TrContext } from "../../contexts/TranslationContext";

export default function Orders() {
  const { t } = useContext(TrContext);

  return (
    <>
      <h1 className="center">{t("pages.waiter.orders")}</h1>
    </>
  );
}
