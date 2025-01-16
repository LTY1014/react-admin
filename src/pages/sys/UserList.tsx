import React, {useEffect, useState} from 'react';
import {Table, Space, Button, Card, Form, message, Tag, Row, Col, Input} from 'antd';
import {PlusOutlined, ReloadOutlined, SearchOutlined} from "@ant-design/icons";
import {getListUserByPage, UserResponse} from "../../api/user";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const UserList: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<UserResponse[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 条`
  });

  useEffect(() => {
    console.log('UserList component rendered');
    fetchData({
      current: 1,
      pageSize: 10
    });
  }, []);

  // 添加搜索表单
  const [searchForm] = Form.useForm();

  // 获取列表数据
  const handleSearch = async () => {
    const values = await searchForm.validateFields();
    await fetchData({
      ...values,
      current: 1,
      pageSize: pagination.pageSize
    });
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    fetchData({
      current: 1,
      pageSize: pagination.pageSize
    });
  };

  // 修改表格变化处理函数，保留搜索条件
  const handleTableChange = (newPagination: any) => {
    const values = searchForm.getFieldsValue();
    fetchData({
      ...values,
      current: newPagination.current,
      pageSize: newPagination.pageSize
    });
  };


  const fetchData = async (params) => {
    setLoading(true);
    try {
      const response = await getListUserByPage(params);
      if (response.code === 0) {
        setData(response.data.records);
        setPagination({
          ...pagination,
          current: params.current,
          pageSize: params.pageSize,
          total: response.data.total
        });
      } else {
        message.error(response.message || '获取数据失败');
      }
    } catch (error) {
      message.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  };


  const handleAdd = () => {

  }


  const columns = [
    {
      title: '账号',
      dataIndex: 'userAccount',
      key: 'userAccount',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '用户权限',
      dataIndex: 'userRole',
      key: 'userRole',
      render: (userRole: string) => (
          <Tag color={userRole === 'admin' ? 'green' : 'blue'}>
            {userRole}
          </Tag>
      ),
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => {
        if (gender === 0) {
          return '男';
        } else if (gender === 1) {
          return '女';
        } else {
          return '未知';
        }
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
          <Space size="middle">
            <Button type="link" >重置密码</Button>
            <Button type="link">编辑</Button>
            <Button type="link" danger>删除</Button>
          </Space>
      ),
    },
  ];

  return (
      <div>
        <Card
            title="用户管理"
            // extra={
            //   <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            //     添加用户
            //   </Button>
            // }
        >
          <Form
              form={searchForm}
              layout="inline"
              style={{ marginBottom: 16 }}
          >
            <Row gutter={16} style={{ width: '100%' }}>
              <Col span={6}>
                <Form.Item
                    name="userAccount"
                    label="账户"
                >
                  <Input placeholder="请输入" allowClear />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                    name="userName"
                    label="用户名"
                >
                  <Input placeholder="请输入" allowClear />
                </Form.Item>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Space>
                  <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      onClick={handleSearch}
                  >
                    搜索
                  </Button>
                  <Button
                      icon={<ReloadOutlined />}
                      onClick={handleReset}
                  >
                    重置
                  </Button>
                  <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={handleAdd}
                  >
                    添加用户
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
          <Table columns={columns} dataSource={data} loading={loading} pagination={pagination} />
        </Card>
      </div>
  );
};

export default UserList; 