import React from 'react';
import { Table, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const UserList: React.FC = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">编辑</Button>
          <Button type="link" danger>删除</Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: '张三',
      age: 32,
      address: '北京市朝阳区',
    },
    {
      key: '2',
      name: '李四',
      age: 42,
      address: '上海市浦东新区',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default UserList; 