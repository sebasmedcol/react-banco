import { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Usuario desde localStorage si existe
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // guardo el usuario en el estado y en localStorage
  const login = (username) => {
    const loggedInUser = { username };
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  // limpio el estado y localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  //Verificar si el usuario está almacenado en localStorage al cargar la app
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
