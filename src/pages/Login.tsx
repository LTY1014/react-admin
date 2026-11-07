import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    Flex,
    Form,
    Grid,
    Input,
    Space,
    Typography,
    message,
    theme,
} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {loginAction} from '../store/slices/authSlice';
import type {LoginParams} from '../api/user';
import {login} from '../api/user';
import {RootState} from '../store';
import config from '../config';

const {Title, Text} = Typography;
const {useBreakpoint} = Grid;

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useSelector((state: RootState) => state.auth);
    const {token}: { token: any } = theme.useToken();
    const screens = useBreakpoint();

    const [form] = Form.useForm<LoginParams>();
    const [loading, setLoading] = useState<boolean>(false);

    // 小屏判断（< 576px）
    const isMobile = screens.xs && !screens.sm;

    // 默认账号和密码
    const defaultValues = {
        userAccount: 'test',
        userPassword: '123456',
    };

    useEffect(() => {
        if (user?.userRole) {
            const from = location.state?.from || config.homePath;
            navigate(from, {replace: true});
        }
    }, [user, navigate, location]);

    const handleForgotPassword = () => {
        message.info('请联系系统管理员重置密码');
    };

    const onFinish = async (values: LoginParams) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await login(values);
            dispatch(loginAction({user: response.data || null}));
            message.success('登录成功');
            const from = location.state?.from || config.homePath;
            navigate(from, {replace: true});
        } catch (error: any) {
            message.error('登录失败：' + (error?.message || '请检查账号或密码'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            justify="center"
            align="center"
            className="blank-layout"
        >
            <Card
                bordered={!isMobile}
                style={{
                    width: isMobile ? '100%' : 400,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                }}
                styles={{
                    body: {
                        padding: isMobile ? token.paddingLG : token.paddingXL,
                    },
                }}
            >
                <Space
                    direction="vertical"
                    style={{width: '100%'}}
                >
                    <Flex vertical align="center">
                        <Title
                            level={3}
                            style={{
                                margin: 0,
                                color: token.colorTextHeading,
                            }}
                        >
                            {config.appTitle}
                        </Title>
                        {/*<Text type="secondary">数字化管理后台</Text>*/}
                    </Flex>

                    <Form<LoginParams>
                        form={form}
                        name="login"
                        initialValues={defaultValues}
                        onFinish={onFinish}
                        layout="vertical"
                        size="large"
                        disabled={loading}
                        requiredMark={false}
                    >
                        <Form.Item
                            name="userAccount"
                            label="账号"
                            validateTrigger="onBlur"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: '请输入账号！',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined/>}
                                placeholder="请输入账号"
                                allowClear
                                autoComplete="username"
                            />
                        </Form.Item>

                        <Form.Item
                            name="userPassword"
                            label="密码"
                            rules={[{required: true, message: '请输入密码！',},]}
                        >
                            <Input.Password
                                prefix={
                                    <LockOutlined
                                    />
                                }
                                placeholder="请输入密码"
                                visibilityToggle
                                autoComplete="current-password"
                            />
                        </Form.Item>

                        {/*<Form.Item>*/}
                        {/*    <Flex justify="flex-end">*/}
                        {/*        <Button*/}
                        {/*            type="link"*/}
                        {/*            size="small"*/}
                        {/*            onClick={handleForgotPassword}*/}
                        {/*            style={{ padding: 0 }}*/}
                        {/*        >*/}
                        {/*            忘记密码？*/}
                        {/*        </Button>*/}
                        {/*    </Flex>*/}
                        {/*</Form.Item>*/}

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                            >
                                登 录
                            </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Card>
        </div>
    );
};

export default Login; 