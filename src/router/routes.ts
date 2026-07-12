import {
    AppstoreOutlined,
    BookOutlined,
    BugOutlined,
    ControlOutlined,
    DashboardOutlined,
    IdcardOutlined,
    InfoCircleOutlined,
    LoginOutlined,
    SettingOutlined,
    ShoppingOutlined,
    StopOutlined,
    UserOutlined,
    WarningOutlined
} from '@ant-design/icons';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/sys/Settings';
import React, {lazy} from "react";

export interface RouteMeta {
    title: string; // 路由名称（菜单显示）
    icon?: any; // 菜单图标
    hideInMenu?: boolean; // 是否显示在菜单中
    requireRoles?: string[];  // 需要的角色权限
}

export interface RouteConfig {
    path: string; // 路由路径
    key: string; // 路由唯一标识
    component?: React.ComponentType<any>; // 路由组件
    meta?: RouteMeta;
    children?: RouteConfig[]; // 子路由
}

export const appRouter = [
    {
        path: '/dashboard',
        key: 'dashboard',
        component: Dashboard,
        meta: {title: '主页', icon: DashboardOutlined}
    },
    {
        path: '/app',
        key: 'app',
        meta: {title: '应用', icon: ShoppingOutlined},
        children: [
            {
                path: '/bookList',
                key: 'bookList',
                component: lazy(() => import('../pages/app/BookList')),
                meta: {title: '模拟列表', icon: BookOutlined},
            },
            {
                path: '/product-list',
                key: 'product-list',
                component: lazy(() => import('../pages/app/ProductList')),
                meta: {title: '商品列表', icon: ShoppingOutlined}
            },
            {
                path: '/product/:id',
                key: 'product-list-detail',
                component: lazy(() => import('../pages/app/ProductDetail')),
                meta: {title: '商品详情', icon: AppstoreOutlined,hideInMenu: true},
            },
        ],
    },
    {
        path: '/sys',
        key: 'sys',
        name: '系统管理',
        meta: {title: '系统管理', icon: SettingOutlined},
        children: [
            {
                path: '/users',
                key: 'users',
                component: lazy(() => import('../pages/sys/UserList')),
                meta: {title: '用户管理', icon: UserOutlined, requireRoles: ['admin']},
            },
            {
                path: '/settings',
                key: 'settings',
                component: Settings,
                meta: {title: '系统设置', icon: ControlOutlined, requireRoles: ['admin', 'user']},
            },
            {
                path: '/log',
                key: 'log',
                component: lazy(() => import('../pages/sys/LogList')),
                meta: {title: '系统日志', icon: LoginOutlined, requireRoles: ['admin']},
            },
        ],
    },
    {
        path: '/profile',
        key: 'profile',
        component: lazy(() => import('../pages/sys/Profile')),
        meta: {title: '个人信息', icon: IdcardOutlined, hideInMenu: true, requireRoles: ['admin', 'user']},
    },
    {
        path: '/test',
        key: 'test',
        component: lazy(() => import('../pages/Test')),
        meta: {title: '测试页', icon: BugOutlined, requireRoles: ['admin', 'user']},
    },
    {
        path: '/about',
        key: 'about',
        component: lazy(() => import('../pages/About')),
        meta: {title: '系统说明', icon: InfoCircleOutlined, requireRoles: ['admin']},
    },
];

export const routes = [
    {
        path: '/',
        key: 'app',
        redirect: '/dashboard',
        children: appRouter
    },
    {
        path: '/login',
        key: 'login',
        component: lazy(() => import('../pages/Login')),
        meta: {title: '登录', icon: LoginOutlined, hideInMenu: true,},
    },
    {
        path: '/403',
        key: '403',
        component: lazy(() => import('../pages/error/Forbidden')),
        meta: {title: '无权限', icon: StopOutlined, hideInMenu: true,},
    },
    {
        path: '/404',
        key: '404',
        component: lazy(() => import('../pages/error/NotFound')),
        meta: {title: '未找到', icon: WarningOutlined, hideInMenu: true,},
    },
];

// 获取所有需要注册的路由（扁平化处理）
export const getRouteList = (routes) => {
    const result: RouteConfig[] = [];
    routes.forEach(route => {
        if (route.children && route.children.length > 0) {
            result.push(...getRouteList(route.children));
        } else if (route.component || route.redirect) {
            result.push(route);
        }
    });
    return result;
};

// 根据用户角色过滤路由
export const filterRoutesByRole = (routes: RouteConfig[], userRole?: string): RouteConfig[] => {
    return routes
        .map(route => {
            const requiredRoles = route.meta?.requireRoles;
            if (requiredRoles && requiredRoles.length > 0) {
                if (!userRole || !requiredRoles.includes(userRole)) {
                    return null;
                }
            }

            if (route.children) {
                const filteredChildren = filterRoutesByRole(route.children, userRole);
                if (filteredChildren.length === 0) {
                    return null;
                }
                return {...route, children: filteredChildren};
            }

            return route;
        })
        .filter(Boolean) as RouteConfig[];
};