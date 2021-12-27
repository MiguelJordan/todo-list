import Nav from "./Nav";

export default function Layout({
  Main,
  links,
  showLoginBtn,
  nav = true,
  footer = false,
}) {
  return (
    <>
      {nav && <Nav links={links} showLoginBtn={showLoginBtn} />}
      <div className="main">
        <Main />
      </div>
    </>
  );
}
