import React, {useEffect} from "react";
import {Button, Card, Divider, Form, Input, message, Select} from "antd";
import excel from "../plugins/excel";
import Authority from "../components/Authority";
import {ACCESS_ENUM} from "../utils/checkAccess";
import {useNavigate} from "react-router-dom";

const Test: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [data, setData] = React.useState([
        {
            name: '张三',
            age: 18,
            address: '北京'
        },
        {
            name: '李四',
            age: 19,
            address: '上海'
        },
        {
            name: '王五',
            age: 20,
            address: '广州'
        }
    ]);

    const handleApi = () => {

    }

    const handleCopy = () => {
        navigator.clipboard.writeText("666").then(() => {
            message.success('复制成功');
        }).catch(err => {
            message.error('复制失败')
        });
    };

    const handleExcel = () => {
        let params = {
            key: ['name', 'age', 'address'],
            data: data,
            title: ['姓名', '年龄', '地址'],
            fileName: 'export',
            autoWidth: false,
        }
        excel.export_array_to_excel(params)
    }

    useEffect(() => {
    }, []);

    return (
        <div>
            <Button onClick={() => navigate(-1)}>回退</Button>
            <Button onClick={() => handleCopy()}>复制内容</Button>
            <Button onClick={() => handleExcel()}>下载Excel</Button>
            <Button onClick={() => handleApi()}>测试</Button>
            <Authority permissions={[ACCESS_ENUM.ADMIN]}>
                <Button type="link">管理员可见</Button>
            </Authority>
            <Divider/>
            <Form form={form}>
                <Form.Item label="姓名" name="name">
                    <Form.Item>
                        <Select options={data.map((item, index) => {
                            return {
                                value: index,
                                label: item.name,
                                key: index
                            }
                        })}
                                onChange={(value) => {
                                    form.setFieldsValue({
                                        age: data[value].age,
                                        address: data[value].address
                                    })
                                }}
                        />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="年龄" name="age">
                    <Select options={data.map((item, index) => {
                        return {
                            value: item.age,
                            label: item.age,
                            key: index
                        }
                    })}/>
                </Form.Item>
                <Form.Item label="地址" name="address">
                    <Select options={data.map((item, index) => {
                        return {
                            value: item.address,
                            label: item.address,
                            key: index
                        }
                    })}/>
                </Form.Item>
            </Form>
        </div>
    )
}


export default Test;