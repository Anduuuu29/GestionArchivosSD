import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/auth.service';

type Role = 'admin' | 'user' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role;
  login: (identifier: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });

  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem('role') as Role) || null;
  });

  const login = async (identifier: string, password: string) => {
    const res = await authService.login(identifier, password);
    const { token, usuario } = res.data.data;
    localStorage.setItem('token', token);
    localStorage.setItem('role', usuario.rol);
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    setRole(usuario.rol);
  };

  const register = async (data: any) => {
    const res = await authService.register(data);
    return res.data;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, register, logout }}>
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