import Nav from "./Nav";

export default function Layout({ Main, links, showLoginBtn }) {
  return (
    <>
      <Nav links={links} showLoginBtn={showLoginBtn} />
      <Main />
    </>
  );
}
