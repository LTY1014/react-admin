import React from 'react';
import {Card, Col, Descriptions, List, Row, Statistic} from 'antd';
import {AimOutlined, ApiOutlined, FileDoneOutlined, TrophyOutlined} from '@ant-design/icons';

const Dashboard: React.FC = () => {
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

    return (
        <div>
            <Row gutter={[16, 16]}>
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
            </Row>

            <Card title="技术栈" style={{marginTop: 16}}>
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
            </Card>
        </div>
    );
};

export default Dashboard; 