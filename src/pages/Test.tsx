import React, {useEffect} from "react";
import {Button, Card, Divider, Form, Input, message, Select} from "antd";
import excel from "../plugins/excel";
import Authority from "../components/Authority";
import {ACCESS_ENUM} from "../utils/checkAccess";

const Test: React.FC = () => {
    const [form] = Form.useForm();
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
            <Authority permissions={[ACCESS_ENUM.ADMIN]}>
                <Button type="link">管理员可见</Button>
            </Authority>
            <Button onClick={() => handleCopy()}>复制内容</Button>
            <Button onClick={() => handleExcel()}>下载Excel</Button>
            <Button onClick={() => handleApi()}>测试</Button>
            <Divider/>
            <Form form={form}>
                <Form.Item label="姓名" name="name">
                    <Form.Item>
                        <Select options={data.map((item, index) => {
                            return {
                                value: index,
                                label: item.name
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
                    <Select options={data.map(item => {
                        return {
                            value: item.age,
                            label: item.age
                        }
                    })}/>
                </Form.Item>
                <Form.Item label="地址" name="address">
                    <Select options={data.map(item => {
                        return {
                            value: item.address,
                            label: item.address
                        }
                    })}/>
                </Form.Item>
            </Form>
        </div>
    )
}


export default Test;