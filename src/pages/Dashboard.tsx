import React, {useEffect, useState} from 'react';
import {Avatar, Card, Col, Progress, Row, Space, Statistic, Tag, Typography, theme} from 'antd';
import {
    AimOutlined,
    ApiOutlined,
    AppstoreOutlined,
    ArrowUpOutlined,
    BookOutlined,
    ClockCircleOutlined,
    DashboardOutlined,
    FileDoneOutlined,
    FireOutlined,
    SmileOutlined,
    TeamOutlined,
    ToolOutlined,
    TrophyOutlined,
    UserOutlined
} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useNavigate} from "react-router-dom";

const {Title, Text} = Typography;

const Dashboard: React.FC = () => {

    // 读取当前主题 token（跟随 ConfigProvider 的主色 / 暗色模式）
    const {
        token: {
            borderRadiusLG,
            colorPrimary,
            colorPrimaryActive,
            colorPrimaryBg,
            colorSuccess,
            colorWarning,
            colorError,
            colorInfo,
            colorText,
            colorTextSecondary,
            colorTextTertiary,
            colorBorderSecondary,
            colorSplit,
            colorFillTertiary,
            colorFillQuaternary,
            borderRadius,
        },
    } = theme.useToken();

    /* ---------- 通用面板内联样式（跟随主题 token） ---------- */
    const panelCardStyle: React.CSSProperties = {
        flex: 1,
        width: '100%',
    };
    const panelTitleStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 15,
        fontWeight: 600,
        color: colorText,
    };
    const panelTitleIconStyle: React.CSSProperties = {
        width: 30,
        height: 30,
        borderRadius: borderRadius,
        fontSize: 15,
        color: colorPrimary,
        background: colorPrimaryBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const panelExtraStyle: React.CSSProperties = {
        fontSize: 12,
        color: colorTextSecondary,
    };

    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    const [userStats, setUserStats] = useState({
        total: 0,
        adminCount: 0,
        userCount: 0,
        activeUsers: 0,
    });
    const [appStats, setAppStats] = useState({
        total: 0,
        available: 0,
    });
    const [systemStatus, setSystemStatus] = useState({
        cpu: 45,
        memory: 60,
        disk: 30,
    });

    const quickAccess = [
        {
            title: '用户管理',
            icon: <UserOutlined/>,
            onClick: () => navigate('/users'),
        },
        {
            title: '业务管理',
            icon: <AppstoreOutlined/>,
            onClick: () => navigate('/bookList'),
        },
        {
            title: '系统设置',
            icon: <ToolOutlined/>,
            onClick: () => navigate('/settings'),
        }
    ]

    const activities = [
        {text: '管理员登录了系统', time: '10 分钟前', color: colorPrimary},
        {text: '新增用户：张三', time: '32 分钟前', color: colorSuccess},
        {text: '业务模块已发布', time: '1 小时前', color: colorWarning},
        {text: '系统完成自动备份', time: '2 小时前', color: colorInfo},
        {text: '有 3 条新的待办事项', time: '3 小时前', color: colorError},
    ];

    const quickStats = [
        {
            title: '任务',
            value: 1128,
            icon: <AimOutlined/>,
            textColor: colorPrimary,
        },
        {
            title: '文档',
            value: 76,
            icon: <FileDoneOutlined/>,
            textColor: colorSuccess,
        },
        {
            title: '项目',
            value: 90,
            icon: <TrophyOutlined/>,
            textColor: colorWarning,
        },
        {
            title: '接口',
            value: 68,
            icon: <ApiOutlined/>,
            textColor: colorInfo,
        },
    ];

    const fetchData = async () => {
        try {
            // 模拟数据
            setUserStats({
                total: 10,
                adminCount: 1,
                userCount: 9,
                activeUsers: Math.floor(Math.random() * 100),
            })

            setAppStats({
                total: 10,
                available: Math.floor(Math.random() * 10),
            });
        } catch (error) {
            console.error('获取数据失败:', error);
        }
    };

    useEffect(() => {
        fetchData();
        // 模拟系统状态更新
        const timer = setInterval(() => {
            setSystemStatus({
                cpu: Math.floor(Math.random() * 100),
                memory: Math.floor(Math.random() * 100),
                disk: Math.floor(Math.random() * 100),
            });
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    //region 组件开始
    function Welcome() {
        return <>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card style={{marginBottom: 16}}>
                        <Row align="middle" gutter={24}>
                            <Col>
                                <Avatar size={64} icon={<UserOutlined/>}/>
                            </Col>
                            <Col flex="auto">
                                <Typography.Title level={4} style={{margin: 0}}>
                                    <SmileOutlined style={{marginRight: 8}}/>
                                    欢迎回来，{user?.userName || '访客'}
                                </Typography.Title>
                                <Typography.Text type="secondary">
                                    今天是 {new Date().toLocaleDateString('zh-CN', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                                </Typography.Text>
                            </Col>
                            <Col>
                                <Space>
                                    <Tag color="blue">{user?.userRole || '访客'}</Tag>
                                    <Tag color="green">在线</Tag>
                                </Space>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    }

    function StatsCompare() {
        return <>
            <Col xs={24} sm={12} md={6}>
                <Card>
                    <Statistic
                        title="总用户数"
                        value={userStats.total}
                        prefix={<UserOutlined/>}
                        valueStyle={{color: colorSuccess}}
                    />
                    <div style={{marginTop: 8}}>
                        <Text type="secondary">较昨日 <ArrowUpOutlined/> 12%</Text>
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
                <Card>
                    <Statistic
                        title="管理员数量"
                        value={userStats.adminCount}
                        prefix={<TeamOutlined/>}
                        valueStyle={{color: colorPrimary}}
                    />
                    <div style={{marginTop: 8}}>
                        <Text type="secondary">较昨日 <ArrowUpOutlined/> 5%</Text>
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
                <Card>
                    <Statistic
                        title="业务数量"
                        value={appStats.total}
                        prefix={<BookOutlined/>}
                        valueStyle={{color: colorError}}
                    />
                    <div style={{marginTop: 8}}>
                        <Text type="secondary">可用：{appStats.available}</Text>
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
                <Card>
                    <Statistic
                        title="活跃用户"
                        value={userStats.activeUsers}
                        prefix={<ClockCircleOutlined/>}
                        valueStyle={{color: '#722ed1'}}
                    />
                    <div style={{marginTop: 8}}>
                        <Text type="secondary">较昨日 <ArrowUpOutlined/> 8%</Text>
                    </div>
                </Card>
            </Col>
        </>;
    }

    function StatsCard() {
        return <>
            {quickStats.map((stat, index) => (
                <Col span={6} key={index}>
                    <Card
                        style={{
                            textAlign: 'center',
                            padding: '24px 16px',
                            borderRadius: borderRadiusLG,
                            height: '120px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <div style={{textAlign: 'center', marginBottom: '24px'}}>
                            <Title level={5} style={{color: stat.textColor}}>{stat.title}</Title>
                            <Statistic
                                style={{
                                    fontSize: '12px',
                                    color: colorTextTertiary
                                }}
                                value={stat.value}
                                valueStyle={{color: stat.textColor, fontSize: '28px', fontWeight: 600, lineHeight: 1.2}}
                                prefix={stat.icon}
                            />
                        </div>
                    </Card>
                </Col>
            ))}
        </>;
    }

    /* ---------- 系统状态 ---------- */
    const SystemStatusPanel = () => {
        const items = [
            {name: 'CPU 使用率', value: systemStatus.cpu, icon: <FireOutlined/>},
            {name: '内存使用率', value: systemStatus.memory, icon: <DashboardOutlined/>},
            {name: '磁盘使用率', value: systemStatus.disk, icon: <AimOutlined/>},
        ];
        return (
            <Card
                style={panelCardStyle}
                styles={{body: {padding: '20px 24px'}}}
                title={
                    <div style={panelTitleStyle}>
                        <span style={panelTitleIconStyle}><DashboardOutlined/></span>
                        系统状态
                    </div>
                }
                extra={<span style={panelExtraStyle}><Tag color="success" style={{borderRadius: 8}}>运行正常</Tag></span>}
            >
                {items.map((item, index) => (
                    <div
                        style={{
                            marginBottom: index === items.length - 1 ? 0 : 22,
                        }}
                        key={item.name}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 8,
                        }}>
                            <span style={{
                                fontSize: 13,
                                color: colorTextSecondary,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                            }}>
                                <span style={{color: colorPrimary}}>{item.icon}</span>
                                {item.name}
                            </span>
                            <span style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: colorText,
                                fontVariantNumeric: 'tabular-nums',
                            }}>{item.value}%</span>
                        </div>
                        <Progress
                            percent={item.value}
                            showInfo={false}
                            strokeColor={{from: colorPrimary, to: colorPrimaryActive}}
                            strokeWidth={10}
                            trailColor={colorFillTertiary}
                            status={item.value > 80 ? 'exception' : 'normal'}
                        />
                    </div>
                ))}
            </Card>
        );
    };

    /* ---------- 快捷入口 ---------- */
    const QuickAccessPanel = () => (
        <Card
            style={panelCardStyle}
            styles={{body: {padding: '16px'}}}
            title={
                <div style={panelTitleStyle}>
                    <span style={panelTitleIconStyle}><AppstoreOutlined/></span>
                    快捷入口
                </div>
            }
        >
            <Row gutter={[12, 12]}>
                {quickAccess.map((item, i) => (
                    <Col xs={12} sm={8} key={i}>
                        <div
                            className="dash-quick-item"
                            style={{
                                borderRadius: borderRadiusLG,
                                border: `1px solid ${colorBorderSecondary}`,
                                padding: '18px 12px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                                height: '100%',
                            }}
                            onClick={item.onClick}
                        >
                            <div style={{
                                width: 44,
                                height: 44,
                                margin: '0 auto 10px',
                                borderRadius: borderRadiusLG,
                                fontSize: 20,
                                color: colorPrimary,
                                background: colorPrimaryBg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                {item.icon}
                            </div>
                            <div style={{
                                fontSize: 13,
                                color: colorText,
                            }}>
                                {item.title}
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Card>
    );

    /* ---------- 最近动态 ---------- */
    const ActivityPanel = () => (
        <Card
            style={panelCardStyle}
            styles={{body: {padding: '12px 24px'}}}
            title={
                <div style={panelTitleStyle}>
                    <span style={panelTitleIconStyle}><ClockCircleOutlined/></span>
                    最近动态
                </div>
            }
        >
            <div>
                {activities.map((item, i) => (
                    <div
                        style={{
                            display: 'flex',
                            gap: 12,
                            padding: '10px 0',
                            borderBottom: i === activities.length - 1 ? 'none' : `1px dashed ${colorSplit}`,
                        }}
                        key={i}
                    >
                        <span style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            marginTop: 7,
                            flex: '0 0 8px',
                            boxShadow: `0 0 0 3px ${colorFillQuaternary}`,
                            background: item.color,
                        }}/>
                        <div style={{
                            flex: 1,
                            fontSize: 13,
                            color: colorText,
                            lineHeight: 1.6,
                        }}>
                            {item.text}
                            <span style={{
                                color: colorTextTertiary,
                                marginLeft: 8,
                                fontSize: 12,
                            }}>{item.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );

    //endregion 组件结束

    return (
        <div>
            {Welcome()}
            <Row gutter={[16, 16]}>
                {StatsCard()}
                {/* 统计卡片 */}
                {StatsCompare()}
            </Row>
            <Row gutter={[16, 16]} style={{marginTop: 16, alignItems: 'stretch'}}>
                <Col xs={24} lg={8} style={{display: 'flex'}}>
                    <QuickAccessPanel/>
                </Col>
                <Col xs={24} lg={8} style={{display: 'flex'}}>
                    <SystemStatusPanel/>
                </Col>
                <Col xs={24} lg={8} style={{display: 'flex'}}>
                    <ActivityPanel/>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
