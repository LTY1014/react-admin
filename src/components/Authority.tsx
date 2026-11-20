import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export enum ACCESS_ENUM {
  NOT_LOGIN = 'NOT_LOGIN',
  USER = 'user',
  ADMIN = 'admin',
}

/**
 * 检查权限
 * @param loginUser 当前登录用户
 * @param needAccess 需要的权限列表（为空数组或包含 NOT_LOGIN 时表示无需权限）
 * @return boolean 有无权限
 */
const checkAccess = (
    loginUser: any | null,
    needAccess: (ACCESS_ENUM | string)[] = []
): boolean => {
  // 无需任何权限或允许未登录访问，直接通过
  if (needAccess.length === 0 || needAccess.includes(ACCESS_ENUM.NOT_LOGIN)) {
    return true;
  }

  // 获取当前用户具有的权限
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  // 如果是管理员，直接通过
  if (loginUserAccess === ACCESS_ENUM.ADMIN) {
    return true;
  }

  // 如果未登录用户想访问需要权限的内容，拒绝
  if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
    return false;
  }

  // 判断当前用户权限是否在允许的权限列表中
  return needAccess.includes(loginUserAccess);
};

/**
 * 是组件级别的权限控制，用于细粒度地控制 UI 的展示
 * @param permissions - 需要的权限列表
 * @param children - 需要展示的组件
 */
const Authority: React.FC = ({
  permissions = [],
  children,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const showSlot = React.useMemo(() => {
    return checkAccess(user, permissions);
  }, [user, permissions]);

  return showSlot ? <>{children}</> : null;
};

export default Authority; 