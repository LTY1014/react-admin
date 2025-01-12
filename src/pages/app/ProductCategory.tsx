import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Tree } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface CategoryType {
  key: string;
  name: string;
  description: string;
  parentId: string | null;
}

const ProductCategory: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const initialData: CategoryType[] = [
    {
      key: '1',
      name: '电子产品',
      description: '各类电子设备',
      parentId: null,
    },
    {
      key: '2',
      name: '手机',
      description: '智能手机',
      parentId: '1',
    },
    {
      key: '3',
      name: '服装',
      description: '各类服装',
      parentId: null,
    },
  ];

  const [data, setData] = useState(initialData);

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: CategoryType) => (
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

  const handleAdd = () => {
    form.resetFields();
    setEditingKey('');
    setIsModalVisible(true);
  };

  const handleEdit = (record: CategoryType) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
    setIsModalVisible(true);
  };

  const handleDelete = (key: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个分类吗？',
      onOk: () => {
        setData(data.filter(item => item.key !== key));
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
        }
      } else {
        newData.push({
          key: Date.now().toString(),
          ...values,
          parentId: values.parentId || null,
        });
        setData(newData);
      }
      setIsModalVisible(false);
      setEditingKey('');
    });
  };

  const treeData = data
    .filter(item => !item.parentId)
    .map(item => ({
      title: item.name,
      value: item.key,
      children: data
        .filter(child => child.parentId === item.key)
        .map(child => ({
          title: child.name,
          value: child.key,
        })),
    }));

  return (
    <div>
      <Card
        title="商品分类"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加分类
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} />
      </Card>

      <Modal
        title={editingKey ? "编辑分类" : "添加分类"}
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
            label="分类名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
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
            name="parentId"
            label="父级分类"
          >
            <Tree
              checkable
              selectable={false}
              treeData={treeData}
              defaultExpandAll
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductCategory; 