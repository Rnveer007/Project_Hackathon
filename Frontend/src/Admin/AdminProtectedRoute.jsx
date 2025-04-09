import { Navigate } from "react-router-dom";
import { useAuthAdmin } from "./context/AdminAuthProvider";

function AdminProtectedRoute({ children }) {

  const {
    isAdminAuthenticated,
    adminLoading
  } = useAuthAdmin();

  if (adminLoading) return <div>Loading...</div>;

  return isAdminAuthenticated ? children : <Navigate to="/adminlogin" replace />;
}

export default AdminProtectedRoute


