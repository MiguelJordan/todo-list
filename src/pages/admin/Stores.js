import { useContext, useState } from "react";

// components
import Dropdown from "../../components/subComponents/Dropdown";
import Search from "../../components/subComponents/Search";
import ItemList from "../../components/storeItems/ItemList";
import Fabs from "../../components/subComponents/Fabs";

// contexts
import { ItemContext } from "../../contexts/ItemContext";
import { TranslationContext } from "../../contexts/TranslationContext";

export default function Drinks() {
  const { t } = useContext(TranslationContext);
  const { items } = useContext(ItemContext);

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
  const [store, setStore] = useState("Unit");

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
          flexFlow: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "15px 0",
        }}
      >
        <Dropdown
          label="Store"
          values={["Central", "Unit"]}
          value={store}
          handleChange={setStore}
          sx={{ marginRight: "15px" }}
        />

        <Search onChange={setSearchVal} />
        <Fabs
          path="/admin/stores/item-add"
          sx={{ width: "45px", height: "45px", marginTop: "5px" }}
        />
      </div>
      <ItemList items={filterArray} role="admin" />
    </>
  );
}
