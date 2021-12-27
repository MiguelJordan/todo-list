import { useContext } from "react";
import { TrContext } from "../../contexts/TranslationContext";

export default function Drinks() {
  const { t } = useContext(TrContext);

  return (
    <>
      <h1 className="center">{t("List of Staff Members")}</h1>
    </>
  );
}
