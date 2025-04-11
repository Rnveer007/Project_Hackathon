import { Navigate } from "react-router-dom";
import { useAuthUser } from "../context/UserAuthProvider";


function UserProtectedRoute({ children }) {
  const { isUserAuthenticated, userloading } = useAuthUser();

  // console.log(isAuthenticated);

  if (userloading) return <div>Loading...</div>;

  return isUserAuthenticated ? children : <Navigate to="/login" replace />;
}

export default UserProtectedRoute;