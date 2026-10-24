import React from 'react';
import { Menu, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { appRouter, convertRoutesToMenuItems, filterRoutesByRole } from '../../router/routes';
import config from '../../config';

/**
 * 顶部菜单栏
 * @constructor
 */
const TopMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state: RootState) => state.auth);
    const {
        token: { colorPrimary: primaryColor },
    } = theme.useToken();

    // 根据用户角色过滤并转换菜单
    const filteredRoutes = filterRoutesByRole(appRouter, user?.userRole);
    const menuItems = convertRoutesToMenuItems(filteredRoutes);

    const handleMenuClick = ({ key }: { key: string }) => {
        navigate(`/${key}`);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
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
                    color: primaryColor,
                }}>
                    {config.appTitle}
                </h1>
            </div>
            <Menu
                mode="horizontal"
                selectedKeys={[location.pathname.split('/')[1] || config.homePath.replace(/^\//, '')]}
                items={menuItems}
                onClick={handleMenuClick}
                style={{ flex: 1, borderBottom: 'none', height: '48px' }}
                className="ant-menu-no-underline top-header-menu"
            />
        </div>
    );
};

export default TopMenu;
