import React, { useContext, useState } from "react";

// components
import AmForm from "../../components/subComponents/AmForm";

// contexts
import { ItemContext } from "../../contexts/ItemContext";

// functions
import { AddImage, RemoveImage, validateItem } from "../../functions/data";

export default function ModifyStoreItem() {
  const { items } = useContext(ItemContext);

  const [item, setItem] = useState(items[8]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(item?.imageUrl);
  const [imageUrl, setImageUrl] = useState(item?.imageUrl);

  const imageAdd = (e) => AddImage(e, setError, setImage, setImageUrl);

  const imageRemove = () => RemoveImage(setImage, setImageUrl);

  const handleSubmit = (item) => {
    setError("");

    const { valid, validated, message } = validateItem(item, imageUrl);

    if (!valid) return setError(message);

    console.log(item);
  };

  console.log(items);
  return (
    <AmForm
      storeItem={item}
      modify={true}
      image={image}
      handleSubmit={handleSubmit}
      AddImage={imageAdd}
      RemoveImage={imageRemove}
      error={error}
      loading={loading}
      setImage={setImage}
      setError={setError}
    />
  );
}
