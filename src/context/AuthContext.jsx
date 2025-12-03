import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, login as apiLogin, logout as apiLogout } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    console.log('AuthContext: Provider rendering');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('AuthContext: useEffect running');
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
        await apiLogin(email, password);
        // After login, fetch user details
        const userData = await getCurrentUser();
        setUser(userData);
        return userData;
    };

    const logout = () => {
        apiLogout();
        setUser(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
