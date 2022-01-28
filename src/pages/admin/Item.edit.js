import React, { useContext } from "react";
import { useParams, Navigate } from "react-router-dom";

// components
import AmForm from "../../components/subComponents/AmForm";

// contexts
import { ItemContext } from "../../contexts/ItemContext";

// functions
import { findElement } from "../../functions/data";

export default function EditItem() {
  const { items } = useContext(ItemContext);

  const { id } = useParams();

  const item = findElement({ data: items, key: "id", value: id });

  return item ? (
    <AmForm storeItem={item} modify={true} />
  ) : (
    <Navigate to={"/admin/items"} />
  );
}
