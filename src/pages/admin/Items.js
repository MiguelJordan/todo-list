// import { useContext, useState } from "react";

// components
// import Dropdown from "../../components/subComponents/Dropdown";
// import Search from "../../components/subComponents/Search";
import ItemList from "../../components/storeItems/ItemList";
import Fabs from "../../components/subComponents/Fabs";

// contexts
// import { ItemContext } from "../../contexts/ItemContext";
// import { TranslationContext } from "../../contexts/TranslationContext";

export default function Items() {
  // const { t } = useContext(TranslationContext);
  // const { items } = useContext(ItemContext);

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
        {/* <Dropdown
          label="Store"
          values={["Central", "Unit"]}
          value={store}
          handleChange={setStore}
          sx={{ marginRight: "15px" }}
        /> */}

        {/* <Search onChange={setSearchVal} /> */}
        <Fabs
          path="/admin/items/add"
          sx={{ width: "45px", height: "45px", marginTop: "5px" }}
        />
      </div>
      <ItemList items={[]} role="admin" />
    </>
  );
}
