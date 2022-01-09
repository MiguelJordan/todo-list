import { useContext } from "react";
import ReactTimeAgo from "react-time-ago";

// contexts
import { TrContext } from "../../contexts/TranslationContext";

export default function TimeAgo({ date = new Date() }) {
  const { language } = useContext(TrContext);

  return <ReactTimeAgo date={new Date(date)} locale={language} />;
}
