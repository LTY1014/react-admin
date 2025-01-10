import React from 'react';
import { Card, Row, Col, Statistic, Table } from 'antd';
import { 
  UserOutlined, 
  ShoppingCartOutlined,
  DollarOutlined,
  LineChartOutlined 
} from '@ant-design/icons';

const Dashboard: React.FC = () => {
  // 最近订单数据
  const recentOrders = [
    {
      key: '1',
      orderNo: 'ORD001',
      customer: '张三',
      amount: 299,
      status: '已完成',
    },
    {
      key: '2',
      orderNo: 'ORD002',
      customer: '李四',
      amount: 599,
      status: '处理中',
    },
    // 更多订单数据...
  ];

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '客户',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `¥${amount}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={112893}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日订单"
              value={93}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总收入"
              value={112893}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="转化率"
              value={13.5}
              prefix={<LineChartOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Card title="最近订单" style={{ marginTop: 16 }}>
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