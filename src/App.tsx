import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, theme } from 'antd';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import BlankLayout from './layouts/BlankLayout';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import AuthProvider from './components/AuthProvider';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Forbidden from './pages/Forbidden';
import AppRoutes from './router';

const AppContent = () => {
  const { primaryColor, isDarkMode } = useSelector((state: RootState) => state.theme);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
        },
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* 空白布局路由 */}
            <Route element={<BlankLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/403" element={<Forbidden />} />
              <Route path="/404" element={<NotFound />} />
            </Route>
            
            {/* 主布局路由 */}
            <Route element={<MainLayout />}>
              <Route path="/*" element={<AppRoutes />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App; 