import Header from "./Header/Header";
import Footer from "./Footer";
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      gello
    </>
  );
}
