import { useContext } from "react";
import { TrContext } from "../../contexts/TranslationContext";

export default function Drinks() {
  const { t } = useContext(TrContext);

  return (
    <>
      <h1>{t("pages.waiter.drinks")}</h1>
    </>
  );
}
