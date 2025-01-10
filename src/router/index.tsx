import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import { routes, getRouteList } from './routes';

const AppRoutes = () => {
  const routeList = getRouteList(routes);

  return (
    <Routes>
      {routeList.map(route => (
        <Route
          key={route.key}
          path={route.path}
          element={
            route.requireAuth ? (
              <AuthGuard requiredRoles={route.requireRoles}>
                <route.component />
              </AuthGuard>
            ) : (
              <route.component />
            )
          }
        />
      ))}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes; 