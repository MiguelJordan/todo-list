import Layout from "../components/_layout/Layout";

const Page = () => {
  return (
    <>
      <h1>404</h1>
      <div>Page Not Found</div>
    </>
  );
};

export default function NotFound() {
  return <Layout Main={Page} />;
}
