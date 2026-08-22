// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('optivis_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const foundUser = mockUsers.find(u => u.email === email && u.password === password);
        if (foundUser) {
            const userInfo = { ...foundUser };
            delete userInfo.password;
            setUser(userInfo);
            localStorage.setItem('optivis_user', JSON.stringify(userInfo));
            return { success: true, user: userInfo };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const register = (userData) => {
        const newUser = {
            id: mockUsers.length + 1,
            ...userData,
            role: 'client',
            joinedDate: new Date().toISOString().split('T')[0],
            status: 'active'
        };
        return { success: true, user: newUser };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('optivis_user');
    };

    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}