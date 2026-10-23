import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {App as AntdApp, ConfigProvider, theme} from 'antd';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import AuthProvider from './components/AuthProvider';
import AppRoutes from './router';
import {AntdGlobal} from './utils/antdGlobal';
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
            <AntdApp>
                <AntdGlobal/>
                <BrowserRouter>
                    {authProviderEnabled ? (
                        <AuthProvider>{appRoutes}</AuthProvider>
                    ) : (
                        appRoutes
                    )}
                </BrowserRouter>
            </AntdApp>
        </ConfigProvider>
    );
}

export default App; 