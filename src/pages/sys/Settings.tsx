import React from 'react';
import { Card, Form, Input, Button, Switch, Select, Space, message } from 'antd';
import ThemeSettings from '../../components/ThemeSettings';

const Settings: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('系统设置:', values);
    message.success('设置已保存');
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <ThemeSettings />
        
        <Card title="系统设置">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              siteName: 'React Admin',
              allowRegistration: true,
              emailNotification: true,
              language: 'zh_CN',
            }}
          >
            <Form.Item
              name="siteName"
              label="站点名称"
              rules={[{ required: true, message: '请输入站点名称' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="allowRegistration"
              label="允许注册"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="emailNotification"
              label="邮件通知"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="language"
              label="系统语言"
            >
              <Select>
                <Select.Option value="zh_CN">简体中文</Select.Option>
                <Select.Option value="en_US">English</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存设置
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
};

export default Settings; 