import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/user';
import { login, logout } from '../store/slices/authSlice';
import { RootState } from '../store';
import { message, Spin } from "antd";

const WHITE_LIST: string[] = ['/login', '/register', '/404', '/403', '/'];

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentPath = location.pathname;
      if (WHITE_LIST.includes(currentPath)) {
        // 如果在白名单中且已登录，重定向到仪表盘
        if (user?.userRole) {
          navigate('/dashboard', { replace: true });
        }
        setIsChecking(false);
        return;
      }

      // 如果已经有用户信息，直接返回
      if (user?.userRole) {
        setIsChecking(false);
        return;
      }

      try {
        const response = await getCurrentUser();

        if (response.code === 0) {
          dispatch(login({ user: response.data }));
          if (currentPath === '/') {
            navigate('/dashboard', { replace: true });
          }
        } else {
          handleUnauthenticated(currentPath);
        }
      } catch (error) {
        handleUnauthenticated(currentPath);
      } finally {
        setIsChecking(false);
      }
    };

    // 处理未认证的情况
    const handleUnauthenticated = (currentPath: string) => {
      if (!WHITE_LIST.includes(currentPath)) {
        dispatch(logout({}));
        navigate('/login', { replace: true, state: { from: currentPath } });
      }
    };

    checkAuth();
  }, [dispatch, navigate, location.pathname, user]);

  // 如果正在检查认证状态，返回 null 或加载动画
  if (isChecking) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;