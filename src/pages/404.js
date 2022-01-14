import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

// components
import Layout from "../components/_layout/Layout";

// contexts
import { TranslationContext } from "../contexts/TranslationContext";

const Page = () => {
  const { t } = useContext(TranslationContext);
  const Navigate = useNavigate();

  return (
    <>
      <div style={{ fontSize: "xx-large", marginTop: "20vh" }}>
        <h1 className="center">404</h1>
        <div className="center">{t("pages.404.message")}</div>
      </div>
      <Button
        onClick={() => Navigate("/")}
        sx={{
          my: 2,
          backgroundColor: "hsl(216, 100%, 46%)",
          color: "white",
          display: "block",
          border: "3px solid transparent",
          margin: "10px auto",
          "&:hover": {
            border: "3px solid hsl(216, 100%, 46%)",
          },
        }}
      >
        {t("pages.404.back_home")}
      </Button>
    </>
  );
};

export default function NotFound() {
  return <Layout Main={Page} nav={false} />;
}
