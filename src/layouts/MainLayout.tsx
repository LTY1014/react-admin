import React, {useState} from 'react';
import {
    ApiOutlined,
    BellOutlined,
    ClearOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Avatar, Badge, Button, Dropdown, Layout, Menu, message, Modal, Space, theme} from 'antd';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {logout} from '../store/slices/authSlice';
import {logout as apiLogout} from '../api/user';
import {filterRoutesByRole, RouteConfig, routes} from '../router/routes';
import TabsNav from '../components/TabsNav';
import config from "../config";

const {Header, Sider, Content} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface ExtendedMenuItem extends MenuItem {
    children?: MenuItem[];
    icon?: React.ReactNode;
    key: string;
    label: string;
}

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {user} = useSelector((state: RootState) => state.auth);
    const [notices, setNotices] = useState<any[]>(2);

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    // 将路由配置转换为菜单项
    const convertRoutesToMenuItems = (routes: RouteConfig[]): ExtendedMenuItem[] => {
        return routes
            .filter(route => route.isMenu)
            .map(route => {
                const menuItem: ExtendedMenuItem = {
                    key: route.key,
                    icon: route.icon ? React.createElement(route.icon) : null,
                    label: route.name,
                };

                if (route.children) {
                    const children = convertRoutesToMenuItems(route.children);
                    if (children.length > 0) {
                        menuItem.children = children;
                    }
                }

                return menuItem;
            });
    };

    // 根据用户角色过滤并转换菜单
    const filteredRoutes = filterRoutesByRole(routes, user?.userRole);
    const menuItems = convertRoutesToMenuItems(filteredRoutes);

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <UserOutlined/>,
            label: '个人信息',
        },
        {
            key: 'settings',
            icon: <SettingOutlined/>,
            label: '账户设置',
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined/>,
            label: '退出登录',
            danger: true,
        },
    ];

    const notificationItems: MenuProps['items'] = [
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
            type: 'divider',
        },
        {
            key: 'clear-notifications',
            label: '清空通知',
            onClick: () => {
                setNotices(0);
            },
        },
    ];

    const handleMenuClick = ({key}: { key: string }) => {
        navigate(`/${key}`);
    };

    const handleUserMenuClick = async ({key}: { key: string }) => {
        if (key === 'logout') {
            try {
                await apiLogout();
                dispatch(logout({}));
                navigate('/login');
                message.success('退出登录');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        } else {
            navigate(`/${key}`);
        }
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div style={{
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                }}>
                    <h1 style={{
                        margin: 0,
                        fontSize: collapsed ? 16 : 20,
                        transition: 'all 0.3s',
                        fontWeight: 600,
                        color: '#fff',
                    }}>
                        {collapsed ? config.appLogo : config.appTitle}
                    </h1>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)'}}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[location.pathname.split('/')[1] || 'dashboard']}
                        defaultOpenKeys={['user', 'product']}
                        items={menuItems}
                        onClick={handleMenuClick}
                        style={{flex: 1}}
                    />
                    <div style={{
                        padding: '16px',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                    }}>
                        <a
                            href={config.apiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'rgba(255,255,255,0.65)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <ApiOutlined/>
                            <span>{collapsed ? '' : 'API文档'}</span>
                        </a>
                    </div>
                </div>
            </Sider>
            <Layout>
                <Header style={{
                    padding: '0 16px',
                    background: colorBgContainer,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 1px 4px rgba(0,21,41,.08)',
                }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Space size={16}>
                        <Button type="text" icon={<ClearOutlined/>} onClick={() => {
                            Modal.confirm({
                                title: '清空缓存数据？',
                                content: '清空缓存数据将删除所有缓存数据。',
                                okText: '确定',
                                cancelText: '取消',
                                onOk: () => {
                                    localStorage.clear()
                                    message.success('清空缓存数据成功');
                                },
                            });
                        }}/>
                        <Dropdown menu={{items: notificationItems}} placement="bottomRight">
                            <Badge count={notices} size="small">
                                <Button type="text" icon={<BellOutlined/>}/>
                            </Badge>
                        </Dropdown>
                        <Dropdown menu={{items: userMenuItems, onClick: handleUserMenuClick}} placement="bottomRight">
                            <Space style={{cursor: 'pointer'}}>
                                <Avatar
                                    style={{backgroundColor: '#1890ff'}}
                                    src={user?.avatarUrl}
                                    icon={!user?.avatarUrl && <UserOutlined/>}
                                />
                                <span>{user?.userName}</span>
                            </Space>
                        </Dropdown>
                    </Space>
                </Header>
                <TabsNav/>
                <Content
                    style={{
                        margin: '0 16px 24px',
                        minHeight: 280,
                    }}
                >
                    <div style={{
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}>
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
