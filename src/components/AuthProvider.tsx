import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/user';
import { loginAction, logoutAction } from '../store/slices/authSlice';
import { RootState } from '../store';
import { message, Spin } from "antd";

const WHITE_LIST: string[] = ['/login', '/register', '/404','/403'];

/**
 * 是全局认证入口，负责登录状态的获取和初始化
 * @param children
 * @constructor
 */
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentPath = location.pathname;
      // 如果有redirect，跳转到redirect，否则跳转到默认路径
      const redirectPath = location.state?.from && typeof location.state.from === 'string'
          ? location.state.from
          : '/';
      if (WHITE_LIST.includes(currentPath)) {
        // 如果在白名单中，检查是否需要重定向
        if (user?.userRole) {
          // 只有访问登录页或注册页时才重定向到仪表盘
          if (currentPath === '/login' || currentPath === '/register') {
            navigate(redirectPath, { replace: true });
          }
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
          dispatch(loginAction({ user: response.data }));
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
        dispatch(logoutAction({user: null}));
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