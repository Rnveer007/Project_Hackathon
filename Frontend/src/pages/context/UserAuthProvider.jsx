import React, { createContext, useContext, useState, useEffect } from "react";
import instance from "../../../axiosConfig";

export const UserContext = createContext();

 export const UserAuthProvider = ({ children }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(()=>{
        userFetchStatus();
    }, [])

    async function userFetchStatus() {
        try {
            setUserLoading(true);
            const response = await instance.get("/", {
                withCredentials: true,
            });
            if (response.status === 200) {
                setIsUserAuthenticated(true);
            }
        } catch (error) {
            console.log(error);
            setIsUserAuthenticated(false);
        } finally {
            setUserLoading(false);
        }
    }


    return (
        <UserContext.Provider
            value={{
                isUserAuthenticated,
                userLoading,
                userFetchStatus,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export function useAuthUser() {
    return useContext(UserContext);
}

export default UserAuthProvider; 