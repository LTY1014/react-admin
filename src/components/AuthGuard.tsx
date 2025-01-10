import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

/**
 * @description: 验证用户是否登录，如果没有登录，则重定向到登录页面。
 */
interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles?.length > 0 && user?.userRole) {
    if (!requiredRoles?.includes(user.userRole)) {
      return <Navigate to="/403" replace />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard; 