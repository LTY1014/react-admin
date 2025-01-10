import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DashboardOutlined,
    ShoppingOutlined,
    SettingOutlined,
    TeamOutlined,
    AppstoreOutlined,
    LogoutOutlined,
    BellOutlined
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Dropdown, Space, Avatar, Badge, message} from 'antd';
import {useNavigate, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store';
import {logout} from '../store/slices/authSlice';
import AppRoutes from '../router';
import type {MenuProps} from 'antd';
import {logout as apiLogout} from '../api/user';
import {routes, filterRoutesByRole, RouteConfig} from '../router/routes';

const {Header, Sider, Content} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface ExtendedMenuItem extends MenuItem {
    children?: MenuItem[];
}

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {user} = useSelector((state: RootState) => state.auth);

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    // 将路由配置转换为菜单项
    const convertRoutesToMenuItems = (routes: RouteConfig[]): ExtendedMenuItem[] => {
        return routes
            .filter(route => route.isMenu && !route.hideInMenu)
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
            label: '新订单提醒：收到 3 个新订单',
            onClick: () => message.info('查看订单详情'),
        },
    ];

    const handleMenuClick = ({key}: { key: string }) => {
        navigate(`/${key}`);
    };

    const handleUserMenuClick = async ({key}: { key: string }) => {
        if (key === 'logout') {
            try {
                await apiLogout();
                dispatch(logout());
                navigate('/login');
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
                        {collapsed ? 'RA' : 'React Admin'}
                    </h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname.split('/')[1] || 'dashboard']}
                    defaultOpenKeys={['user', 'product']}
                    items={menuItems}
                    onClick={handleMenuClick}
                />
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
                        <Dropdown menu={{items: notificationItems}} placement="bottomRight">
                            <Badge count={2} size="small">
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
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        minHeight: 280,
                    }}
                >
                    <AppRoutes/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
