import {
    AppstoreOutlined,
    BugOutlined,
    ControlOutlined,
    DashboardOutlined,
    IdcardOutlined,
    LoginOutlined,
    SettingOutlined,
    ShoppingOutlined,
    StopOutlined,
    TeamOutlined,
    WarningOutlined
} from '@ant-design/icons';
import Dashboard from '../pages/Dashboard';
import UserList from '../pages/sys/UserList';
import ProductList from '../pages/app/ProductList';
import ProductCategory from '../pages/app/ProductCategory';
import ProductDetail from '../pages/app/ProductDetail';
import Settings from '../pages/sys/Settings';
import Profile from '../pages/sys/Profile';
import BookList from "../pages/app/BookList";
import Test from "../pages/Test";
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
                component: BookList,
                meta: {title: '模拟列表', icon: AppstoreOutlined},
            },
            {
                path: '/product-list',
                key: 'product-list',
                component: ProductList,
                meta: {title: '商品列表', icon: AppstoreOutlined}
            },
            {
                path: '/product/:id',
                key: 'product-list-detail',
                component: ProductDetail,
                meta: {title: '商品详情', icon: AppstoreOutlined,hideInMenu: true},
            },
            {
                path: '/product-category',
                key: 'product-category',
                component: ProductCategory,
                meta: {title: '商品分类', icon: AppstoreOutlined},
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
                component: UserList,
                meta: {title: '用户管理', icon: TeamOutlined, requireRoles: ['admin']},
            },
            {
                path: '/settings',
                key: 'settings',
                component: Settings,
                meta: {title: '系统设置', icon: ControlOutlined, requireRoles: ['admin', 'user']},
            },
        ],
    },
    {
        path: '/profile',
        key: 'profile',
        component: Profile,
        meta: {title: '个人信息', icon: IdcardOutlined, hideInMenu: true, requireRoles: ['admin', 'user']},
    },
    {
        path: '/test',
        key: 'test',
        component: Test,
        meta: {title: '测试页', icon: BugOutlined, requireRoles: ['admin', 'user']},
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