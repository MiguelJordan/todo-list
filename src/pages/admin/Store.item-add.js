import React, { useState, useContext } from "react";

// components
import AmForm from "../../components/subComponents/AmForm";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
// import { TranslationContext } from "../../contexts/TranslationContext";

// functions
import { toBase64 } from "../../functions/data";

export default function StoreAdd() {
  // const { t } = useContext(TranslationContext);
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

    if (!item.name) return setError("Invalid Name");

    if (!item.family) return setError("Invalid Family");

    if (!item.category) return setError("Invalid Category");

    if (!item.measureUnit) return setError("Invalid Measure Unit ");

    if (!item.measureUnitPlural) {
      return setError("Invalid Measure Unit Plural");
    }
    if (item.quantity < 0) return setError("Invalid Quantity");

    if (item.cost < 0) return setError("Invalid Cost Price");

    if (item.commissionAmount < 0) {
      return setError("Invalid Commission Amount");
    }
    if (item.commissionRatio < 0) {
      return setError("Invalid Commission Ratio");
    }

    setLoading(true);

    setLoading(false);
    console.log(item);
  };

  const AddImage = async (e) => {
    if (!e) return "";

    setError("");

    const extension = e.target.files[0].type.split("/");

    if (!["jpg", "png", "jpeg"].includes(extension[1]))
      return setError("Invalid Image Format");
    let base64 = await toBase64(e.target.files[0]);

    setImage(base64);
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
