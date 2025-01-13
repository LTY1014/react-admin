import React from 'react';
import {Card, Col, Row, Statistic, Table} from 'antd';
import {DollarOutlined, LineChartOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';

const Dashboard: React.FC = () => {
    const recentOrders = [
        {
            key: '1',
            technology: 'React',
            version: 'v18.2.0'
        },
        {
            key: '2',
            technology: 'antd',
            version: 'v5.14.1',
        },
        {
            key: '3',
            technology: 'axios',
            version: 'v1.6.7',
        },
        {
            key: '4',
            technology: 'dayjs',
            version: 'v1.11.13',
        },
        {
            key: '5',
            technology: 'lodash',
            version: 'v4.17.21',
        },
        {
            key: '6',
            technology: 'react-redux',
            version: 'v9.1.0',
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

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="总用户数"
                            value={112893}
                            prefix={<UserOutlined/>}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="今日订单"
                            value={93}
                            prefix={<ShoppingCartOutlined/>}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="总收入"
                            value={112893}
                            prefix={<DollarOutlined/>}
                            precision={2}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="转化率"
                            value={13.5}
                            prefix={<LineChartOutlined/>}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>

            <Card title="技术栈" style={{marginTop: 16}}>
                <Table
                    columns={columns}
                    dataSource={recentOrders}
                    pagination={false}
                />
            </Card>
        </div>
    );
};

export default Dashboard; 