import React, { useState } from 'react';
import { Table, Card, Button, Space, Tag, Modal, Form, Input, InputNumber, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface ProductType {
  key: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: string;
}

const ProductList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const initialData: ProductType[] = [
    {
      key: '1',
      name: '商品 A',
      price: 199.99,
      stock: 100,
      category: '电子产品',
      status: '在售',
    },
    {
      key: '2',
      name: '商品 B',
      price: 299.99,
      stock: 50,
      category: '服装',
      status: '缺货',
    },
  ];

  const [data, setData] = useState(initialData);

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '在售' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: ProductType) => (
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

  const handleEdit = (record: ProductType) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
    setIsModalVisible(true);
  };

  const handleDelete = (key: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个商品吗？',
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
        });
        setData(newData);
      }
      setIsModalVisible(false);
      setEditingKey('');
    });
  };

  return (
    <div>
      <Card
        title="商品列表"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加商品
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} />
      </Card>

      <Modal
        title={editingKey ? "编辑商品" : "添加商品"}
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
            label="商品名称"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="价格"
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              precision={2}
              prefix="¥"
            />
          </Form.Item>
          <Form.Item
            name="stock"
            label="库存"
            rules={[{ required: true, message: '请输入库存' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item
            name="category"
            label="分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select>
              <Select.Option value="电子产品">电子产品</Select.Option>
              <Select.Option value="服装">服装</Select.Option>
              <Select.Option value="食品">食品</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="在售">在售</Select.Option>
              <Select.Option value="缺货">缺货</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList; 