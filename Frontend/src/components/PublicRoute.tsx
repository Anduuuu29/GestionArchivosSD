import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, role } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          // Already logged in -> redirect to respective dashboard
          if (role === 'admin') {
            return <Redirect to="/admin/dashboard" />;
          } else {
            return <Redirect to="/usuario/dashboard" />;
          }
        }

        // Not logged in -> render public component
        return Component ? <Component {...props} /> : null;
      }}
    />
  );
};

export default PublicRoute;
