export enum ACCESS_ENUM {
    NOT_LOGIN = 'NOT_LOGIN',
    USER = 'user',
    ADMIN = 'admin',
}

/**
 * 检查权限
 * @param loginUser 当前登录用户
 * @param needAccess 需要的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: any | null, needAccess: ACCESS_ENUM = ACCESS_ENUM.NOT_LOGIN): boolean => {
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

    // 如果是普通用户，判断是否有对应权限
    return loginUserAccess === needAccess;
};

export default checkAccess; 