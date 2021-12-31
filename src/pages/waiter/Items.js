import { useContext } from "react";

// components
// import ItemList from "../../components/storeItems/ItemList";

// contexts
// import { AuthContext } from "../../contexts/AuthContext";
import { TrContext } from "../../contexts/TranslationContext";
import { ItemContext } from "../../contexts/ItemContext";

export default function Drinks() {
  // const { user } = useContext(AuthContext);
  const { t } = useContext(TrContext);
  const { items } = useContext(ItemContext);

  console.log(items);

  return (
    <>
      <h1 className="center">{t("pages.waiter.items")}</h1>
    </>
  );
}
