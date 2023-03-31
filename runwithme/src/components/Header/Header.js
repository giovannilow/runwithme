import NavBarBeforeLogIn from "./NavBarBeforeLogIn";
import NavBarAfterLogin from "./NavBarAfterLogin";
import { useAuth } from "../../contexts/AuthContext";
import AdminTopBar from "./AdminTopBar";

function Header() {
  const { currentUser } = useAuth();

  return <>{currentUser ? <NavBarAfterLogin /> : <NavBarBeforeLogIn />}</>;
}

export default Header;
