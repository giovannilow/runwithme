import NavBarBeforeLogIn from "./NavBarBeforeLogIn";
import NavBarAfterLogin from "./NavBarAfterLogin";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { currentUser } = useAuth();

  return <>{currentUser ? <NavBarAfterLogin /> : <NavBarBeforeLogIn />}</>;
}

export default Header;
