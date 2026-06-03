import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/auth.service';

type Role = 'admin' | 'user' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role;
  userName: string;
  login: (identifier: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<Role>(null);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role') as Role;
    const storedName = localStorage.getItem('userName');
    
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setRole(storedRole);
          setUserName(storedName || '');
        } else {
          logout();
        }
      } catch (e) {
        logout();
      }
    }
  }, []);

  const login = async (identifier: string, password: string) => {
    const res = await authService.login(identifier, password);
    const { token, usuario } = res.data.data;
    localStorage.setItem('token', token);
    localStorage.setItem('role', usuario.rol);
    localStorage.setItem('userName', usuario.nombre);
    
    setIsAuthenticated(true);
    setRole(usuario.rol);
    setUserName(usuario.nombre);
  };

  const register = async (data: any) => {
    const res = await authService.register(data);
    return res.data;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    setUserName('');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAuthenticated'); // In case it was left by old code
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, userName, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};