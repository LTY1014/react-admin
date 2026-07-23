import React, {Suspense} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import {appRouter, getRouteList} from './routes';
import {Spin} from "antd";
import config from '../config';

const authGuardEnabled = false;  // 是否启用AuthGuard

const AppRoutes = () => {
    const routeList = getRouteList(appRouter);

    return (
        <Routes>
            {routeList.map(route => {
                const RouteComponent = route.component;
                if (!RouteComponent) return null;

                const routeElement = (
                    <Suspense fallback={<Spin/>}>
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
        </Routes>
    );
};

export default AppRoutes;