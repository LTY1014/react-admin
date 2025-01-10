import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, theme } from 'antd';
import { store } from './store';
import Layout from './layouts/MainLayout';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import AuthProvider from './components/AuthProvider';

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
          <Layout />
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