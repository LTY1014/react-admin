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
import Login from '../pages/Login';
import NotFound from '../pages/error/NotFound';
import Forbidden from '../pages/error/Forbidden';
import BookList from "../pages/app/BookList";
import Test from "../pages/Test";
import React from "react";

export interface RouteConfig {
    path: string;           // 路由路径
    key: string;           // 路由唯一标识
    component: React.ComponentType<any>; // 路由组件
    name: string;          // 路由名称（菜单显示）
    icon?: React.ComponentType<any>;    // 菜单图标
    isMenu?: boolean;      // 是否显示在菜单中
    requireRoles?: string[]; // 需要的角色权限
    children?: RouteConfig[]; // 子路由
}

export const routes: RouteConfig[] = [
    {
        path: '/dashboard',
        key: 'dashboard',
        component: Dashboard,
        name: '主页',
        icon: DashboardOutlined,
        isMenu: true,
    },
    {
        path: '/app',
        key: 'app',
        name: 'Example',
        icon: ShoppingOutlined,
        isMenu: true,
        children: [
            {
                path: '/bookList',
                key: 'bookList',
                component: BookList,
                name: '模拟列表',
                icon: AppstoreOutlined,
                isMenu: true,
            },
            {
                path: '/product-list',
                key: 'product-list',
                component: ProductList,
                name: '商品列表',
                icon: AppstoreOutlined,
                isMenu: true,
            },
            {
                path: '/product/:id',
                key: 'product-list-detail',
                component: ProductDetail,
                name: '商品详情',
                icon: AppstoreOutlined,
                isMenu: false,
            },
            {
                path: '/product-category',
                key: 'product-category',
                component: ProductCategory,
                name: '商品分类',
                icon: AppstoreOutlined,
                isMenu: true,
            },
        ],
    },
    {
        path: '/sys',
        key: 'sys',
        name: '系统管理',
        icon: SettingOutlined,
        isMenu: true,
        children: [
            {
                path: '/users',
                key: 'users',
                component: UserList,
                name: '用户列表',
                icon: TeamOutlined,
                isMenu: true,
                requireRoles: ['admin'],
            },
            {
                path: '/settings',
                key: 'settings',
                component: Settings,
                name: '系统设置',
                icon: ControlOutlined,
                isMenu: true,
                requireRoles: ['admin', 'user'],
            },
        ],
    },
    {
        path: '/profile',
        key: 'profile',
        component: Profile,
        name: '个人信息',
        icon: IdcardOutlined,
        requireRoles: ['admin', 'user'],
    },
    {
        path: '/test',
        key: 'test',
        component: Test,
        name: '测试页',
        icon: BugOutlined,
        isMenu: true,
    },
    {
        path: '/login',
        key: 'login',
        component: Login,
        name: '登录',
        icon: LoginOutlined
    },
    {
        path: '/403',
        key: '403',
        component: Forbidden,
        name: '无权限',
        icon: StopOutlined
    },
    {
        path: '/404',
        key: '404',
        component: NotFound,
        name: '未找到',
        icon: WarningOutlined
    },
];

// 获取所有需要注册的路由（扁平化处理）
export const getRouteList = (routes: RouteConfig[]): RouteConfig[] => {
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
                return {...route, children: filteredChildren};
            }

            return route;
        })
        .filter(Boolean) as RouteConfig[];
}; 