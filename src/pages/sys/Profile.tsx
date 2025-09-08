import React from 'react';
import {Card, Form, Input, Button, Upload, message, Avatar, Space, Modal, Select} from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {RootState} from '../../store';

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = (values: any) => {
    console.log('个人信息:', values);
    message.success('个人信息已更新');
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Card title="个人信息">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Avatar size={64} icon={<UserOutlined />} src={user?.avatarUrl} />
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              message.success('头像已更新');
              return false;
            }}
          >
            <Button icon={<UploadOutlined />} style={{ marginTop: 16 }}>
              更换头像
            </Button>
          </Upload>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={user}
        >
          <Form.Item
              name="userAccount"
              label="用户账号"
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="userName"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              name="userRole"
              label="角色"
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="gender"
            label="性别"
          >
            <Select options={[{value: 0, label: '女'}, {value: 1, label: '男'}]}/>
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1\d{10}$/, message: '请输入有效的手机号' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              name="email"
              label="邮箱"
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleSubmit}>
              修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
};

export default Profile; 