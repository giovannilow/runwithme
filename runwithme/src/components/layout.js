import Header from "./Header/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      //insert footer after having one
    </>
  );
}
