import { useContext, useEffect, useState } from "react";

// components
import Dropdown from "../../../components/subComponents/Dropdown";
import ItemList from "../../../components/storeItems/ItemList";
import Search from "../../../components/subComponents/Search";

// contexts
import { ItemContext } from "../../../contexts/ItemContext";
import { TranslationContext } from "../../../contexts/TranslationContext";

// functions
import { filter, getList, groupData } from "../../../functions/data";

// hooks
import useSearch from "../../../hooks/useSearch";

export default function Items({ orderId, orderItems, preview = true }) {
  const { t } = useContext(TranslationContext);
  const { families, items } = useContext(ItemContext);

  const [familiesToShow, setFamiliesToShow] = useState(
    families.sort((a, b) => (a < b ? -1 : 1))
  );

  const [family, setFam] = useState(familiesToShow[0] ?? "");

  const [orderedNames, setOrderedNames] = useState(
    getList({ data: orderItems, criteria: "name" })
  );

  const [itemsToShow, setItemsToShow] = useState(items);

  const [data, setData] = useState(
    groupData({ data: itemsToShow, criteria: "family" })
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

  const { filtered, setSearchVal } = useSearch({
    data: _items,
    criteria: "name",
  });

  const updateFam = (value) => {
    if (!familiesToShow.includes(value)) value = familiesToShow[0];
    setFam(value);
  };

  const updateCat = (value) => {
    if (!categories.includes(value)) value = categories[0];
    setCat(value);
  };

  useEffect(() => {
    setFamiliesToShow(families.sort((a, b) => (a < b ? -1 : 1)));
  }, [families]);

  useEffect(() => {
    const _orderedNames = getList({ data: orderItems, criteria: "name" });
    setOrderedNames(_orderedNames);
  }, [orderItems]);

  useEffect(() => {
    let _itemsToShow = orderedNames.reduce((prev, itemName) => {
      prev = filter({
        data: prev,
        criteria: "name",
        value: itemName,
        exclude: true,
      });
      return prev;
    }, items);

    setItemsToShow(_itemsToShow);

    const newFams = getList({ data: _itemsToShow, criteria: "family" });
    if (newFams.length !== familiesToShow.length) setFamiliesToShow(newFams);
  }, [items, familiesToShow, orderedNames]);

  useEffect(() => {
    if (!familiesToShow.includes(family)) {
      setFam(familiesToShow[0]);
    }
  }, [family, familiesToShow]);

  useEffect(() => {
    setData(groupData({ data: itemsToShow, criteria: "family" }));
  }, [family, itemsToShow]);

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

  return (
    <>
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        <Dropdown
          translated={true}
          label={t("pages.waiter.items.dropdown.families")}
          labelId="waiter-items-families"
          value={family}
          values={familiesToShow}
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
      <ItemList items={filtered} orderId={orderId} preview={preview} />
    </>
  );
}
