import React from 'react';
import {Avatar, Dropdown} from 'antd';
import type {MenuProps} from 'antd';
import {LogoutOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {RootState} from '../../store';
import {logoutAction} from '../../store/slices/authSlice';
import {logout} from '../../api/user';

interface UserMenuProps {
    collapsed?: boolean;
    sidebar?: boolean;
}

/** 头部和侧栏共用的用户菜单，统一维护导航与退出逻辑。 */
const UserMenu: React.FC<UserMenuProps> = ({collapsed = false, sidebar = false}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state: RootState) => state.auth);
    const userName = user?.userName || '用户';
    const items: any = [
        {key: 'profile', icon: <UserOutlined/>, label: '个人信息'},
        {key: 'settings', icon: <SettingOutlined/>, label: '系统设置'},
        {type: 'divider'},
        {key: 'logout', icon: <LogoutOutlined/>, label: '退出登录', danger: true},
    ];

    const onClick: MenuProps['onClick'] = async ({key}) => {
        if (key !== 'logout') {
            navigate(`/${key}`);
            return;
        }
        try {
            await logout();
            dispatch(logoutAction());
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Dropdown menu={{items, onClick}} placement={sidebar ? 'topRight' : 'bottomRight'} trigger={['click']}>
            <button
                type="button"
                aria-label={`${userName}，用户菜单`}
                title={collapsed ? userName : undefined}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    gap: 10,
                    width: sidebar ? '100%' : undefined,
                    height: '100%',
                    minWidth: 0,
                    padding: sidebar ? (collapsed ? '0 8px' : '0 16px') : 0,
                    border: 0,
                    background: 'transparent',
                    color: 'inherit',
                    font: 'inherit',
                    cursor: 'pointer',
                    textAlign: 'left',
                }}
            >
                <Avatar
                    src={user?.avatarUrl}
                    icon={!user?.avatarUrl && !user?.userName ? <UserOutlined/> : undefined}
                    style={{flexShrink: 0}}
                >
                    {!user?.avatarUrl && user?.userName?.charAt(0)}
                </Avatar>
                {!collapsed && <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{userName}</span>}
            </button>
        </Dropdown>
    );
};

export default UserMenu;