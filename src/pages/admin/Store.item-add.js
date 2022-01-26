import { useState, useContext } from "react";

// components
import AmForm from "../../components/subComponents/AmForm";

// contexts
import { AuthContext } from "../../contexts/AuthContext";
import { NotificationContext } from "../../contexts/feedback/NotificationContext";
import { SocketContext } from "../../contexts/SocketContext";
import { TranslationContext } from "../../contexts/TranslationContext";

// functions
import {
  toBase64,
  validateItem,
  AddImage,
  RemoveImage,
} from "../../functions/data";
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

  const imageAdd = (e) => AddImage(e, setError, setImage, setImageUrl);

  const imageRemove = () => RemoveImage(setImage, setImageUrl);

  const handleSubmit = async (item, reset) => {
    setError("");

    const { valid, validated, message } = validateItem(item, imageUrl);

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
    reset();
    RemoveImage();

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

  return (
    <AmForm
      target="storeItems"
      handleSubmit={handleSubmit}
      image={image}
      AddImage={imageAdd}
      RemoveImage={imageRemove}
      loading={loading}
      error={error}
    />
  );
}
