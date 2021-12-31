// import { useState } from "react";
import { useContext } from "react";

// components
import ItemList from "../../components/storeItems/ItemList";

// contexts
// import { AuthContext } from "../../contexts/AuthContext";
import { TrContext } from "../../contexts/TranslationContext";
import { ItemContext } from "../../contexts/ItemContext";

export default function Items() {
  // const { user } = useContext(AuthContext);
  const { t } = useContext(TrContext);
  const { items } = useContext(ItemContext);

  console.log(items);

  return (
    // <div style={{ maxHeight: "100%", justifyContent: "start" }}>
    <ItemList list={items} preview={false} role="waiter" />
    // {/* </div> */}
  );
}
