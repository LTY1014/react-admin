import React, {useState} from 'react';
import {Layout, theme} from 'antd';
import {Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import TabsNav from './components/TabsNav';
import RightContent from './components/RightContent';
import SiderMenu from './components/SiderMenu';
import TopMenu from './components/TopMenu';

const {Header, Content} = Layout;

const renderHeader = false // 控制是否展示信息头

const MainLayout: React.FC = () => {
    const {menuMode} = useSelector((state: RootState) => state.theme);
    const [collapsed, setCollapsed] = useState(false);  // 侧边菜单栏展开

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    // 渲染菜单
    const renderMenu = () => {
        if (menuMode === 'sider') {
            return <SiderMenu collapsed={collapsed} onCollapse={setCollapsed}/>;
        }
        return null;
    };

    // 渲染头部左侧内容
    const renderHeaderLeft = () => {
        if (menuMode === 'sider') {
            return <div></div>
            // return (
            //     <div>
            //         <Button
            //             type="text"
            //             icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
            //             onClick={() => setCollapsed(!collapsed)}
            //             style={{width: 'auto'}}
            //         />
            //     </div>
            // );
        }
        return <TopMenu/>;
    };

    return (
        // SiderMenu 是封装组件，显式声明侧栏，避免挂载后才从纵向切换成横向布局。
        <Layout hasSider={menuMode === 'sider'} style={{minHeight: '100vh'}}>
            {renderMenu()}
            <Layout style={{minWidth: 0}}>
                {renderHeader &&
                    <>
                        <Header style={{
                            padding: '24px 16px',
                            background: colorBgContainer,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            boxShadow: '0 1px 4px rgba(0,21,41,.08)',
                            maxHeight: 48,
                        }}>
                            {renderHeaderLeft()}
                            <RightContent/>
                        </Header>
                        {/* Tab 组件：使用 CSS sticky 吸顶 */}
                        <div
                            style={{
                                position: 'sticky',
                                top: 0,
                                zIndex: 10,
                            }}
                        >
                            <TabsNav/>
                        </div>
                    </>
                }
                <Content
                    style={{
                        margin: '0 16px 24px',
                        minHeight: 280,
                    }}
                >
                    <div style={{
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}>
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
