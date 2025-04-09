import React, { createContext, useContext, useState, useEffect } from "react";
import instance from "../../../axiosConfig";

export const AdminContext = createContext();

const AdminAuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    adminFetchStatus();
  }, []);

  async function adminFetchStatus() {
    try {
      setAdminLoading(true);
      const response = await instance.get("/admin/status", {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.authenticated) {
        setIsAdminAuthenticated(true);
        setAdminInfo(response.data.admin); // Save decoded token (id, email)
      } else {
        setIsAdminAuthenticated(false);
        setAdminInfo(null);
      }
    } catch (error) {
      console.log("Admin status error:", error);
      setIsAdminAuthenticated(false);
      setAdminInfo(null);
    } finally {
      setAdminLoading(false);
    }
  }

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated,
        adminLoading,
        adminFetchStatus,
        adminInfo,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export function useAuthAdmin() {
  return useContext(AdminContext);
}

export default AdminAuthProvider;
