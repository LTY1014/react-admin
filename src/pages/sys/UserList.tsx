import React, {useEffect, useState} from 'react';
import {Table, Space, Button, Card, Form, message, Tag, Row, Col, Input, Modal, Select} from 'antd';
import {PlusOutlined, ReloadOutlined, SearchOutlined} from "@ant-design/icons";
import {addUser, deleteUser, getListUserByPage, resetUserPassword, updateUser, UserResponse} from "../../api/user";
import dayjs from "dayjs";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const UserList: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<UserResponse[]>([]);
  const [editingKey, setEditingKey] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 条`
  });

  useEffect(() => {
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
    setEditingKey(null);
    form.resetFields();
    setIsModalVisible(true);
  }


  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingKey) {
        const response = await updateUser({
          ...values,
          id: editingKey,
        });
        if (response.code === 0) {
          message.success('更新成功');
          setIsModalVisible(false);
          await fetchData({
            current: pagination.current,
            pageSize: pagination.pageSize
          });
        } else {
          message.error(response.message || '更新失败');
        }
      } else {
        const response = await addUser(values);
        if (response.code === 0) {
          message.success('添加成功');
          setIsModalVisible(false);
          await fetchData({
            current: 1,
            pageSize: pagination.pageSize
          });
        } else {
          message.error(response.message || '添加失败');
        }
      }
    } catch (error) {
      message.error('操作失败');
    }
  }

  const handleResetPassword = async (userId) => {
    try {
      const response = await resetUserPassword(userId);
      if (response.code === 0) {
        message.success('重置密码成功');
      } else {
        message.error(response.message || '重置密码失败');
      }
    } catch (error) {
      message.error('操作失败');
    }
  }

  const handleDelete = async (userId) => {
    try {
      const response = await deleteUser({id: userId});
      if (response.code === 0) {
        message.success('删除成功');
        await fetchData({
          current: pagination.current,
          pageSize: pagination.pageSize
        });
      } else {
        message.error(response.message || '删除失败');
      }
    } catch (error) {
      message.error('操作失败');
    }
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
        switch (gender) {
          case 0:
            return <span color="green">男</span>;
          case 1:
            return <span color="default">女</span>;
          default:
            return <span color="red">未知</span>;
        }
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: string) => {
        return text ? dayjs(text).format('YYYY:MM:DD HH:mm:ss') : '--';
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
          <Space size="middle">
            <Button type="link" onClick={() => {
              Modal.confirm({
                title: '重置密码',
                content: '确定要重置该用户的密码吗？',
                okText: '确定',
                cancelText: '取消',
                onCancel: () => {
                },
                onOk: () => handleResetPassword(record.id),
              });
            }}>重置密码</Button>
            <Button type="link" onClick={()=>{
              setEditingKey(record.id);
              setIsModalVisible(true)
              form.setFieldsValue(record);
            }}>编辑</Button>
            <Button type="link" danger onClick={()=>{
              Modal.confirm({
                title: '删除用户',
                content: '确定要删除该用户吗？',
                okText: '确定',
                cancelText: '取消',
                onCancel: () => {
                },
                onOk: () => handleDelete(record.id),
              });
            }}>删除</Button>
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
          <Table rowKey="id" columns={columns} dataSource={data} loading={loading} pagination={pagination} />
        </Card>

        <Modal
            title={editingKey ? "编辑" : "添加"}
            open={isModalVisible}
            onOk={handleModalOk}
            onCancel={() => {
              setIsModalVisible(false);
              setEditingKey(null);
            }}
        >
          <Form
              form={form}
              layout="vertical"
          >
            <Form.Item
                name="userAccount"
                label="账号"
                rules={[{ required: true, message: '请输入' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
                name="userName"
                label="用户名"
                rules={[{ required: true, message: '请输入' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
                name="userRole"
                label="角色"
                rules={[{ required: true, message: '请选择' }]}
            >
              <Select>
                <Select.Option key="admin" value="admin">管理员</Select.Option>
                <Select.Option key="user" value="user">普通用户</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
                name="gender"
                label="性别"
            >
              <Select>
                <Select.Option key="male" value={0}>男</Select.Option>
                <Select.Option key="female" value={1}>女</Select.Option>
                <Select.Option key="unknown" value={2}>未知</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
                name="phone"
                label="手机"
                rules={[{ required: true, message: '请输入' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="邮箱"
                rules={[{ required: true, message: '请输入' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
  );
};

export default UserList; 