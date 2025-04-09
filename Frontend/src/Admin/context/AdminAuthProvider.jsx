import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminContext = createContext();

const AdminAuthProvider = ({ children }) => {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);

    async function adminFetchStatus() {
        try {
            setAdminLoading(true);
            const response = await axios.get("", {
                withCredentials: true,
            });
            if (response.status === 200) {
                setIsAdminAuthenticated(true);
            }
        } catch (error) {
            console.log(error);
            setIsAdminAuthenticated(false);
        } finally {
            setAdminLoading(false);
        }
    }

    useEffect(() => {
        adminFetchStatus();
    }, []);

    return (
        <AdminContext.Provider
            value={{
                isAdminAuthenticated,
                adminLoading,
                adminFetchStatus,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export function useAuth() {
    return useContext(AdminContext);
}

export default AdminAuthProvider; 