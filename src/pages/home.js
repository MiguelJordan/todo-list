import { useContext } from "react";

// components
import Layout from "../components/_layout/Layout";

// contexts
import { TranslationContext } from "../contexts/TranslationContext";

const Page = () => {
  const { t } = useContext(TranslationContext);

  return (
    <div style={{ padding: "0 20px" }}>
      <h1 className="center">{t("pages.home.greeting")}</h1>
      <div className="center">{t("pages.home.page_title")}</div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => (
        <p key={index}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mi
          ut sem efficitur laoreet sit amet ut mi. Maecenas at vestibulum
          ligula. Aliquam blandit mauris nec dolor hendrerit, eu porta neque
          maximus. Ut lectus eros, pulvinar at odio sit amet, ultricies
          tincidunt est. Vivamus lobortis non dui sed eleifend. Pellentesque et
          neque aliquam, gravida augue sit amet, egestas ligula. Cras felis
          orci, porta quis auctor in, dapibus vitae leo. Morbi egestas, mi eget
          condimentum luctus, erat massa sagittis nisl, in vehicula nulla dolor
          et sem. Donec pharetra euismod efficitur. Vestibulum sapien arcu,
          pharetra quis mi sed, semper viverra arcu.
        </p>
      ))}
    </div>
  );
};

export default function Home() {
  return <Layout Main={Page} />;
}
