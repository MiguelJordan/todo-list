import { useContext } from "react";
import { TranslationContext } from "../../contexts/TranslationContext";

export default function Drinks() {
  const { t } = useContext(TranslationContext);

  return (
    <>
      <h1 className="center">{t("Store Details Page")}</h1>
    </>
  );
}
