import { createContext, useContext, useEffect, useState } from "react";
import instance from "../../../axiosConfig";

export const AuthContext = createContext({});

function AdminAuth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        setLoading(true);
        await instance.get("/auth/check", { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuthentication();
  }, []);

  async function AadminlogoutHandle() {
    try {
      await instance.post(
        "/admin/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setIsAdminLoggedIn(false);
      checkAuthAdmin();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ loading, isAuthenticated, setIsAuthenticated, AadminlogoutHandle }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AuthContext);
}

export default AdminAuth;
