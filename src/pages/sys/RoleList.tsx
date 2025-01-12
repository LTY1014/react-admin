import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Checkbox, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface RoleType {
  key: string;
  name: string;
  description: string;
  permissions: string[];
}

const RoleList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const initialData: RoleType[] = [
    {
      key: '1',
      name: '管理员',
      description: '系统管理员',
      permissions: ['user:manage', 'role:manage', 'product:manage'],
    },
    {
      key: '2',
      name: '运营',
      description: '运营人员',
      permissions: ['product:manage'],
    },
  ];

  const [data, setData] = useState(initialData);

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '权限',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: string[]) => permissions.join(', '),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: RoleType) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const permissionOptions = [
    { label: '用户管理', value: 'user:manage' },
    { label: '角色管理', value: 'role:manage' },
    { label: '商品管理', value: 'product:manage' },
  ];

  const handleAdd = () => {
    form.resetFields();
    setEditingKey('');
    setIsModalVisible(true);
  };

  const handleEdit = (record: RoleType) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
    setIsModalVisible(true);
  };

  const handleDelete = (key: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个角色吗？',
      onOk: () => {
        setData(data.filter(item => item.key !== key));
        message.success('删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newData = [...data];
      if (editingKey) {
        const index = newData.findIndex(item => item.key === editingKey);
        if (index > -1) {
          newData[index] = { ...newData[index], ...values };
          setData(newData);
          message.success('更新成功');
        }
      } else {
        newData.push({
          key: Date.now().toString(),
          ...values,
        });
        setData(newData);
        message.success('添加成功');
      }
      setIsModalVisible(false);
      setEditingKey('');
    });
  };

  return (
    <div>
      <Card
        title="角色管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加角色
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} />
      </Card>

      <Modal
        title={editingKey ? "编辑角色" : "添加角色"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="permissions"
            label="权限"
            rules={[{ required: true, message: '请选择权限' }]}
          >
            <Checkbox.Group options={permissionOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleList; 