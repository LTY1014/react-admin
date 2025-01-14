import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

/**
 * @description: 路由权限控制组件
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