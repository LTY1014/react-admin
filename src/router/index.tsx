import React, {Suspense} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import {appRouter, blankRouter, getRouteList} from './routes';
import {Skeleton, Spin} from "antd";
import config from '../config';
import MainLayout from '../layouts/MainLayout';
import BlankLayout from '../layouts/BlankLayout';

const authGuardEnabled = false;  // 是否启用AuthGuard

/**
 * 页面级居中加载骨架屏组件
 */
export const PageLoading: React.FC<{ fullScreen?: boolean }> = ({fullScreen = false}) => {
    if (fullScreen) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    width: '100%',
                }}
            >
                <Spin size="large" tip="页面加载中..." />
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '360px',
                padding: '24px 0',
                width: '100%',
            }}
        >
            <Spin size="large" />
            <div style={{width: '100%', marginTop: 24}}>
                <Skeleton active paragraph={{rows: 6}} />
            </div>
        </div>
    );
};

const AppRoutes = () => {
    const mainRouteList = getRouteList(appRouter);
    const blankRouteList = getRouteList(blankRouter);

    return (
        <Routes>
            {/* 空白布局路由（登录、错误页等，统一由 routes.ts 配置消费） */}
            <Route element={<BlankLayout/>}>
                {blankRouteList.map(route => {
                    const RouteComponent = route.component;
                    if (!RouteComponent) return null;

                    return (
                        <Route
                            key={route.key}
                            path={route.path}
                            element={
                                <Suspense fallback={<PageLoading fullScreen/>}>
                                    <RouteComponent/>
                                </Suspense>
                            }
                        />
                    );
                })}
            </Route>

            {/* 主布局路由 */}
            <Route element={<MainLayout/>}>
                {mainRouteList.map(route => {
                    const RouteComponent = route.component;
                    if (!RouteComponent) return null;

                    const routeElement = (
                        <Suspense fallback={<PageLoading/>}>
                            <RouteComponent/>
                        </Suspense>
                    );

                    return (
                        <Route
                            key={route.key}
                            path={route.path}
                            element={
                                authGuardEnabled ? (
                                    <AuthGuard requiredRoles={route.meta?.requireRoles}>
                                        {routeElement}
                                    </AuthGuard>
                                ) : (
                                    routeElement
                                )
                            }
                        />
                    );
                })}
                <Route index element={<Navigate to={config.homePath} replace/>}/>
                <Route path="*" element={<Navigate to="/404" replace/>}/>
            </Route>
        </Routes>
    );
};

export default AppRoutes;