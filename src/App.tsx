import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ConfigProvider, theme} from 'antd';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import AuthProvider from './components/AuthProvider';
import AppRoutes from './router';
import zhCN from 'antd/es/locale/zh_CN';

// 全局权限守卫总开关
const authProviderEnabled = true;

function App() {
    const {primaryColor, isDarkMode} = useSelector((state: RootState) => state.theme);
    const appRoutes = <AppRoutes/>;

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: primaryColor,
                },
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
            locale={zhCN}
        >
            <BrowserRouter>
                {authProviderEnabled ? (
                    <AuthProvider>{appRoutes}</AuthProvider>
                ) : (
                    appRoutes
                )}
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App; 