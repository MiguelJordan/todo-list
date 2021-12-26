import { useContext } from "react";
import { TrContext } from "../contexts/TranslationContext";

import Layout from "../components/_layout/Layout";

const Page = () => {
  const { t } = useContext(TrContext);

  return (
    <>
      <h1>{t("pages.home.greeting")}</h1>
      <div>{t("pages.home.page_title")}</div>
    </>
  );
};

export default function Home() {
  return <Layout Main={Page} />;
}
