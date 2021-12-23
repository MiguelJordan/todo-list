import Nav from "./Nav";

export default function Layout({ Main, links }) {
  return (
    <>
      <Nav links={links} />
      <Main />
    </>
  );
}
