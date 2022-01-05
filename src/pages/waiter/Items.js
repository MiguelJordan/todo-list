import { useContext, useEffect, useState } from "react";

// components
import ItemList from "../../components/storeItems/ItemList";
import Search from "../../components/subComponents/Search";
import Dropdown from "../../components/subComponents/Dropdown";

// contexts
// import { AuthContext } from "../../contexts/AuthContext";
import { TrContext } from "../../contexts/TranslationContext";
import { ItemContext } from "../../contexts/ItemContext";

// functions
import { filter, getList, groupData } from "../../functions/data";

export default function Items() {
  // const { user } = useContext(AuthContext);
  const { t } = useContext(TrContext);
  const { items } = useContext(ItemContext);
  const [searchVal, setSearchVal] = useState("");

  const [families] = useState(getList({ data: items, criteria: "family" }));
  const [family, setFam] = useState(families[0] ?? "");

  const data = groupData({ data: items, criteria: "family" });

  const [categories, setCats] = useState(
    getList({ data: data[family], criteria: "category" })
  );
  const [category, setCat] = useState(categories[0]);

  const [_items, setItems] = useState(
    filter({ data: data[family], criteria: "category", value: category })
  );

  const filterArray = [];

  _items.filter((val) => {
    if (!searchVal) return filterArray.push(val);
    if (val.name.toLowerCase().includes(searchVal.toLowerCase().trim()))
      return filterArray.push(val);
    return "";
  });

  useEffect(() => {
    setCats(getList({ data: data[family], criteria: "category" }));
  }, [family]);

  useEffect(() => {
    setItems(
      filter({ data: data[family], criteria: "category", value: category })
    );
  }, [category]);

  useEffect(() => {
    setCat(categories[0]);
  }, [categories]);

  return (
    <>
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
          translated={true}
          label={t("pages.waiter.items.dropdown.families")}
          labelId="waiter-items-families"
          values={families}
          onchange={(value) => setFam(value)}
        />
        <Dropdown
          label={t("pages.waiter.items.dropdown.categories")}
          labelId="waiter-items-categories"
          values={categories}
          onchange={(value) => setCat(value)}
        />
        <Search onChange={setSearchVal} />
      </div>
      <ItemList items={filterArray} role="waiter" />
    </>
  );
}
