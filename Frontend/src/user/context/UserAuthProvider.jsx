import React, { createContext, useContext, useState, useEffect } from "react";
import instance from "../../../axiosConfig";

export const UserContext = createContext();

export const UserAuthProvider = ({ children }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        userFetchStatus();
    }, [])

    async function userFetchStatus() {
        try {
            setUserLoading(true);
            const response = await instance.get("/user/checkToken", {
                withCredentials: true,
            });
            console.log("user", response);

            if (response.data?.authenticated) {
                setIsUserAuthenticated(true);
            }
            else {
                setIsUserAuthenticated(false);
            }
        } catch (error) {
            console.log(error);
            setIsUserAuthenticated(false);
        } finally {
            setUserLoading(false);
        }
    }


    async function userLogoutHandle() {
        try {
            await instance.post(
                "user/logout",
                {},
                {
                    withCredentials: true,
                }
            );
            setIsUserAuthenticated(false);
            userFetchStatus();
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <UserContext.Provider
            value={{
                isUserAuthenticated,
                userLoading,
                setIsUserAuthenticated,
                userFetchStatus,
                userLogoutHandle,
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