import React from 'react';
import { Card, Form, Input, Button, Upload, message, Avatar, Space } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

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
          <Avatar size={64} icon={<UserOutlined />} />
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
          initialValues={{
            username: user?.username,
            email: 'user@example.com',
            phone: '13800138000',
          }}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input />
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
            name="oldPassword"
            label="原密码"
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="新密码"
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认密码"
            dependencies={['newPassword']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
};

export default Profile; 