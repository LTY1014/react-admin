import React, {useEffect} from 'react';
import {Card, Descriptions, DescriptionsProps, Form} from 'antd';
import {useParams} from "react-router-dom";

interface ProductType {
    key: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    status: string;
}

const ProductDetail: React.FC = () => {
    const [form] = Form.useForm();
    const {id} = useParams<{ id: string }>(); // 获取路由参数 id
    const [data, setData] = React.useState<ProductType | null>(null);

    const dataSource = [
        {
            key: '1',
            id: '1',
            name: '商品 A',
            price: 199.99,
            stock: 100,
            category: '电子产品',
            status: '在售',
        },
        {
            key: '2',
            id: '2',
            name: '商品 B',
            price: 299.99,
            stock: 50,
            category: '服装',
            status: '缺货',
        },
    ];

    const des: DescriptionsProps = [
        {
            key: '1',
            label: '商品名称',
            children: data?.name,
        },
        {
            key: '2',
            label: '商品价格',
            children: Number.isFinite(data?.price) ? `¥${Number(data.price).toFixed(2)}` : '暂无',
        },
        {
            key: '3',
            label: '商品库存',
            children: data?.stock,
        },
        {
            key: '4',
            label: '商品分类',
            children: data?.category,
        },
        {
            key: '5',
            label: '商品状态',
            children: data?.status,
        },
    ];

    useEffect(() => {
        // 获取当前路由的参数
        console.log('当前路由参数id:', id)
        setData(dataSource.find((item) => item.id === id))
    }, [])

    return (
        <div>
            <Card
                title="商品详情"
            >
                <Descriptions bordered items={des}/>
            </Card>
        </div>
    );
};

export default ProductDetail;