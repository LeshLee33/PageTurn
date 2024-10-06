import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [nickname, setNickname] = useState('');

    const login = (name) => {
        setNickname(name);
    };

    const logout = () => {
        setNickname('');
    };

    return (
        <AuthContext.Provider value={{ nickname, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};