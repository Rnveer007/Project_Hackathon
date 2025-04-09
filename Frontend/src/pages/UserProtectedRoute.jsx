import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import { useAuthUser } from "./context/UserAuthProvider";

function UserProtectedRoute({ children }) {
  const { isUserAuthenticated, userFetchStatus, userloading } = useAuthUser();

  useEffect(() => {
    userFetchStatus();
  }, []);

  // console.log(isAuthenticated);

  if (userloading) return <div>Loading...</div>;

  return isUserAuthenticated ? children : <Navigate to="/login" replace />;
}

export default UserProtectedRoute;