import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import checkAccess, {ACCESS_ENUM} from '../access/checkAccess';

/**
 * 认证提供组件
 * @param permissions - 需要的权限列表
 * @param children - 需要展示的组件
 */
interface AuthorityProps {
  permissions?: string[];
  children: React.ReactNode;
}

const Authority: React.FC<AuthorityProps> = ({
  permissions = [],
  children,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const showSlot = React.useMemo(() => {
    // 管理员直接通过
    if (checkAccess(user, ACCESS_ENUM.ADMIN)) {
      return true;
    }
    // 未登录或无角色，且需要权限，则拒绝
    if (!user?.userRole || Array.isArray(permissions) && !permissions.includes(user.userRole)) {
      return false;
    }
    return true;
  }, [user, permissions]);

  return showSlot ? <>{children}</> : null;
};

export default Authority; 