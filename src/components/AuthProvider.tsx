import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/user';
import { login, logout } from '../store/slices/authSlice';
import { RootState } from '../store';

const WHITE_LIST: string[] = ['/login', '/register', '/404', '/403', '/'];

/**
 * 组件:用于处理用户认证逻辑
 * @param children
 * @constructor
 */
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      const currentPath = location.pathname;
      // 如果在白名单中，直接返回
      if (WHITE_LIST.includes(currentPath)) {
        return;
      }
      // 如果已经认证，直接返回
      if (isAuthenticated) {
        return;
      }
      try {
        // 尝试获取当前用户信息
        const user = await getCurrentUser();
        dispatch(login({ user }));
      } catch (error) {
        // 如果获取失败且不在白名单中，重定向到登录页
        if (!WHITE_LIST.includes(currentPath)) {
          dispatch(logout());
          navigate('/login', { 
            replace: true,
            state: { from: currentPath }
          });
        }
      }
    };
    checkAuth();
  }, [dispatch, navigate, location.pathname, isAuthenticated]);

  return <>{children}</>;
};

export default AuthProvider; 