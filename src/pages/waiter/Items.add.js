import { useParams } from "react-router-dom";

import Items from "./Items";

export default function AddItems() {
  let { id } = useParams();

  return <Items orderId={id} preview={false} />;
}
