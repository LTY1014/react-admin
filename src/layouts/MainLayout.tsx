import React, {useState} from 'react';
import {
    ApiOutlined,
    BellOutlined,
    ClearOutlined,
    FullscreenOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoonOutlined,
    SettingOutlined,
    SunOutlined,
    UserOutlined
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {
    Avatar,
    Badge,
    Button,
    Dropdown,
    FloatButton,
    Form,
    Input,
    Layout,
    Menu,
    message,
    Modal,
    Space,
    theme
} from 'antd';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {logoutAction} from '../store/slices/authSlice';
import {logout, updatePassword} from '../api/user';
import {appRouter, filterRoutesByRole, RouteConfig, routes} from '../router/routes';
import TabsNav from '../components/TabsNav';
import config from "../config";
import {toggleDarkMode} from "@/store/slices/themeSlice";

const {Header, Sider, Content} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface ExtendedMenuItem{
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
    const {isDarkMode,menuMode} = useSelector((state: RootState) => state.theme);
    const [notices, setNotices] = useState<number>(2);
    const [passwordForm] = Form.useForm();
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    // 将路由配置转换为菜单项
    const convertRoutesToMenuItems = (routes: RouteConfig[]): ExtendedMenuItem[] => {
        return routes
            .filter(route => !route.meta?.hideInMenu)
            .map(route => {
                const menuItem: ExtendedMenuItem = {
                    key: route.key,
                    icon: route.meta?.icon ? React.createElement(route.meta.icon) : null,
                    label: route.meta?.title || route.key,
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
    const filteredRoutes = filterRoutesByRole(appRouter, user?.userRole);
    const menuItems = convertRoutesToMenuItems(filteredRoutes);

    const userMenuItems = [
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
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined/>,
            label: '退出登录',
            danger: true,
        },
    ];

    const notificationItems = [
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
            await handleLogout()
        }
        if (key === 'password') {
            setPasswordModalVisible(true);
        } else {
            navigate(`/${key}`);
        }
    };

    const handleUpdatePassword = async () => {
        try {
            const res = await updatePassword(passwordForm.getFieldsValue())
            if (res.code === 0) {
                message.success('修改密码成功');
                return true;
            }
        } catch (e: any) {
            message.error(e.message);
            return false;
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

    // 右侧内容
    function RightContent() {
        return <Space size={12} style={{height: '100%', display: 'flex', alignItems: 'center'}}>
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
            }} style={{height: '100%', display: 'flex', alignItems: 'center'}}/>
            <Button
                type="text"
                icon={isDarkMode ? <SunOutlined/> : <MoonOutlined/>}
                onClick={() => dispatch(toggleDarkMode())}
                style={{height: '100%', display: 'flex', alignItems: 'center'}}
            />
            <Button
                type="text"
                icon={<FullscreenOutlined />}
                onClick={toggleFullscreen}
                style={{height: '100%', display: 'flex', alignItems: 'center'}}
            />
            <Dropdown menu={{items: notificationItems}} placement="bottomRight">
                <Badge count={notices} size="small">
                    <Button type="text" icon={<BellOutlined/>}
                            style={{height: '100%', display: 'flex', alignItems: 'center'}}/>
                </Badge>
            </Dropdown>
            <Dropdown menu={{items: userMenuItems, onClick: handleUserMenuClick}} placement="bottomRight">
                <Space style={{cursor: 'pointer', height: '100%', display: 'flex', alignItems: 'center'}}>
                    {/*<Avatar*/}
                    {/*    style={{backgroundColor: '#1890ff'}}*/}
                    {/*    src={user?.avatarUrl}*/}
                    {/*    icon={!user?.avatarUrl && <UserOutlined/>}*/}
                    {/*/>*/}
                    <Avatar>{user?.userName?.charAt(0)}</Avatar>
                    <span>{user?.userName}</span>
                </Space>
            </Dropdown>
        </Space>;
    }

    // 修改密码框
    function PasswordModal() {
        return <Modal
            title="修改密码"
            open={passwordModalVisible}
            onCancel={() => setPasswordModalVisible(false)}
            footer={[
                <Button key="cancel" onClick={() => setPasswordModalVisible(false)}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={async () => {
                    const result = await handleUpdatePassword()
                    if (!result) {
                        return
                    }
                    setPasswordModalVisible(false)
                    await handleLogout()
                }}>
                    确定
                </Button>,
            ]}
        >
            <Form
                // onFinish={handleUpdatePassword}
                form={passwordForm}
                layout="vertical">
                <Form.Item
                    name="oldPassword"
                    label="原密码"
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="新密码"
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="确认密码"
                    dependencies={['newPassword']}
                    rules={[
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不一致'));
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
            </Form>
        </Modal>;
    }

    function getSiderMenu() {
        return <Sider trigger={null}>
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
                }}>
                    {collapsed ? config.appLogo : config.appTitle}
                </h1>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)'}}>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname.split('/')[1] || 'dashboard']}
                    items={menuItems}
                    onClick={handleMenuClick}
                    style={{flex: 1}}
                />
            </div>
        </Sider>;
    }


    function getTopMenu() {
        return <div style={{display: 'flex', alignItems: 'center', width: '50%'}}>
            <div style={{
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 24,
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#278aff',
                }}>
                    {config.appTitle}
                </h1>
            </div>
            <Menu
                mode="horizontal"
                selectedKeys={[location.pathname.split('/')[1] || 'dashboard']}
                items={menuItems}
                onClick={handleMenuClick}
                style={{flex: 1, borderBottom: 'none', height: '58px',}}
                className="ant-menu-no-underline"
            />
        </div>
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            {menuMode == 'sider' && getSiderMenu()}
            <Layout>
                <Header style={{
                    padding: '24px 16px',
                    background: colorBgContainer,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 1px 4px rgba(0,21,41,.08)',
                    maxHeight: 48,
                }}>
                    {menuMode == 'sider' ? <div></div> : getTopMenu()}
                    {RightContent()}
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

            <a
                href={config.apiUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FloatButton icon={<ApiOutlined/>}/>
            </a>

            {PasswordModal()}
        </Layout>
    );
};

export default MainLayout;
