import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, login as apiLogin, logout as apiLogout } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const userData = await getCurrentUser();
                    setUser(userData);
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                    localStorage.removeItem('access_token');
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        const data = await apiLogin(email, password);
        // After login, fetch user details
        const userData = await getCurrentUser();
        setUser(userData);
        return data;
    };

    const logout = () => {
        apiLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
