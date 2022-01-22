import React, { useState, useContext, useEffect } from "react";

//component
import AmForm from "../../components/subComponents/AmForm";

//context
import { TranslationContext } from "../../contexts/TranslationContext";
import { AuthContext } from "../../contexts/AuthContext";

export default function StoreAdd() {
  const { t } = useContext(TranslationContext);
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState();

  const [item, setItem] = React.useState({
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
    setLoading(true);

    if (!item.name) {
      setLoading(false);
      return setError("Invalid Name");
    }
    if (!item.family) {
      setLoading(false);
      return setError("Invalid Family");
    }
    if (!item.category) {
      setLoading(false);
      return setError("Invalid Category");
    }
    if (!item.measureUnit) {
      setLoading(false);
      return setError("Invalid Measure Unit ");
    }
    if (!item.measureUnitPlural) {
      setLoading(false);
      return setError("Invalid Measure Unit Plural");
    }
    if (item.quantity < 0) {
      setLoading(false);
      return setError("Invalid Quantity");
    }
    if (item.cost < 0) {
      setLoading(false);
      return setError("Invalid Cost Price");
    }
    if (item.commissionAmount < 0) {
      setLoading(false);
      return setError("Invalid Commission Amount");
    }
    if (item.commissionRatio < 0) {
      setLoading(false);
      return setError("Invalid Commission Ratio");
    }

    setLoading(false);
    console.log(item);
  };

  const toBase64 = async (file) => {
    return new Promise((reslove, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => reslove(reader.result);
      reader.onerror = (error) => reject(error);
    });
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

  const RemoveImage = () => {
    setImage(null);
  };

  //console.log(image);

  return (
    <>
      <AmForm
        target="storeItems"
        handleSubmit={handleSubmit}
        image={image}
        items={item}
        AddImage={AddImage}
        RemoveImage={RemoveImage}
        loading={loading}
        error={error}
      />
    </>
  );
}
