import React, { useEffect } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login as loginAction } from '../store/slices/authSlice';
import { login } from '../api/user';
import type { LoginParams } from '../api/user';
import { RootState } from '../store';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // 如果已经登录，重定向到首页或来源页面
    if (isAuthenticated) {
      const from = (location.state as any)?.from || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const onFinish = async (values: LoginParams) => {
    try {
      const user = await login(values);
      dispatch(loginAction({ user }));
      message.success('登录成功');
      const from = (location.state as any)?.from || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: '#f0f2f5'
    }}>
      <Card title="系统登录" style={{ width: 400 }}>
        <Form
          name="login"
          onFinish={onFinish}
          initialValues={{
            userAccount: 'test',
            userPassword: '123456'
          }}
        >
          <Form.Item
            name="userAccount"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="userPassword"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 