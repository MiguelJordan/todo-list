//import { Select } from "@mui/material";
import { useState } from "react";
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

  const list = {
    drinks: {
      whisky: [{ id: "1", name: "Label", prices: [1000, 2000], stock: 50 }],
      Beer: [
        {
          id: "2",
          name: "Castel",
          prices: [1000, 2000],
          stock: 50,
          image: "",
        },
        {
          id: "3",
          name: "Boster",
          prices: [1000, 1500],
          stock: 150,
          image: "",
        },
        {
          id: "6",
          name: "Castel",
          prices: [1000, 2000],
          stock: 50,
          image: "",
        },
        {
          id: "7",
          name: "Boster",
          prices: [1000, 1500],
          stock: 150,
          image: "",
        },
        {
          id: "8",
          name: "Castel",
          prices: [1000, 2000],
          stock: 50,
          image: "",
        },
        {
          id: "9",
          name: "Boster",
          prices: [1000, 1500],
          stock: 150,
          image: "",
        },
      ],
    },
  };

  return (
    <div style={{ maxHeight: "100%", justifyContent: "start" }}>
      <ItemList list={list} preview={false} role="waiter" />
    </div>
  );
}
