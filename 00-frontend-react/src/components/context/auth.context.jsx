import { createContext, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        email: "",
        username: "",
        phonenumber: "",
        gender: "",
        nationality: ""
    }
});

export const AuthWrapper = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            email: "",
            username: "",
            phonenumber: "",
            gender: "",
            nationality: ""
        }
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};