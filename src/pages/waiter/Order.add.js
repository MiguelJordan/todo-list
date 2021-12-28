import { useContext } from "react";
import { TrContext } from "../../contexts/TranslationContext";

export default function AddOrder() {
  const { t } = useContext(TrContext);

  return (
    <>
      <h1 className="center">{t("pages.waiter.orders")}</h1>
    </>
  );
}
