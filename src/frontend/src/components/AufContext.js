import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [nickname, setNickname] = useState(() => {
    const storedNickname = localStorage.getItem('nickname');
    return storedNickname || '';
  });

  const [aufToken, setAufToken] = useState(() => {
    const storedToken = localStorage.getItem('auf_token');
    return storedToken || '';
  });

  const login = (name, token) => {
    setNickname(name);
    setAufToken(token);
    localStorage.setItem('nickname', name);
    localStorage.setItem('auf_token', token);

    console.log(name);
    console.log(token);
  };

  const logout = () => {
    setNickname('');
    setAufToken('');
    localStorage.removeItem('nickname');
    localStorage.removeItem('auf_token');
  };

  useEffect(() => {
    localStorage.setItem('nickname', nickname);
  }, [nickname]);

  useEffect(() => {
    localStorage.setItem('auf_token', aufToken);
  }, [aufToken]);

  return (
    <AuthContext.Provider value={{ nickname, aufToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
