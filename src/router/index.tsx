import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import {getRouteList, appRouter} from './routes';

const AppRoutes = () => {
  const routeList = getRouteList(appRouter);

  return (
    <Routes>
      {routeList.map(route => (
        <Route
          key={route.key}
          path={route.path.replace('/', '')}
          element={
            !route.meta?.hideInMenu ? (
              <AuthGuard requiredRoles={route.meta?.requireRoles}>
                <route.component />
              </AuthGuard>
            ) : (
              <route.component />
            )
          }
        />
      ))}
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes; 