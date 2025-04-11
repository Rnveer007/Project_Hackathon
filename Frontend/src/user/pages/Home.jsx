import { Link } from 'react-router-dom';
import { useAuthUser } from '../context/UserAuthProvider';

function Home() {
  const { isUserAuthenticated, userLogoutHandle } = useAuthUser();

  function handleLogout() {
    userLogoutHandle();
    navigate("/login")
  }

  return (
    <>
      <div>
        {isUserAuthenticated ? (
          <button onClick={() => handleLogout()}>Logout</button>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </div>
    </>
  )
}

export default Home