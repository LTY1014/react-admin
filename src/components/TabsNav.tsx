import React from 'react';
import { Tabs, Breadcrumb, Space, theme } from 'antd';
import type { TabsProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes, RouteConfig } from '../router/routes';
import { HomeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const NavContainer = styled.div<{ $bgColor: string }>`
  padding: 2px 16px;
  background: ${props => props.$bgColor};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const StyledTabs = styled(Tabs)<{ $token: any }>`
  flex: 1;
  margin-left: 16px;
  
  .ant-tabs-nav {
    margin: 0;
  }
  
  .ant-tabs-tab {
    border-radius: 4px 4px 0 0 !important;
    background: ${props => props.$token.colorBgContainer} !important;
    border: 1px solid ${props => props.$token.colorBorderSecondary} !important;
    padding: 2px 8px !important;
    transition: all 0.3s;
    font-size: 13px;
    
    &:hover {
      color: ${props => props.$token.colorPrimary} !important;
    }
    
    &.ant-tabs-tab-active {
      background: ${props => props.$token.colorBgElevated} !important;
      border-bottom-color: ${props => props.$token.colorBgElevated} !important;
      
      .ant-tabs-tab-btn {
        color: ${props => props.$token.colorPrimary} !important;
      }
    }
  }
  
  .ant-tabs-nav-wrap {
    flex: 1;
  }

  .ant-tabs-nav-list {
    border-bottom: 1px solid ${props => props.$token.colorBorderSecondary};
  }
`;

const CloseAllButton = styled.a<{ $token: any }>`
  margin-left: 12px;
  color: ${props => props.$token.colorTextSecondary};
  font-size: 13px;
  
  &:hover {
    color: ${props => props.$token.colorPrimary};
  }
`;

interface TabRoute {
  key: string;
  label: string;
  path: string;
}

const { TabPane } = Tabs;

// 标签导航
const TabsNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = React.useState(location.pathname);
  const [tabRoutes, setTabRoutes] = React.useState<TabRoute[]>([]);
  const { token } = theme.useToken();
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

  // 获取当前路由的面包屑
  const getBreadcrumbs = (pathname: string): { title: string; path: string }[] => {
    const breadcrumbs: { title: string; path: string }[] = [];
    let currentPath = '';

    const findRoute = (routes: RouteConfig[], pathSegments: string[]): void => {
      for (const route of routes) {
        const routePath = route.path.replace('/', '');
        if (routePath === pathSegments[0] || (Array.isArray(route.children) && route.children.some(child => child.path.includes(pathSegments[0])))) {
          currentPath += `/${routePath}`;
          breadcrumbs.push({ title: route.name, path: currentPath });
          
          if (route.children && pathSegments.length > 1) {
            const childRoute = route.children.find(child => child.path.includes(pathSegments[1]));
            if (childRoute) {
              breadcrumbs.push({ title: childRoute.name, path: `/${pathSegments.join('/')}` });
            }
          }
          break;
        }
      }
    };

    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      findRoute(routes, pathSegments);
    }

    return breadcrumbs;
  };

  // 添加新标签
  const addTab = (pathname: string) => {
    const findRouteByPath = (routes: RouteConfig[]): RouteConfig | null => {
      for (const route of routes) {
        if (route.path.replace('/', '') === pathname.split('/')[1]) {
          if (route.children) {
            const childPath = pathname.split('/')[2];
            const childRoute = route.children.find(child => child.path.includes(childPath));
            return childRoute || route;
          }
          return route;
        }
        if (route.children) {
          const found = findRouteByPath(route.children);
          if (found) return found;
        }
      }
      return null;
    };

    const route = findRouteByPath(routes);
    if (route && !tabRoutes.find(tab => tab.path === pathname)) {
      setTabRoutes([...tabRoutes, {
        key: pathname,
        label: route.name,
        path: pathname,
      }]);
    }
  };

  // 处理标签变化
  const handleTabChange = (key: string) => {
    setActiveKey(key);
    navigate(key);
  };

  // 处理标签编辑（关闭）
  const handleTabEdit: TabsProps['onEdit'] = (targetKey, action) => {
    if (action === 'remove' && typeof targetKey === 'string') {
      const newTabs = tabRoutes.filter(tab => tab.key !== targetKey);
      setTabRoutes(newTabs);
      
      // 如果关闭的是当前标签，跳转到最后一个标签
      if (targetKey === activeKey && newTabs.length) {
        const lastTab = newTabs[newTabs.length - 1];
        setActiveKey(lastTab.key);
        navigate(lastTab.path);
      }
    }
  };

  // 关闭所有标签
  const handleCloseAll = () => {
    setTabRoutes([]);
    navigate('/dashboard');
  };

  // 监听路由变化
  React.useEffect(() => {
    if (!location.pathname.includes('/login')) {
      setActiveKey(location.pathname);
      addTab(location.pathname);
    }
  }, [location.pathname]);

  const breadcrumbs = getBreadcrumbs(location.pathname);

  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
      href: '/dashboard',
      key: 'home'
    },
    ...breadcrumbs.map((item) => ({
      title: item.title,
      key: item.path,
      href: item.path
    }))
  ];

  const tabItems = tabRoutes.map(tab => ({
    key: tab.key,
    label: tab.label
  }));

  return (
    <NavContainer $bgColor={token.colorBgContainer}>
      <Breadcrumb items={breadcrumbItems} />
      
      <StyledTabs
        hideAdd
        onChange={handleTabChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={handleTabEdit}
        $token={token}
        items={tabItems}
        tabBarExtraContent={{
          right: (
            <CloseAllButton 
              onClick={handleCloseAll} 
              $token={token}
            >
              关闭所有
            </CloseAllButton>
          ),
        }}
      />
    </NavContainer>
  );
};

export default TabsNav; 