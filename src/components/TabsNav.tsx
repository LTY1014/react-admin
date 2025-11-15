import React from 'react';
import { Tabs, Breadcrumb, Space, theme } from 'antd';
import type { TabsProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteConfig, appRouter } from '../router/routes';
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

  // 检查路径是否匹配（支持动态路由）
  const isPathMatch = (routePath: string, pathname: string): boolean => {
    // 精确匹配
    if (routePath === pathname) {
      return true;
    }
    
    // 动态路由匹配（如 /product/:id 匹配 /product/123）
    if (routePath.includes(':')) {
      const routeParts = routePath.split('/');
      const pathParts = pathname.split('/');
      
      if (routeParts.length !== pathParts.length) {
        return false;
      }
      
      return routeParts.every((part, index) => {
        if (part.startsWith(':')) {
          return true; // 动态参数，匹配任何值
        }
        return part === pathParts[index];
      });
    }
    
    return false;
  };

  // 递归查找路由及其父路由
  const findRouteWithParents = (
    routes: RouteConfig[], 
    pathname: string, 
    parents: RouteConfig[] = []
  ): { route: RouteConfig | null; parents: RouteConfig[] } => {
    for (const route of routes) {
      // 检查当前路由是否匹配
      if (isPathMatch(route.path, pathname)) {
        return { route, parents };
      }
      
      // 如果有子路由，递归查找
      if (route.children && route.children.length > 0) {
        const result = findRouteWithParents(route.children, pathname, [...parents, route]);
        if (result.route) {
          return result;
        }
      }
    }
    
    return { route: null, parents: [] };
  };

  // 获取当前路由的面包屑
  const getBreadcrumbs = (pathname: string): { title: string; path: string }[] => {
    const breadcrumbs: { title: string; path: string }[] = [];
    
    const { route, parents } = findRouteWithParents(appRouter, pathname);
    
    if (!route) {
      return breadcrumbs;
    }
    
    // 添加所有父路由到面包屑
    // parents.forEach(parent => {
    //   breadcrumbs.push({
    //     title: parent.meta?.title || parent.key,
    //     path: parent.path
    //   });
    // });
    
    // 添加当前路由到面包屑
    breadcrumbs.push({
      title: route.meta?.title || route.key,
      path: pathname
    });
    
    return breadcrumbs;
  };

  // 添加新标签
  const addTab = (pathname: string) => {
    const { route } = findRouteWithParents(appRouter, pathname);
    
    if (route && !tabRoutes.find(tab => tab.path === pathname)) {
      setTabRoutes([...tabRoutes, {
        key: pathname,
        label: route.meta?.title || route.key,
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