import React from 'react';
import { useLocation } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import Login from './Login';
import LoginAdmin from './LoginAdmin';
import Register from './Register';

const AuthRoot: React.FC = () => {
  const location = useLocation();

  return (
    <AuthLayout>
      {location.pathname === '/' && <Login />}
      {location.pathname === '/admin/login' && <LoginAdmin />}
      {location.pathname === '/register' && <Register />}
    </AuthLayout>
  );
};

export default AuthRoot;
