import React, { useState, useContext } from "react";

// components
import AmForm from "../../components/subComponents/AmForm";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { TranslationContext } from "../../contexts/TranslationContext";

// functions
import { toBase64 } from "../../functions/data";

export default function StoreAdd() {
  const { t } = useContext(TranslationContext);
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState();

  const [item, setItem] = useState({
    name: "Beejs",
    family: "Drinks",
    category: "Castel",
    cost: "1000",
    prices: [],
    commissionAmount: "50",
    commissionRatio: "1",
    companyCode: user.company.code,
    storeId: user.workUnit.storeId,
    quantity: "50",
    measureUnitPlural: "",
    measureUnit: "Bottle",
    isBlocked: false,
  });

  const handleSubmit = (e, item) => {
    e.preventDefault();
    setError("");

    if (!item.name) return setError(t("_errors.Invalid item name"));

    if (!item.family) return setError(t("_errors.Invalid family"));

    if (!item.category) return setError(t("_errors.Invalid category"));

    if (!item.measureUnit) return setError(t("_errors.Invalid measure unit"));

    if (!item.measureUnitPlural) {
      return setError(t("_errors.Invalid measure unit"));
    }

    if (item.quantity < 0) return setError(t("_errors.Invalid quantity"));

    if (item.cost < 0) return setError(t("_errors.Invalid cost price"));

    if (item.commissionAmount < 0) {
      return setError(t("_errors.Invalid commission amount"));
    }

    if (item.commissionRatio < 1) {
      return setError(t("_errors.Invalid commission ratio"));
    }

    setLoading(true);

    setLoading(false);
    console.log(item);
  };

  const AddImage = async (e) => {
    if (!e) return "";
    setError("");
    let file = e.target.files[0];

    const typeInfo = file.type.split("/"); // [mimeType ,extension]

    // validate type & extension
    if (
      typeInfo[0] != "image" ||
      !["jpg", "png", "jpeg"].includes(typeInfo[1])
    ) {
      return setError(t("_errors.Invalid image format"));
    }

    // validate file size
    if (file.size > 5 * 1024 * 1024) {
      return setError(t("_errors.Invalid image size too large"));
    }

    let base64 = await toBase64(file);

    setImage(base64);

    return file;
  };

  const RemoveImage = () => setImage(null);

  //console.log(image);

  return (
    <AmForm
      target="storeItems"
      handleSubmit={handleSubmit}
      image={image}
      item={item}
      AddImage={AddImage}
      RemoveImage={RemoveImage}
      loading={loading}
      error={error}
    />
  );
}
