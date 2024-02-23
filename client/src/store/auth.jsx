import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token , setToken] = useState(localStorage.getItem("token"));
    const [user , setUser] = useState("");
    // const [services , setServices] = useState("")

    const stroreTokenInLS = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token", serverToken);
    }

    let isLoggedIn = !!token;
    console.log(isLoggedIn);

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    // JWT Authentication to get curentlly logged in data

    const authorizationToken = `Bearer ${token}`;
    const userAuthentication = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/user', {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken
                }
            })

            if(response.ok){
                const data = await response.json();
                setUser(data.userData);
            }

        } catch (error) {
            console.log(error);
        }
    }

    //for service page
    

    useEffect(() => {
        // getServices(),
        userAuthentication();
    }, [])

    return <AuthContext.Provider value={{isLoggedIn, stroreTokenInLS, LogoutUser, user, authorizationToken}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}