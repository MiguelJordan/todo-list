import React, { useContext, useState } from "react";

import { ItemContext } from "../../contexts/ItemContext";

import { toBase64 } from "../../functions/data";

import AmForm from "../../components/subComponents/AmForm";

export default function ModifyStoreItem() {
  const { items } = useContext(ItemContext);

  const [item, setItem] = useState(items[8]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(item?.imageUrl);
  const [imageUrl, setImageUrl] = useState(item?.imageUrl);

  const AddImage = async (e) => {
    if (!e) return "";
    setError("");
    let file = e.target.files[0];

    const typeInfo = file.type.split("/"); // [mimeType ,extension]

    // validate type & extension
    if (
      typeInfo[0] !== "image" ||
      !["jpg", "png", "jpeg"].includes(typeInfo[1])
    ) {
      return setError("Invalid image - format");
    }

    // validate file size
    if (file.size > 5 * 1024 * 1024) {
      return setError("Invalid image - size too large");
    }

    let base64 = await toBase64(file);

    setImage(base64);
    setImageUrl(file);
  };

  const RemoveImage = () => {
    setImage(null);
    setImageUrl(null);
  };

  const validateItem = (item) => {
    item.name = item.name?.trim();
    if (!item.name) return { valid: false, message: "Invalid item name" };

    item.family = item.family?.trim();
    if (!item.family) return { valid: false, message: "Invalid family" };

    item.category = item.category?.trim();
    if (!item.category) return { valid: false, message: "Invalid category" };

    item.measureUnit = item.measureUnit?.trim();
    if (!item.measureUnit) {
      return { valid: false, message: "Invalid measure unit" };
    }

    item.measureUnitPlural = item.measureUnitPlural?.trim();
    if (!item.measureUnitPlural) {
      return { valid: false, message: "Invalid measure unit" };
    }

    if (isNaN(item.quantity) || item.quantity < 0) {
      return { valid: false, message: "Invalid quantity" };
    }
    item.quantity = Number(item.quantity);

    if (isNaN(item.cost) || item.cost < 0) {
      return { valid: false, message: "Invalid cost price" };
    }
    item.cost = Number(item.cost);

    if (isNaN(item.commission) || item.commission < 0) {
      return { valid: false, message: "Invalid commission" };
    }
    item.commission = Number(item.commission);

    if (isNaN(item.commissionRatio) || item.commissionRatio < 1) {
      return { valid: false, message: "Invalid commission ratio" };
    }
    item.commissionRatio = Number(item.commissionRatio);

    if (imageUrl) {
      item.imageUrl = imageUrl;
    } else {
      delete item?.imageUrl;
    }

    return { valid: true, validated: item };
  };

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
      AddImage={AddImage}
      RemoveImage={RemoveImage}
      error={error}
      loading={loading}
      setImage={setImage}
      setError={setError}
    />
  );
}
