import React, {useEffect} from 'react';
import {Button, Card, Form, Input, message} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {loginAction} from '../store/slices/authSlice';
import type {LoginParams} from '../api/user';
import {login} from '../api/user';
import {RootState} from '../store';
import config from "../config";

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useSelector((state: RootState) => state.auth);

    // 默认账号和密码
    const defaultValues = {
        userAccount: 'test',
        userPassword: '123456'
    };

    useEffect(() => {
        if (user?.userRole) {
            const from = location.state?.from || '/dashboard';
            navigate(from, {replace: true});
        }
    }, [user, navigate, location]);

    const onFinish = async (values: LoginParams) => {
        try {
            const response = await login(values);
            dispatch(loginAction({user: response.data || null}));
            message.success('登录成功');
            const from = location.state?.from || '/dashboard';
            navigate(from, {replace: true});
        } catch (error: any) {
            message.error('登录失败:' + error.message)
        }
    };

    return (
        <div className="blank-layout">
            <Card
                title={config.appTitle}
                style={{
                    width: 400,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                }}
                styles={{
                    header: {
                        textAlign: 'center',
                        fontSize: '24px',
                        borderBottom: '1px solid #f0f0f0',
                        padding: '20px 0',
                    },
                    body: {
                        padding: '24px',
                    }
                }}
            >
                <Form
                    name="login"
                    initialValues={defaultValues}
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="userAccount"
                        rules={[{required: true, message: '请输入用户名！'}]}
                    >
                        <Input
                            placeholder="用户名"
                            style={{borderRadius: '4px'}}
                        />
                    </Form.Item>

                    <Form.Item
                        name="userPassword"
                        rules={[{required: true, message: '请输入密码！'}]}
                    >
                        <Input.Password
                            placeholder="密码"
                            style={{borderRadius: '4px'}}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{
                                height: '40px',
                                borderRadius: '4px',
                                fontSize: '16px',
                            }}
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login; 