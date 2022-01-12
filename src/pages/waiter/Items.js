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

export default function Items({ orderId, preview = false }) {
  // const { user } = useContext(AuthContext);
  const { t } = useContext(TrContext);
  const { families, items } = useContext(ItemContext);
  const [searchVal, setSearchVal] = useState("");

  const [family, setFam] = useState(families[0] ?? "");

  const [data, setData] = useState(
    groupData({ data: items, criteria: "family" })
  );

  const [categories, setCats] = useState(
    getList({ data: data[family], criteria: "category" }).sort((a, b) =>
      a.toLowerCase() < b.toLowerCase() ? -1 : 1
    ) ?? []
  );
  const [category, setCat] = useState(categories[0] ?? "");

  const [_items, setItems] = useState(
    filter({ data: data[family], criteria: "category", value: category }).sort(
      (a, b) => (a.name < b.name ? -1 : 1)
    )
  );

  const [f_items, setFItems] = useState(_items);

  const updateFam = (value) => {
    if (!families.includes(value)) value = families[0];
    setFam(value);
  };

  const updateCat = (value) => {
    if (!categories.includes(value)) value = categories[0];
    setCat(value);
  };

  useEffect(() => {
    if (!families.includes(family)) {
      setFam(families[0]);
    }
  }, [family, families]);

  useEffect(() => {
    setData(groupData({ data: items, criteria: "family" }));
  }, [family, items]);

  useEffect(() => {
    setCats(
      getList({ data: data[family], criteria: "category" }).sort((a, b) =>
        a.toLowerCase() < b.toLowerCase() ? -1 : 1
      )
    );
  }, [data, family]);

  useEffect(() => {
    if (!categories.includes(category)) {
      setCat(categories[0]);
    }
  }, [category, categories]);

  useEffect(() => {
    if (category && family) {
      setItems(
        filter({
          data: data[family],
          criteria: "category",
          value: category,
        }).sort((a, b) => (a.name < b.name ? -1 : 1))
      );
    }
  }, [category, data, family]);

  useEffect(() => {
    const filtered = _items.filter((item) => {
      if (!searchVal) return true;
      if (item.name.toLowerCase().includes(searchVal.toLowerCase().trim())) {
        return true;
      }
      return false;
    });

    setFItems(filtered);
  }, [_items, searchVal]);

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
          value={family}
          values={families}
          handleChange={updateFam}
        />
        <Dropdown
          label={t("pages.waiter.items.dropdown.categories")}
          labelId="waiter-items-categories"
          value={category}
          values={categories}
          handleChange={updateCat}
        />
        <Search onChange={setSearchVal} />
      </div>
      <ItemList
        items={f_items}
        role="waiter"
        orderId={orderId}
        preview={preview}
      />
    </>
  );
}
