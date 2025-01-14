import React, {useEffect} from "react";
import {Button, Card, Divider, message} from "antd";
import excel from "../plugins/excel";
import Authority from "../components/Authority";
import {ACCESS_ENUM} from "../utils/checkAccess";

const Test: React.FC = () => {
    const [count, setCount] = React.useState(0);

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
        const data = [
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
        ];
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
            <Card>
                <h2>hello</h2>
                <p>{count}</p>
                <Button onClick={() => setCount(count + 1)}>add</Button>
            </Card>
            <Divider/>
            <Authority permissions={[ACCESS_ENUM.ADMIN]}>
                <Button type="link">管理员可见</Button>
            </Authority>
            <Button onClick={() => handleCopy()}>复制内容</Button>
            <Button onClick={() => handleExcel()}>下载Excel</Button>
            <Button onClick={() => handleApi()}>测试</Button>
        </div>
    )
}


export default Test;