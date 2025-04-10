import { useAdminAuth } from "../context/Auth";
import { Link } from "react-router-dom";

function Header() {
  const { isAuthenticated, logout } = useAdminAuth();

  return (
    <header>
      <h1>Test System Admin</h1>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <li>
          <Link to="/admin/login">Login</Link>
        </li>
      )}
    </header>
  );
}

export default Header;
