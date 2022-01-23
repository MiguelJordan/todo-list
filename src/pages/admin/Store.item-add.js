import { useState, useContext } from "react";

// components
import AmForm from "../../components/subComponents/AmForm";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { NotificationContext } from "../../contexts/feedback/NotificationContext";
import { SocketContext } from "../../contexts/SocketContext";
import { TranslationContext } from "../../contexts/TranslationContext";

// functions
import { toBase64 } from "../../functions/data";
import { sendFormData } from "../../functions/http";
import queries from "../../functions/queries";

export default function StoreAdd() {
  const { user } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const { sendEvent } = useContext(SocketContext);
  const { t } = useContext(TranslationContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const _item = {
    name: "",
    family: "",
    category: "",
    cost: 0,
    prices: [750, 900],
    commission: 0,
    commissionRatio: 1,
    companyCode: user.company.code,
    storeId: user.workUnit.storeId,
    measureUnit: "",
    measureUnitPlural: "",
    quantity: 0,
    isBlocked: false,
  };

  const [item] = useState(_item);

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

  const handleSubmit = async (e, item) => {
    e.preventDefault();
    setError("");

    const { valid, validated, message } = validateItem(item);

    if (!valid) return setError(message);

    item = validated;

    setLoading(true);

    const res = await sendFormData({
      url: "/storeItems",
      values: item,
      method: "POST",
    });

    if (res.error) {
      setLoading(false);
      return setError(res.error);
    }

    // reset create form if all is good
    // e.target.reset()
    // setItem(_item);

    // send store item created/updated event
    sendEvent({
      name: "cE-store-items-updated",
      props: {
        companyCode: user.company.code,
        query: queries["cE-store-items-updated"]({
          items: [item.name],
          storeId: item.storeId,
        }),
      },
      rooms: [user.workUnit.code],
    });

    showNotification({
      msg: t("feedback.admin.store item created success"),
      color: "success",
    });

    setLoading(false);
  };

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
