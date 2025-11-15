import React from 'react';
import {
    Avatar,
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    message,
    Row,
    Select,
    Space,
    Tag,
    Typography,
    Upload
} from 'antd';
import {MailOutlined, PhoneOutlined, ScheduleOutlined, UploadOutlined, UserOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {updatePassword} from "@/api/user";

const Profile: React.FC = () => {
    const [form] = Form.useForm();
    const [pwdForm] = Form.useForm();
    const user = useSelector((state: RootState) => state.auth.user);

    const [tags, setTags] = React.useState<string[]>(['架构师']);
    const controlSize = 'middle' as const;

    const handleSubmit = (values: any) => {
        try {
            // const res = await updateUser(values)
            message.success('个人信息已更新');
            pwdForm.resetFields();
        } catch (e) {
            message.error(e.message);
        }
    };

    const handlePwdSubmit = async (values: any) => {
        try {
            const res = await updatePassword(values)
            message.success('密码已修改');
            pwdForm.resetFields();
        } catch (e) {
            message.error(e.message);
        }
    };

    return (
        <Space direction="vertical" style={{width: '100%'}} size="middle">
            <Row gutter={12}>
                <Col xs={24} lg={8}>
                    <Card size="small" bodyStyle={{padding: 16}} headStyle={{padding: '8px 16px'}}>
                        <div style={{textAlign: 'center', marginBottom: 12}}>
                            <Avatar size={56} icon={<UserOutlined/>} src={user?.avatarUrl}/>
                            <div style={{marginTop: 8}}>
                                <Upload
                                    showUploadList={false}
                                    beforeUpload={(file) => {
                                        message.success('头像已更新');
                                        return false;
                                    }}
                                >
                                    <Button size="small" icon={<UploadOutlined/>}>更换头像</Button>
                                </Upload>
                            </div>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <Typography.Title level={5} style={{marginBottom: 2}}>
                                {user?.userName || '未命名用户'}
                            </Typography.Title>
                        </div>
                        <Divider style={{margin: '12px 0'}}/>
                        <Space direction="vertical" size="middle" style={{width: '100%'}}>
                            <Space>
                                <UserOutlined/>
                                <span>{(user as any)?.userAccount || '未登录'}</span>
                            </Space>
                            <Space>
                                <MailOutlined/>
                                <span>{(user as any)?.email || '未填写邮箱'}</span>
                            </Space>
                            <Space>
                                <PhoneOutlined/>
                                <span>{(user as any)?.phone || '未填写手机号'}</span>
                            </Space>
                            <Space>
                                <ScheduleOutlined/>
                                <span>{(user as any)?.createTime || '未填写创建时间'}</span>
                            </Space>
                        </Space>
                        <Divider style={{margin: '12px 0'}}/>
                        <div>
                            <Typography.Text type="secondary">标签</Typography.Text>
                            <div style={{marginTop: 4}}>
                                <Space wrap>
                                    {tags.map((tag) => (
                                        <Tag color="blue" key={tag}>{tag}</Tag>
                                    ))}
                                </Space>
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={16}>
                    <Card title="基本设置" size="small" bodyStyle={{padding: 16}} headStyle={{padding: '8px 16px'}}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            initialValues={user as any}
                        >
                            <Row gutter={12}>
                                <Col xs={24} md={12}>
                                    <Form.Item name="userAccount" label="用户账号">
                                        <Input size={controlSize} disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="userRole"
                                        label="角色"
                                    >
                                        <Input size={controlSize} disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="userName"
                                        label="用户名"
                                        rules={[{required: true, message: '请输入用户名'}]}
                                    >
                                        <Input size={controlSize}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="gender" label="性别">
                                        <Select
                                            size={controlSize}
                                            options={[
                                                {value: 0, label: '女'},
                                                {value: 1, label: '男'}
                                            ]}
                                            placeholder="请选择"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="phone"
                                        label="手机号"
                                        rules={[
                                            {required: true, message: '请输入手机号'},
                                            {pattern: /^1\d{10}$/, message: '请输入有效的手机号'}
                                        ]}
                                    >
                                        <Input size={controlSize}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="email" label="邮箱">
                                        <Input size={controlSize}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" size={controlSize}>
                                    保存
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>

                    <Card title="更改密码" size="small" style={{marginTop: 12}} bodyStyle={{padding: 16}}
                          headStyle={{padding: '8px 16px'}}>
                        <Form
                            form={pwdForm}
                            layout="horizontal"
                            labelAlign="right"
                            labelCol={{span: 2}}
                            // wrapperCol={{ span: 20 }}
                            onFinish={handlePwdSubmit}
                        >
                            <Row gutter={12}>
                                <Col xs={24} md={24}>
                                    <Form.Item
                                        name="oldPassword"
                                        label="当前密码"
                                        rules={[{required: true, message: '请输入当前密码'}]}
                                    >
                                        <Input.Password size={controlSize}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={24}>
                                    <Form.Item
                                        name="newPassword"
                                        label="新密码"
                                        rules={[{required: true, message: '请输入新密码'}]}
                                    >
                                        <Input.Password size={controlSize}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={24}>
                                    <Form.Item
                                        name="confirmPassword"
                                        label="确认新密码"
                                        dependencies={['newPassword']}
                                        rules={[
                                            {required: true, message: '请再次输入新密码'},
                                            ({getFieldValue}) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('newPassword') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('两次输入的密码不一致'));
                                                }
                                            })
                                        ]}
                                    >
                                        <Input.Password size={controlSize}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" size={controlSize}>
                                    修改密码
                                </Button>
                                <Button size={controlSize} style={{marginLeft: 8}}
                                        onClick={() => pwdForm.resetFields()}>
                                    取消
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Space>
    );
};

export default Profile; 