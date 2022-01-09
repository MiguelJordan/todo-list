import { useContext, useState } from "react";
import { TrContext } from "../../contexts/TranslationContext";
import { ItemContext } from "../../contexts/ItemContext";

import Dropdown from "../../components/subComponents/Dropdown";
import Search from "../../components/subComponents/Search";
import ItemList from "../../components/storeItems/ItemList";

export default function Drinks() {
  // const { t } = useContext(TrContext);
  //const { items } = useContext(ItemContext);

  const list = [
    { id: "1", name: "Castel", prices: [1000, 2000], quantity: 50 },
    { id: "2", name: "Boster", prices: [1000, 1500], quantity: 150 },
    { id: "3", name: "Guiness", prices: [1000, 2000], quantity: 50 },
    { id: "4", name: "Label", prices: [1000, 1500], quantity: 150 },
    { id: "5", name: "Black", prices: [1000, 2000], quantity: 50 },
    { id: "6", name: "Petit Guiness", prices: [1000, 1500], quantity: 150 },
    { id: "7", name: "One", prices: [1000, 2000], quantity: 50 },
    { id: "8", name: "Two", prices: [1000, 1500], quantity: 150 },
  ];

  const [searchVal, setSearchVal] = useState("");
  const [store, setStore] = useState("");

  const filterArray = [];

  list.filter((item) => {
    if (!searchVal) return filterArray.push(item);
    if (item.name.toLowerCase().includes(searchVal.toLowerCase().trim()))
      return filterArray.push(item);
    return "";
  });

  return (
    <>
      {/* <h1 className="center">{t("Stores Page")}</h1> */}

      <div
        style={{
          display: "flex",
          aligndts: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "15px 0",
          flexFlow: "column",
          alignItems: "center",
        }}
      >
        {/* <span>
          Family:{" "}
          <Dropdown
            values={families}
            onchange={(value) => setFam(value)}
            defaultVal={family}
          />
        </span> */}
        <span>
          Store:{" "}
          <Dropdown
            values={["Central", "Unit"]}
            onchange={setStore}
            defaultVal={""}
          />
        </span>
        <Search onChange={setSearchVal} />
      </div>
      <ItemList items={filterArray} role="admin" />
    </>
  );
}
