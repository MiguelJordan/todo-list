import { useContext } from "react";
import ReactTimeAgo from "react-time-ago";

// contexts
import { TranslationContext } from "../../contexts/TranslationContext";

export default function TimeAgo({ date = new Date() }) {
  const { language } = useContext(TranslationContext);

  return <ReactTimeAgo date={new Date(date)} locale={language} />;
}
