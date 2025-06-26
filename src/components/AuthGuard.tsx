import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

/**
 * 是路由级别的权限控制，防止未授权用户进入受保护页面。
 */
interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRoles = [] }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user?.userRole) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles?.length > 0) {
    if (!requiredRoles?.includes(user.userRole)) {
      return <Navigate to="/403" replace />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;