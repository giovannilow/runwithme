import NavBarBeforeLogIn from "./NavBarBeforeLogIn";
import NavBarAfterLogin from "./NavBarAfterLogin";
import { useAuth } from "../../contexts/AuthContext";
import AdminTopBar from "../AdminHeader/AdminTopBar";

function Header() {
  const { currentUser, isAdmin } = useAuth();

  return (
    <>
      {isAdmin ? (
        <AdminTopBar />
      ) : currentUser ? (
        <NavBarAfterLogin />
      ) : (
        <NavBarBeforeLogIn />
      )}
    </>
  );
}

export default Header;
