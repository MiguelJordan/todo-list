import React, { useContext, useState } from "react";
import { useParams, Navigate } from "react-router-dom";

// components
import AmForm from "../../components/subComponents/AmForm";

// contexts
import { ItemContext } from "../../contexts/ItemContext";

// functions
import { findElement, toBase64 } from "../../functions/data";

export default function EditItem() {
  const { items } = useContext(ItemContext);

  const { id } = useParams();

  const item = findElement({ data: items, key: "id", value: id });

  if (!item) return <Navigate to={"/admin/items"} />;

  return (
    <AmForm
      storeItem={item}
      modify={true}
      image={""}
      handleSubmit={() => {}}
      AddImage={() => {}}
      RemoveImage={() => {}}
      error={""}
      loading={false}
      setImage={() => {}}
      setError={() => {}}
    />
  );
}
