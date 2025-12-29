import React, {useEffect, useState} from 'react';
import {Alert, Avatar, Card, Col, Descriptions, List, Progress, Row, Space, Statistic, Tag, Typography} from 'antd';
import {
    AimOutlined,
    ApiOutlined,
    AppstoreOutlined,
    ArrowUpOutlined,
    BookOutlined,
    BranchesOutlined,
    ClockCircleOutlined,
    CloudServerOutlined,
    CodeOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    FileDoneOutlined,
    GithubOutlined,
    GlobalOutlined,
    HeatMapOutlined,
    RocketOutlined,
    SafetyCertificateOutlined,
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

    const announcements = [
        {
            label: '公告',
            title: 'react-admin 5.0.0 正式版发布',
            date: '2023-09-01',
        },
        {
            label: '更新',
            title: 'react-admin 5.0.0 升级指南',
            date: '2023-09-01',
        },
    ]

    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const data = [
        {
            key: '1',
            label: 'React',
            value: 'v18.2.0'
        },
        {
            key: '2',
            label: 'antd',
            value: 'v5.14.1',
        },
        {
            key: '3',
            label: 'axios',
            value: 'v1.6.7',
        },
        {
            key: '4',
            label: 'dayjs',
            value: 'v1.11.13',
        },
        {
            key: '5',
            label: 'lodash',
            value: 'v4.17.21',
        },
        {
            key: '6',
            label: 'react-redux',
            value: 'v9.1.0',
        },
    ];
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

    function FrontStack() {
        return <Card title="前端技术栈" style={{marginTop: 8}}>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item key={item.key}>
                        <Card title={item.label}>{item.value}</Card>
                    </List.Item>
                )}
            />

            <Descriptions title="技术栈" bordered items={
                data.map(item => ({
                    label: item.label,
                    children: item.value,
                }))
            }/>
        </Card>;
    }

    function Welcome() {
        return <Card style={{marginBottom: 16}}>
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
        </Card>;
    }

    function ProjectStack() {
        return <Card style={{marginBottom: 8}} bodyStyle={{padding: '0px 24px 16px'}}>
            <Row gutter={[16, 12]}>
                <Col xs={24} md={12}>
                    <Typography>
                        <Title level={4}>
                            <DashboardOutlined/> 技术栈说明
                        </Title>
                        <Paragraph>
                            <Space direction="vertical" size="middle" style={{width: '100%'}}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Text strong style={{minWidth: '100px'}}><CodeOutlined/> 前端技术：</Text>
                                    <Text type="secondary">React 18 + TypeScript + Ant Design</Text>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Text strong style={{minWidth: '100px'}}><ApiOutlined/> 后端技术：</Text>
                                    <Text type="secondary">Spring Boot + MyBatis-Plus</Text>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Text strong style={{minWidth: '100px'}}><DatabaseOutlined/> 数据库：</Text>
                                    <Text type="secondary">MySQL 5.7</Text>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Text strong style={{minWidth: '100px'}}><SafetyCertificateOutlined/> 接口文档：</Text>
                                    <Text type="secondary">Knife4j</Text>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Text strong style={{minWidth: '100px'}}><HeatMapOutlined/> 打包体积：</Text>
                                    <Text type="secondary">2M</Text>
                                </div>
                            </Space>
                        </Paragraph>
                    </Typography>
                </Col>
                <Col xs={24} md={12}>
                    <Typography>
                        <Title level={4}>
                            <AppstoreOutlined/> 项目信息
                        </Title>
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label={<Space><GithubOutlined/> 项目地址</Space>}>
                                <a href="https://gitee.com/liang-tian-yu" target="_blank" rel="noopener noreferrer">
                                    https://gitee.com/liang-tian-yu
                                </a>
                            </Descriptions.Item>
                            <Descriptions.Item label={<Space><GlobalOutlined/> 在线文档</Space>}>
                                <a href="http://localhost:8088/doc.html" target="_blank" rel="noopener noreferrer">
                                    http://localhost:8088/doc.html
                                </a>
                            </Descriptions.Item>
                            <Descriptions.Item label={<Space><RocketOutlined/> 部署环境</Space>}>
                                <Tag color="blue">开发环境</Tag>
                                <Tag color="green">测试环境</Tag>
                                <Tag color="orange">预发环境</Tag>
                                <Tag color="red">生产环境</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label={<Space><ToolOutlined/> 开发工具</Space>}>
                                <Tag color="purple">IDEA</Tag>
                                <Tag color="cyan">WebStorm</Tag>
                                <Tag color="red">Git</Tag>
                                <Tag color="green">Maven</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label={<Space><BranchesOutlined/> 版本控制</Space>}>
                                <Tag color="red">Git</Tag>
                                <Tag color="green">GitHub</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label={<Space><CloudServerOutlined/> 服务器</Space>}>
                                <Tag color="blue">CentOS</Tag>
                                <Tag color="green">Nginx</Tag>
                                <Tag color="orange">Docker</Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </Typography>
                </Col>
            </Row>
        </Card>;
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
                    style={{marginBottom: 16}}
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

    //endregion 组件结束

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={16}>
                    {Welcome()}
                    {ProjectStack()}
                </Col>
                <Col span={8}>
                    {/* 快速访问、最近访问、公告 */}
                    <Card
                        title="快速访问"
                        extra={<a onClick={() => {
                        }}>查看更多</a>}
                    >
                        <List
                            grid={{gutter: 16, xs: 1, sm: 1, md: 3, lg: 3, xl: 3, xxl: 3,}}
                            dataSource={quickAccess}
                            renderItem={item => (
                                <List.Item>
                                    <Card
                                        onClick={item.onClick}
                                        style={{cursor: 'pointer', height: '100%'}}
                                    >
                                        <Space direction="vertical" align="center" style={{width: '100%'}}>
                                            <div style={{fontSize: '24px'}}>
                                                {item.icon}
                                            </div>
                                            <div>{item.title}</div>
                                        </Space>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Card>
                    <Card title="公告" styles={{body: {padding: '12px'}}}>
                        <List
                            grid={{gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1,}}
                            dataSource={announcements}
                            renderItem={item => (
                                <List.Item>
                                    <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                        <Tag color={item.label === '公告' ? 'red' : 'blue'}>
                                            {item.label}
                                        </Tag>
                                        <Text ellipsis style={{flex: 1, margin: '0 8px'}}>
                                            {item.title}
                                        </Text>
                                        <Text type="secondary" style={{marginLeft: 'auto'}}>
                                            {item.date}
                                        </Text>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {StatsCard()}
                {/* 统计卡片 */}
                {StatsCompare()}
                {/* 系统状态 */}
                {SystemState()}
            </Row>
            {FrontStack()}
        </div>
    );
};

export default Dashboard; 