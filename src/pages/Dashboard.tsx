import React, {useEffect, useState} from 'react';
import {
    Alert,
    Avatar,
    Card,
    Col,
    Descriptions,
    List,
    Progress,
    Row,
    Space,
    Statistic,
    Table,
    Tag,
    Typography
} from 'antd';
import {
    AimOutlined,
    ApiOutlined,
    AppstoreOutlined,
    ArrowUpOutlined,
    BookOutlined,
    BranchesOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloudServerOutlined,
    CodeOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    FileDoneOutlined,
    GithubOutlined,
    GlobalOutlined,
    RocketOutlined,
    SafetyCertificateOutlined,
    SmileOutlined,
    TeamOutlined,
    ToolOutlined,
    TrophyOutlined,
    UserOutlined
} from '@ant-design/icons';
import {getListUserByPage} from "@/api/user";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useNavigate} from "react-router-dom";
import {getListBookByPage} from "@/api/book";

const {Title, Paragraph, Text} = Typography;

const Dashboard: React.FC = () => {
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

    const columns = [
        {
            title: 'react-admin',
            dataIndex: 'technology',
            key: 'technology',
        },
        {
            title: '版本',
            dataIndex: 'version',
            key: 'version',
        }
    ];

    const [userStats, setUserStats] = useState({
        total: 0,
        adminCount: 0,
        userCount: 0,
        activeUsers: 0,
    });
    const [bookStats, setBookStats] = useState({
        total: 0,
        available: 0,
    });
    const [recentUsers, setRecentUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [systemStatus, setSystemStatus] = useState({
        cpu: 45,
        memory: 60,
        disk: 30,
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            // 获取用户数据
            // const userRes = await getListUserByPage({
            //     current: 1,
            //     pageSize: 10,
            // });
            // if (userRes.code === 0 && userRes.data) {
            //     const users = userRes?.data?.records || [];
            //     setUserStats({
            //         total: userRes?.data?.total || 0,
            //         adminCount: users.filter(user => user.userRole === 'admin').length,
            //         userCount: users.filter(user => user.userRole === 'user').length,
            //         activeUsers: Math.floor(Math.random() * 100), // 模拟活跃用户数
            //     });
            //     setRecentUsers(users);
            // }
            //
            // // 获取图书数据
            // const bookRes = await getListBookByPage({
            //     current: 1,
            //     pageSize: 1,
            // });
            // if (bookRes.code === 0 && bookRes.data?.total) {
            //     setBookStats({
            //         total: bookRes.data.total,
            //         available: Math.floor(Math.random() * bookRes.data.total), // 模拟可用图书数
            //     });
            // }

            // 模拟数据
            setUserStats({
                total: 10,
                adminCount: 1,
                userCount: 9,
                activeUsers: Math.floor(Math.random() * 100),
            })

            setBookStats({
                total: 10,
                available: Math.floor(Math.random() * 10),
            });
        } catch (error) {
            console.error('获取数据失败:', error);
        } finally {
            setLoading(false);
        }
    };

    const userColumns = [
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '账号',
            dataIndex: 'userAccount',
            key: 'userAccount',
        },
        {
            title: '角色',
            dataIndex: 'userRole',
            key: 'userRole',
            render: (role: string) => (
                <Tag color={role === 'admin' ? 'success' : 'warning'}>
                    {role === 'admin' ? '管理员' : '用户'}
                </Tag>
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '状态',
            key: 'status',
            render: () => (
                <Tag icon={<CheckCircleOutlined/>} color="success">
                    活跃
                </Tag>
            ),
        },
    ];

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
        return <Row gutter={[16, 16]}>
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
        return <Card title="前端技术栈" style={{marginTop: 16}}>
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
                        欢迎回来，{user.userName}
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
                        <Tag color="blue">{user.userRole}</Tag>
                        <Tag color="green">在线</Tag>
                    </Space>
                </Col>
            </Row>
        </Card>;
    }

    function ProjectStack() {
        return <Card style={{marginBottom: 16}}>
            <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                    <Typography>
                        <Title level={4}>
                            <DashboardOutlined/> 技术栈说明
                        </Title>
                        <Paragraph>
                            <Space direction="vertical" size="middle" style={{width: '100%'}}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Text strong style={{minWidth: '100px'}}><CodeOutlined/> 前端技术：</Text>
                                    <Text type="secondary">React 18 + TypeScript + Ant Design Pro</Text>
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
                                    <Text strong
                                          style={{minWidth: '100px'}}><SafetyCertificateOutlined/> 接口文档：</Text>
                                    <Text type="secondary">Knife4j</Text>
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
                        value={bookStats.total}
                        prefix={<BookOutlined/>}
                        valueStyle={{color: '#cf1322'}}
                    />
                    <div style={{marginTop: 8}}>
                        <Text type="secondary">可用：{bookStats.available}</Text>
                        <Text type="secondary">可用：{2}</Text>
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
                <Card>
                    <Statistic
                        title="活跃用户"
                        value={userStats.activeUsers}
                        value={9}
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

    /**
     * 最近用户列表
     * @constructor
     */
    function StatsTable() {
        return <Col span={24}>
            <Card
                title="最近用户"
                loading={loading}
                extra={<a onClick={() => navigate('/users')}>查看更多</a>}
            >
                <Table
                    columns={userColumns}
                    dataSource={recentUsers}
                    rowKey="id"
                    pagination={false}
                />
            </Card>
        </Col>;
    }

    //endregion 组件结束

    return (
        <div>
            {Welcome()}
            {ProjectStack()}
            {StatsCard()}
            <Row gutter={[16, 16]}>
                {/* 统计卡片 */}
                {StatsCompare()}
                {/* 系统状态 */}
                {SystemState()}
                {/* 最近用户列表 */}
                {StatsTable()}
            </Row>
            {FrontStack()}
        </div>
    );
};

export default Dashboard; 