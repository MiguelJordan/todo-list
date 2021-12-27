import { useContext } from "react";
import { TrContext } from "../../contexts/TranslationContext";

export default function Bills() {
  const { t } = useContext(TrContext);

  return (
    <>
      <h1 className="center">{t("Admin's Bills")}</h1>
    </>
  );
}