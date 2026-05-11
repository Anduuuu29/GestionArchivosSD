import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps extends RouteProps {
  requiredRole?: 'admin' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole, component: Component, ...rest }) => {
  const { isAuthenticated, role } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          // Not logged in -> redirect to login
          return <Redirect to="/" />;
        }

        if (requiredRole && role !== requiredRole) {
          // Logged in, but wrong role -> redirect to appropriate dashboard
          if (role === 'admin') {
            return <Redirect to="/admin/dashboard" />;
          } else {
            return <Redirect to="/usuario/dashboard" />;
          }
        }

        // All good -> render component
        return Component ? <Component {...props} /> : null;
      }}
    />
  );
};

export default ProtectedRoute;
