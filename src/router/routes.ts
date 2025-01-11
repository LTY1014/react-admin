import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import Dashboard from '../pages/Dashboard';
import UserList from '../pages/UserList';
import RoleList from '../pages/RoleList';
import ProductList from '../pages/ProductList';
import ProductCategory from '../pages/ProductCategory';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Forbidden from '../pages/Forbidden';

export interface RouteConfig {
  path: string;           // 路由路径
  key: string;           // 路由唯一标识
  component: React.ComponentType<any>; // 路由组件
  name: string;          // 路由名称（菜单显示）
  icon?: React.ComponentType<any>;    // 菜单图标
  isMenu?: boolean;      // 是否显示在菜单中
  hideInMenu?: boolean;  // 是否在菜单中隐藏
  requireAuth?: boolean; // 是否需要登录
  requireRoles?: string[]; // 需要的角色权限
  children?: RouteConfig[]; // 子路由
}

export const routes: RouteConfig[] = [
  {
    path: '/dashboard',
    key: 'dashboard',
    component: Dashboard,
    name: '仪表盘',
    icon: DashboardOutlined,
    isMenu: true,
    requireAuth: true,
  },
  {
    path: '/user',
    key: 'user',
    name: '用户管理',
    icon: TeamOutlined,
    isMenu: true,
    requireAuth: true,
    children: [
      {
        path: '/users',
        key: 'users',
        component: UserList,
        name: '用户列表',
        icon: UserOutlined,
        isMenu: true,
        requireAuth: true,
        requireRoles: ['admin'],
      },
      {
        path: '/roles',
        key: 'roles',
        component: RoleList,
        name: '角色管理',
        icon: UserOutlined,
        isMenu: true,
        requireAuth: true,
        requireRoles: ['admin'],
      },
    ],
  },
  {
    path: '/product',
    key: 'product',
    name: '商品管理',
    icon: ShoppingOutlined,
    isMenu: true,
    requireAuth: true,
    children: [
      {
        path: '/product-list',
        key: 'product-list',
        component: ProductList,
        name: '商品列表',
        icon: AppstoreOutlined,
        isMenu: true,
        requireAuth: true,
      },
      {
        path: '/product-category',
        key: 'product-category',
        component: ProductCategory,
        name: '商品分类',
        icon: AppstoreOutlined,
        isMenu: true,
        requireAuth: true,
      },
    ],
  },
  {
    path: '/settings',
    key: 'settings',
    component: Settings,
    name: '系统设置',
    icon: SettingOutlined,
    isMenu: true,
    requireAuth: true,
    requireRoles: ['admin','user'],
  },
  {
    path: '/profile',
    key: 'profile',
    component: Profile,
    name: '个人信息',
    icon: UserOutlined,
    requireAuth: true,
    requireRoles: ['admin','user'],
  },
  {
    path: '/login',
    key: 'login',
    component: Login,
    name: '登录',
    hideInMenu: true,
  },
  {
    path: '/403',
    key: '403',
    component: Forbidden,
    name: '无权限',
    hideInMenu: true,
  },
  {
    path: '/404',
    key: '404',
    component: NotFound,
    name: '未找到',
    hideInMenu: true,
  },
];

// 获取所有需要注册的路由（扁平化处理）
export const getRouteList = (routes: RouteConfig[]): RouteConfig[] => {
  // 过滤白名单
  routes = routes.filter(route => !route.hideInMenu);
  const result: RouteConfig[] = [];
  routes.forEach(route => {
    if (route.children) {
      result.push(...getRouteList(route.children));
    } else {
      result.push(route);
    }
  });
  return result;
};

// 根据用户角色过滤路由
export const filterRoutesByRole = (routes: RouteConfig[], userRole?: string): RouteConfig[] => {
  return routes
    .map(route => {
      if (route.requireRoles && !route.requireRoles.includes(userRole || '')) {
        return null;
      }
      
      if (route.children) {
        const filteredChildren = filterRoutesByRole(route.children, userRole);
        if (filteredChildren.length === 0) {
          return null;
        }
        return { ...route, children: filteredChildren };
      }
      
      return route;
    })
    .filter(Boolean) as RouteConfig[];
}; 