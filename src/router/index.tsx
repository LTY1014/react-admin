import React, {Suspense} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import {appRouter, getRouteList} from './routes';
import {Spin} from "antd";
import config from '../config';

const AppRoutes = () => {
    const routeList = getRouteList(appRouter);

    return (
        <Routes>
            {routeList.map(route => (
                <Route
                    key={route.key}
                    path={route.path}
                    element={
                        <AuthGuard requiredRoles={route.meta?.requireRoles}>
                            <Suspense fallback={<Spin/>}>
                                <route.component/>
                            </Suspense>
                        </AuthGuard>
                    }
                />
            ))}
            <Route index element={<Navigate to={config.homePath} replace/>}/>
            <Route path="*" element={<Navigate to="/404" replace/>}/>
        </Routes>
    );
};

export default AppRoutes; 