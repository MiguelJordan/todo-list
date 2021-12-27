import Nav from "./Nav";

export default function Layout({ Main, links, showLoginBtn, footer = false }) {
  return (
    <>
      <Nav links={links} showLoginBtn={showLoginBtn} />
      <div className="main">
        <Main />
      </div>
    </>
  );
}
