import React, {Suspense} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import {appRouter, getRouteList} from './routes';
import {Spin} from "antd";

const AppRoutes = () => {
    const routeList = getRouteList(appRouter);

    return (
        <Routes>
            {routeList.map(route => (
                <Route
                    key={route.key}
                    path={route.path.replace('/', '')}
                    element={
                        !route.meta?.hideInMenu ? (
                            <AuthGuard requiredRoles={route.meta?.requireRoles}>
                                <Suspense fallback={<Spin/>}>
                                    <route.component/>
                                </Suspense>
                            </AuthGuard>
                        ) : (
                            <Suspense fallback={<Spin/>}>
                                <route.component/>
                            </Suspense>
                        )
                    }
                />
            ))}
            <Route index element={<Navigate to="dashboard" replace/>}/>
            <Route path="*" element={<Navigate to="/404" replace/>}/>
        </Routes>
    );
};

export default AppRoutes; 