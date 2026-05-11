import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Role = 'admin' | 'user' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state synchronously from localStorage to avoid flash of content or effect re-renders
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem('role') as Role) || null;
  });

  const login = (newRole: Role) => {
    setIsAuthenticated(true);
    setRole(newRole);
    localStorage.setItem('isAuthenticated', 'true');
    if (newRole) {
      localStorage.setItem('role', newRole);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
