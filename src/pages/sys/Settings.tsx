import React from 'react';
import {Card, Form, Input, Button, Switch, Select, Space, message, ColorPicker} from 'antd';
import {setPrimaryColor, toggleDarkMode} from "@/store/slices/themeSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";

const Settings: React.FC = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { primaryColor, isDarkMode } = useSelector((state: RootState) => state.theme);

  const handleSubmit = (values: any) => {
    console.log('系统设置:', values);
    message.success('设置已保存');
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Card title="系统设置">
          <Form
            form={form}
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
              <Input width="300px" />
            </Form.Item>

            <Form.Item>
              <span style={{ marginRight: 8 }}>暗黑模式：</span>
              <Switch
                  checked={isDarkMode}
                  onChange={() => dispatch(toggleDarkMode())}
              />
            </Form.Item>
            <Form.Item>
              <span style={{ marginRight: 8 }}>主题色：</span>
              <ColorPicker
                  value={primaryColor}
                  onChange={(color) => dispatch(setPrimaryColor(color.toHexString()))}
              />
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
              <Select options={[{value: 'zh_CN', label: '简体中文',}, {value: 'en_US', label: 'English',}]}/>
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