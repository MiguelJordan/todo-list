import { useContext } from "react";
import dayjs from "dayjs";

// contexts
import { TranslationContext } from "../../contexts/TranslationContext";

export default function DateTime({ date = new Date(), sx = {} }) {
  const { language } = useContext(TranslationContext);

  const _format = language === "en" ? "DD/MM/YY | h:mm a" : "DD/MM/YY | hh:mm";
  const _date = dayjs(date).format(_format);

  return <span style={{ color: "inherit", ...sx }}>{_date}</span>;
}
