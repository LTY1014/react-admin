import React, {useEffect, useState} from 'react';
import {Alert, Avatar, Card, Col, List, Progress, Row, Space, Statistic, Tag, Typography} from 'antd';
import {
    AimOutlined,
    ApiOutlined,
    AppstoreOutlined,
    ArrowUpOutlined,
    BookOutlined,
    ClockCircleOutlined,
    FileDoneOutlined,
    SmileOutlined,
    TeamOutlined,
    ToolOutlined,
    TrophyOutlined,
    UserOutlined
} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useNavigate} from "react-router-dom";

const {Title, Paragraph, Text} = Typography;

const Dashboard: React.FC = () => {

    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

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

    const quickStats = [
        {
            title: '任务',
            value: 1128,
            icon: <AimOutlined/>,
            color: '#e6f7ff',
            textColor: '#1890ff',
        },
        {
            title: '文档',
            value: 76,
            icon: <FileDoneOutlined/>,
            color: '#f6ffed',
            textColor: '#52c41a',
        },
        {
            title: '项目',
            value: 90,
            icon: <TrophyOutlined/>,
            color: '#fff7e6',
            textColor: '#fa8c16',
        },
        {
            title: '接口',
            value: 968,
            icon: <ApiOutlined/>,
            color: '#f0f5ff',
            textColor: '#1d39c4',
        },
    ];

    const fetchData = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
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
    function StatsCard() {
        return <Row gutter={[16, 16]} style={{width: '100%'}}>
            <Col span={6}>
                <Card>
                    <Statistic
                        title="任务"
                        value={1128}
                        prefix={<AimOutlined/>}
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic
                        title="文档"
                        value={76}
                        prefix={<FileDoneOutlined/>}
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic
                        title="项目"
                        value={90}
                        prefix={<TrophyOutlined/>}
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card>
                    <Statistic
                        title="接口"
                        value={968}
                        prefix={<ApiOutlined/>}
                    />
                </Card>
            </Col>
        </Row>;
    }

    function Welcome() {
        return <>
            <Row gutter={[16, 16]}>
                <Col span={16}>
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
                <Col span={8}>
                    <Card styles={{body: {padding: '18px 16px 2px'}}}>
                        <List
                            grid={{gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3}}
                            dataSource={quickAccess}
                            renderItem={item => (
                                <List.Item>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                        }}
                                        onClick={item.onClick} // 使用定义好的onClick事件
                                    >
                                        <Card
                                            size="small"
                                            style={{width: "100%", height: 80, textAlign: 'center', borderRadius: 8}}
                                            hoverable
                                        >
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center'
                                            }}>
                                                <div style={{
                                                    fontSize: '24px',
                                                    color: '#1890ff'
                                                }}>
                                                    {item.icon}
                                                </div>
                                                <div style={{
                                                    fontSize: '12px',
                                                    color: 'rgba(0, 0, 0, 0.85)'
                                                }}>
                                                    {item.title}
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </List.Item>
                            )}
                        />
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
                        valueStyle={{color: '#3f8600'}}
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
                        valueStyle={{color: '#1890ff'}}
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
                        valueStyle={{color: '#cf1322'}}
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

    function SystemState() {
        return <Col span={24}>
            <Card title="系统状态">
                <Alert
                    message="系统运行正常"
                    description="所有服务正常运行中，无异常情况。"
                    type="success"
                    showIcon
                    style={{marginBottom: 16, marginTop: -8}}
                />
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <div style={{textAlign: 'center'}}>
                            <Progress
                                type="dashboard"
                                percent={systemStatus.cpu}
                                status={systemStatus.cpu > 80 ? 'exception' : 'normal'}
                            />
                            <div style={{marginTop: 8}}>CPU使用率</div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{textAlign: 'center'}}>
                            <Progress
                                type="dashboard"
                                percent={systemStatus.memory}
                                status={systemStatus.memory > 80 ? 'exception' : 'normal'}
                            />
                            <div style={{marginTop: 8}}>内存使用率</div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{textAlign: 'center'}}>
                            <Progress
                                type="dashboard"
                                percent={systemStatus.disk}
                                status={systemStatus.disk > 80 ? 'exception' : 'normal'}
                            />
                            <div style={{marginTop: 8}}>磁盘使用率</div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Col>;
    }

    function StatsCard() {
        return <>
            {quickStats.map((stat, index) => (
                <Col span={6} key={index}>
                    <Card
                        style={{
                            textAlign: 'center',
                            padding: '24px 16px',
                            borderRadius: '8px',
                            height: '120px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            background: stat.color,
                        }}
                    >
                        <div style={{textAlign: 'center', marginBottom: '24px'}}>
                            <Title level={5} style={{color: stat.textColor}}>{stat.title}</Title>
                            <Statistic
                                style={{
                                    fontSize: '12px',
                                    color: '#888'
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

    //endregion 组件结束

    return (
        <div>
            {Welcome()}
            <Row gutter={[16, 16]}>
                {StatsCard()}
                {/* 统计卡片 */}
                {StatsCompare()}
                {/* 系统状态 */}
                {SystemState()}
            </Row>
        </div>
    );
};

export default Dashboard; 