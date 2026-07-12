import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Input, message, Modal, Row, Select, Space, Table} from 'antd';
import {DeleteOutlined, ReloadOutlined, SearchOutlined} from '@ant-design/icons';
// import {deleteLog, getListLogByPage} from "@/api/log";
import dayjs from "dayjs";

const LogList: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showTotal: (total: number) => `共 ${total} 条`
    });

    // 添加搜索表单
    const [searchForm] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // 获取列表数据
    const fetchData = async (params: { current: number; pageSize: number }) => {
        setLoading(true);
        try {
            // const response = await getListLogByPage(params);
            const response = {
                "code": 0,
                "data": {
                    "records": [
                        {
                            "id": "86",
                            "ip": "127.0.0.1",
                            "path": "/sqlQuery/selectTable",
                            "params": "[{\"id\":1,\"current\":1,\"pageSize\":10}]",
                            "cost": 5,
                            "type": "默认日志",
                            "name": "报表查询",
                            "createBy": "2",
                            "isDelete": 0,
                            "createTime": "2026-03-29T21:11:00"
                        },
                        {
                            "id": "87",
                            "ip": "127.0.0.1",
                            "path": "/sqlQuery/selectTable",
                            "params": "[{\"id\":1,\"current\":1,\"pageSize\":10}]",
                            "cost": 5,
                            "type": "默认日志",
                            "name": "报表查询",
                            "createBy": "2",
                            "isDelete": 0,
                            "createTime": "2026-03-29T21:11:00"
                        },
                        {
                            "id": "84",
                            "ip": "127.0.0.1",
                            "path": "/sqlQuery/selectTable",
                            "params": "[{\"id\":1,\"current\":1,\"pageSize\":10}]",
                            "cost": 9,
                            "type": "默认日志",
                            "name": "报表查询",
                            "createBy": "2",
                            "isDelete": 0,
                            "createTime": "2026-03-29T21:08:44"
                        },
                        {
                            "id": "85",
                            "ip": "127.0.0.1",
                            "path": "/sqlQuery/selectTable",
                            "params": "[{\"id\":1,\"current\":1,\"pageSize\":10}]",
                            "cost": 7,
                            "type": "默认日志",
                            "name": "报表查询",
                            "createBy": "2",
                            "isDelete": 0,
                            "createTime": "2026-03-29T21:08:44"
                        },
                        {
                            "id": "82",
                            "ip": "127.0.0.1",
                            "path": "/sqlQuery/selectTable",
                            "params": "[{\"id\":1,\"current\":1,\"pageSize\":10}]",
                            "cost": 5,
                            "type": "默认日志",
                            "name": "报表查询",
                            "createBy": "2",
                            "isDelete": 0,
                            "createTime": "2026-03-29T21:08:35"
                        },
                        {
                            "id": "83",
                            "ip": "127.0.0.1",
                            "path": "/sqlQuery/selectTable",
                            "params": "[{\"id\":1,\"current\":1,\"pageSize\":10}]",
                            "cost": 6,
                            "type": "默认日志",
                            "name": "报表查询",
                            "createBy": "2",
                            "isDelete": 0,
                            "createTime": "2026-03-29T21:08:35"
                        },
                        {
                            "id": "80",
                            "ip": "127.0.0.1",
                            "path": "/sqlQuery/selectTable",
                            "params": "[{\"id\":1,\"current\":1,\"pageSize\":10}]",
                            "cost": 7,
                            "type": "默认日志",
                            "name": "报表查询",
                            "createBy": "2",
                            "isDelete": 0,
                            "createTime": "2026-03-29T21:08:32"
                        },
                        {
                            "id": "81",
                            "ip": "127.0.0.1",
                            "path": "/sqlQuery/selectTable",
                            "params": "[{\"id\":1,\"current\":1,\"pageSize\":10}]",
                            "cost": 7,
                            "type": "默认日志",
                            "name": "报表查询",
                            "createBy": "2",
                            "isDelete": 0,
                            "createTime": "2026-03-29T21:08:32"
                        },
                        {
                            "id": "78",
                            "ip": "127.0.0.1",
                            "path": "/sqlQuery/selectTable",
                            "params": "[{\"id\":1,\"current\":1,\"pageSize\":10}]",
                            "cost": 7,
                            "type": "默认日志",
                            "name": "报表查询",
                            "createBy": "2",
                            "isDelete": 0,
                            "createTime": "2026-03-29T21:08:29"
                        },
                        {
                            "id": "79",
                            "ip": "127.0.0.1",
                            "path": "/sqlQuery/selectTable",
                            "params": "[{\"id\":1,\"current\":1,\"pageSize\":10}]",
                            "cost": 8,
                            "type": "默认日志",
                            "name": "报表查询",
                            "createBy": "2",
                            "isDelete": 0,
                            "createTime": "2026-03-29T21:08:29"
                        }
                    ],
                    "total": 86,
                    "size": 10,
                    "current": 1,
                    "orders": [],
                    "optimizeCountSql": true,
                    "searchCount": true,
                    "countId": null,
                    "maxLimit": null,
                    "pages": 9
                },
                "message": "ok"
            }
            setData(response.data.records);
            setPagination({
                ...pagination,
                current: params.current,
                pageSize: params.pageSize,
                total: response.data.total
            });
        } catch (error) {
            message.error(error || '获取数据失败');
        } finally {
            setLoading(false);
        }
    };

    const columns: any[] = [
        {
            title: 'ip地址',
            dataIndex: 'ip',
            valueType: 'text',
        },
        {
            title: '请求路径',
            dataIndex: 'path',
            valueType: 'text',
        },
        {
            title: '请求参数',
            dataIndex: 'params',
            valueType: 'text',
        },
        {
            title: '请求耗时(ms)',
            dataIndex: 'cost',
            valueType: 'text',
            render: (_, record: any) => {
                const formatTimeCost = (ms: number) => {
                    if (ms < 1) {
                        return `${(ms * 1000).toFixed(2)}μs`;
                    } else if (ms < 1000) {
                        return `${ms.toFixed(2)}ms`;
                    } else {
                        return `${(ms / 1000).toFixed(2)}s`;
                    }
                };
                const getTimeColor = (ms: number) => {
                    if (ms < 200) return '#52c41a';    // 绿色 - 优秀
                    if (ms < 1000) return '#1890ff';    // 蓝色 - 良好
                    if (ms < 2000) return '#faad14';   // 橙色 - 一般
                    return '#ff4d4f';                  // 红色 - 较差
                };
                const timeCost = parseFloat(record.cost);
                if (isNaN(timeCost)) {
                    return record.cost;
                }

                return (
                    <span style={{
                        color: getTimeColor(timeCost),
                        fontWeight: '500'
                    }}>
                   {formatTimeCost(timeCost)}
               </span>
                );
            },
        },
        {
            title: '请求类型',
            dataIndex: 'type',
            valueType: 'select',
            valueEnum: {
                '默认日志': {text: '默认日志', status: 'Processing'},
                '其他日志': {text: '其他日志', status: 'Default'},
            },
        },
        {
            title: '操作名称',
            dataIndex: 'name',
            render: (_, record: any) => <span style={{color: '#1890ff'}}>{record.name}</span>,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            render: (v: any) => dayjs(v).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record: any) => [
                <Space size="middle">
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined/>}
                        onClick={() => handleDelete(record.id)}
                    >
                        删除
                    </Button>
                </Space>
            ],
        },
    ];

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: '确认删除',
            content: '确定要删除这条数据？',
            onOk: async () => {
                try {
                    // await deleteLog({id: id});
                    message.success('删除成功');
                    if (data.length === 1 && pagination.current > 1) {
                        await fetchData({
                            current: pagination.current - 1,
                            pageSize: pagination.pageSize
                        });
                    } else {
                        await fetchData({
                            current: pagination.current,
                            pageSize: pagination.pageSize
                        });
                    }
                } catch (error) {
                    message.error('删除失败');
                }
            },
        });
    };

    // 处理搜索
    const handleSearch = async () => {
        const values = await searchForm.validateFields();
        await fetchData({
            ...values,
            current: pagination.current,
            pageSize: pagination.pageSize
        });
    };

    // 重置搜索
    const handleReset = () => {
        searchForm.resetFields();
        fetchData({
            current: 1,
            pageSize: pagination.pageSize
        });
    };

    // 修改表格变化处理函数，保留搜索条件
    const handleTableChange = (newPagination: any) => {
        const values = searchForm.getFieldsValue();
        fetchData({
            ...values,
            current: newPagination.current,
            pageSize: newPagination.pageSize
        });
        setPagination({
            ...pagination,
            current: newPagination.current,
            pageSize: newPagination.pageSize
        });
    };

    useEffect(() => {
        fetchData({
            current: 1,
            pageSize: 10
        });
    }, []);

    return (
        <div>
            <Card>
                <Form
                    form={searchForm}
                    layout="inline"
                    style={{marginBottom: 16}}
                >
                    <Row gutter={16} style={{width: '100%'}}>
                        <Col span={6}>
                            <Form.Item
                                name="name"
                                label="操作名"
                            >
                                <Input placeholder="请输入" allowClear/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="type"
                                label="类型"
                            >
                                <Select placeholder="请选择">
                                    <Option value="">全部</Option>
                                    <Option value="默认日志">默认日志</Option>
                                    <Option value="其他日志">其他日志</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{textAlign: 'right'}}>
                            <Space>
                                <Button
                                    type="primary"
                                    icon={<SearchOutlined/>}
                                    onClick={handleSearch}
                                >
                                    搜索
                                </Button>
                                <Button
                                    icon={<ReloadOutlined/>}
                                    onClick={handleReset}
                                >
                                    重置
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Form>

                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    size={'small'}
                    pagination={pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    rowSelection={rowSelection}
                />
            </Card>
        </div>
    );
};

export default LogList;