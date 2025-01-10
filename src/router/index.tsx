import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import UserList from '../pages/UserList';
import RoleList from '../pages/RoleList';
import ProductList from '../pages/ProductList';
import ProductCategory from '../pages/ProductCategory';
import Settings from '../pages/Settings';
import Login from '../pages/Login';
import AuthGuard from '../components/AuthGuard';
import Forbidden from '../pages/Forbidden';
import NotFound from '../pages/NotFound';
import Profile from "../pages/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/403" element={<Forbidden />} />
      <Route path="/404" element={<NotFound />} />
      
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={
        <AuthGuard>
          <Dashboard />
        </AuthGuard>
      } />

    <Route path="/profile" element={
        <AuthGuard>
            <Profile />
        </AuthGuard>
    } />
      
      {/* 用户管理路由 */}
      <Route path="/users" element={
        <AuthGuard requiredRoles={['admin']}>
          <UserList />
        </AuthGuard>
      } />
      <Route path="/roles" element={
        <AuthGuard requiredRoles={['admin']}>
          <RoleList />
        </AuthGuard>
      } />
      
      {/* 商品管理路由 */}
      <Route path="/product-list" element={
        <AuthGuard>
          <ProductList />
        </AuthGuard>
      } />
      <Route path="/product-category" element={
        <AuthGuard>
          <ProductCategory />
        </AuthGuard>
      } />
      
      {/* 系统设置路由 */}
      <Route path="/settings" element={
        <AuthGuard requiredRoles={['admin']}>
          <Settings />
        </AuthGuard>
      } />
      
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes; 