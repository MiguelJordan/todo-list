import { useContext } from "react";
import { TrContext } from "../../contexts/TranslationContext";

export default function BillDetails() {
  const { t } = useContext(TrContext);

  return (
    <>
      <h1 className="center">{t("Bill Details")}</h1>
    </>
  );
}
