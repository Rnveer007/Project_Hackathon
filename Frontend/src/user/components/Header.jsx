import { Link } from "react-router-dom";
import { useAuthUser } from "../context/UserAuthProvider";

function Header() {

  const { isUserAuthenticated, userLogoutHandle } = useAuthUser();

  function handleLogout() {
    userLogoutHandle();
    navigate("/login")
  }
  return (
    <>
      <header>
        <h1>Test System</h1>
        {isUserAuthenticated ? (
          <button onClick={() => handleLogout()}>Logout</button>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </header>
    </>
  )
}

export default Header