import Layout from "../components/_layout/Layout";

const Page = () => {
  return (
    <>
      <h1>Welcome</h1>
      <div>Home Page</div>
    </>
  );
};

export default function Home() {
  return <Layout Main={Page} />;
}
