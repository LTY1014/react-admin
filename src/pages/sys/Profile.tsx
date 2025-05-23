import React from 'react';
import {Card, Form, Input, Button, Upload, message, Avatar, Space, Modal} from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {RootState} from '../../store';
import {updatePassword} from "../../api/user";

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = (values: any) => {
    console.log('个人信息:', values);
    message.success('个人信息已更新');
  };

  const handleUpdatePassword = async () => {
    try {
      const res = await updatePassword({
        oldPassword: form.getFieldValue('oldPassword'),
        newPassword: form.getFieldValue('newPassword'),
        confirmPassword: form.getFieldValue('confirmPassword'),
      })
      if (res.code === 0) {
        message.success('修改密码成功');
      } else {
        message.error(res.message || '重置密码失败');
      }
    } catch (e) {
      message.error('操作失败');
    }
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
          initialValues={{
            userAccount: user?.userAccount,
            userName: user?.userName,
            userRole: user?.userRole,
          }}
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
            <Button type="primary" onClick={() => {
              Modal.confirm({
                title: '确定修改密码吗？',
                content: '修改密码后，请牢记新密码。',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                  handleUpdatePassword();
                },
              });
            }}>
              重置密码
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
};

export default Profile; 