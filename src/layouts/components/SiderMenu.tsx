import React from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { appRouter, convertRoutesToMenuItems, filterRoutesByRole } from '../../router/routes';
import config from '../../config';
import UserMenu from './UserMenu';

const { Sider } = Layout;

interface SiderMenuProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

/**
 * 侧边菜单栏
 * @param collapsed
 * @param onCollapse
 * @constructor
 */
const SiderMenu: React.FC<SiderMenuProps> = ({ collapsed, onCollapse }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state: RootState) => state.auth);

    // 根据用户角色过滤并转换菜单
    const filteredRoutes = filterRoutesByRole(appRouter, user?.userRole);
    const menuItems = convertRoutesToMenuItems(filteredRoutes);

    const handleMenuClick = ({ key }: { key: string }) => {
        navigate(`/${key}`);
    };

    function renderUserMenu() {
        // 侧边栏用户菜单显示控制
        const flag = true
        if (flag) {
            return <div className="app-sider-user">
                <UserMenu sidebar collapsed={collapsed}/>
            </div>;
        }
    }

    return (
        <Sider className="app-sider" collapsible={false} collapsed={collapsed}
               onCollapse={(value) => onCollapse(value)}>
            <div style={{
                height: 64,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: 20,
                    transition: 'all 0.3s',
                    fontWeight: 600,
                }}>
                    {collapsed ? config.appLogo : config.appTitle}
                </h1>
            </div>
            <div style={{flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden'}}>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname.split('/')[1] || config.homePath.replace(/^\//, '')]}
                    items={menuItems}
                    onClick={handleMenuClick}
                    style={{flex: 1}}
                />
            </div>
            {renderUserMenu()}
        </Sider>
    );
};

export default SiderMenu;
