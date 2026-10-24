import React, {useState} from 'react';
import {
    BellOutlined,
    ClearOutlined,
    FullscreenOutlined,
    LogoutOutlined,
    MoonOutlined,
    SettingOutlined,
    SunOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Avatar, Badge, Button, Dropdown, message, Modal, Space} from 'antd';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {logoutAction} from '../../store/slices/authSlice';
import {logout} from '../../api/user';
import {toggleDarkMode} from '@/store/slices/themeSlice';

/**
 * 右上用户信息栏
 * @constructor
 */
const RightContent: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state: RootState) => state.auth);
    const {isDarkMode} = useSelector((state: RootState) => state.theme);
    const [notices, setNotices] = useState<number>(2);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const userMenuItems: any = [
        {
            key: 'profile',
            icon: <UserOutlined/>,
            label: '个人信息',
        },
        {
            key: 'settings',
            icon: <SettingOutlined/>,
            label: '系统设置',
        },
        {
            type: 'divider' as const,
        },
        {
            key: 'logout',
            icon: <LogoutOutlined/>,
            label: '退出登录',
            danger: true,
        },
    ];

    const notificationItems: any = [
        {
            key: '1',
            label: '系统通知：系统将于今晚维护',
            onClick: () => message.info('查看通知详情'),
        },
        {
            key: '2',
            label: '系统通知：新功能实现',
            onClick: () => message.info('查看通知详情'),
        },
        {
            type: 'divider' as const,
        },
        {
            key: 'clear-notifications',
            label: '清空通知',
            onClick: () => {
                setNotices(0);
            },
        },
    ];

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(logoutAction());
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleUserMenuClick = async ({key}: { key: string }) => {
        if (key === 'logout') {
            await handleLogout();
        } else {
            navigate(`/${key}`);
        }
    };

    // 添加全屏切换函数
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setIsFullscreen(true);
            }).catch((err) => {
                console.error(`无法进入全屏模式: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then(() => {
                    setIsFullscreen(false);
                }).catch((err) => {
                    console.error(`无法退出全屏模式: ${err.message}`);
                });
            }
        }
    };

    return (
        <Space size={12} style={{height: '100%', display: 'flex', alignItems: 'center'}}>
            <Button
                type="text"
                icon={<ClearOutlined/>}
                onClick={() => {
                    Modal.confirm({
                        title: '清空缓存数据？',
                        content: '清空缓存数据将删除所有缓存数据。',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            localStorage.clear();
                            message.success('清空缓存数据成功');
                        },
                    });
                }}
                style={{height: '100%', display: 'flex', alignItems: 'center'}}
            />
            <Button
                type="text"
                icon={isDarkMode ? <SunOutlined/> : <MoonOutlined/>}
                onClick={() => dispatch(toggleDarkMode())}
                style={{height: '100%', display: 'flex', alignItems: 'center'}}
            />
            <Button
                type="text"
                icon={<FullscreenOutlined/>}
                onClick={toggleFullscreen}
                style={{height: '100%', display: 'flex', alignItems: 'center'}}
            />
            <Dropdown menu={{items: notificationItems}} placement="bottomRight">
                <Badge count={notices} size="small">
                    <Button
                        type="text"
                        icon={<BellOutlined/>}
                        style={{height: '100%', display: 'flex', alignItems: 'center'}}
                    />
                </Badge>
            </Dropdown>
            <Dropdown menu={{items: userMenuItems, onClick: handleUserMenuClick}} placement="bottomRight">
                <Space style={{cursor: 'pointer', height: '100%', display: 'flex', alignItems: 'center'}}>
                    <Avatar
                        src={user?.avatarUrl}
                        icon={!user?.avatarUrl && !user?.userName && <UserOutlined/>}
                    >
                        {!user?.avatarUrl && user?.userName?.charAt(0)}
                    </Avatar>
                    <span>{user?.userName}</span>
                </Space>
            </Dropdown>
        </Space>
    );
};

export default RightContent;
