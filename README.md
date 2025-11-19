## react-admin

<p align=center>
    <a href="http://gitee.com/liang-tian-yu">react-admin</a>
</p>
<p align="center">
<a target="_blank" href="http://gitee.com/liang-tian-yu">
    <img src="https://img.shields.io/badge/react-18.2-green" ></img>
    <img src="https://img.shields.io/badge/redux-9.1.0-green" ></img>
    <img src="https://img.shields.io/badge/antdesign-5.3.0-blue" ></img>
</a></p>
**快速生成react 后台管理项目**

react-admin是一个基于 React、Redux 和 Ant Design 构建的后台管理系统模板。它提供了完整的后台管理解决方案，包括用户认证、权限管理、数据可视化等功能。



技术栈

- React 18.2
- Redux 9.1.0
- Ant Design 5.3.0
- React Router
- Axios
- TypeScript



[TOC]

## 快速开始

- 安装依赖

```bash
npm install
```

- 启动开发

```bash
npm run dev
```

- 构建生产

```bash
npm run build
```





## 功能特性

- 🚀 基于 React 18 + Redux + Ant Design 5.x
- 📦 开箱即用的后台管理系统模板
- 🔐 完整的用户认证和权限管理
- 📊 丰富的数据可视化组件
- 🔧 完善的开发工具链



## 目录结构

```
react-admin
├── src
│   ├── assets          # 静态资源
│   ├── components      # 公共组件
│   ├── pages          # 页面组件
│   ├── redux          # Redux 相关
│   ├── router         # 路由配置
│   ├── utils          # 工具函数
│   └── App.tsx        # 根组件
├── public             # 公共资源
└── package.json       # 项目依赖
```



## 开发指南

新组件开发

```
import React, { useEffect } from 'react';

// interface IndexProps {
//     visible: boolean;
//     setVisible: (bool: boolean) => void;
//     fieldList: [];
// }

const Index: React.FC = () => {

    useEffect(() => {
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default Index;
```



### 路由

懒加载

```
component: lazy(() => import('../pages/Login')),
```





### Table

**table排序**

1. 列添加参数

```plain
      defaultSortOrder: 'descend',
      sorter: (a, b) => {},
```



2. onChange (实现表格后端排序)



------



**筛选封装**

- 注意点 （更新搜索表单对应的字段)

```plain
  const searchInput = React.useRef<InputRef>(null);
```



```
  const getColumnSearchProps = (dataIndex: any): TableColumnType<any> => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
        <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
          <Input
              ref={searchInput}
              placeholder={`输入内容并按Enter键即可`}
              value={selectedKeys[0]}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedKeys(value ? [value] : []);
                // 更新搜索表单对应的字段
                searchForm.setFieldsValue({
                  [dataIndex]: value,
                });
              }}
              onPressEnter={() => handleSearch()}
              style={{marginBottom: 8, display: 'block'}}
          />
          <Space>
            <Button
                type="primary"
                onClick={() => handleSearch()}
                icon={<SearchOutlined/>}
                size="small"
                style={{width: 90}}
            >
              搜索
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{width: 90}}
            >
              重置
            </Button>
          </Space>
        </div>
    ),
    onFilter: (value, record) =>
        record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
  });
```



- 使用案例

```plain
    {
      title: '书名',
      dataIndex: 'bookName',
      key: 'bookName',
      ...getColumnSearchProps('bookName'),
    },
```



----



**多选**

```plain
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
```



```plain
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          rowSelection={rowSelection}
        />
```



---



选中行

```
      <Table
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          rowKey="id"
          onRow={(record) => ({
              onClick: () => {
                  console.log("当前行数据:", record);
              }
          })}
      />
```



### Card

- 设置padding

```
<Card title="公告" styles={{body: {padding: '12px'}}}>
```



统计卡片

```
    const outputData = {
        completed: 60,
        target: 100
    }

    return (
        <div>
            <Row gutter={16}>
                <Col span={6}>
                    <Card className="stat-card">
                        <Statistic
                            title="今日产出"
                            value={outputData.completed}
                            suffix={`/ ${outputData.target}`}
                            valueStyle={{ color: '#1890ff' }}
                            prefix={<LineChartOutlined />}
                        />
                        <Progress
                            percent={(outputData.completed / outputData.target) * 100}
                            showInfo={false}
                            strokeColor="#1890ff"
                        />
                        <div className="stat-footer">目标完成率: {((outputData.completed / outputData.target) * 100).toFixed(1)}%</div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
```





### 弹窗表格

```
import React, {useEffect, useState} from "react";
import {Button, Modal, Table} from "antd";
import {getListUserByPage} from "@/api/user";

/**
 * ModalTable 弹窗表格选中
 * @param props open: 是否打开弹窗, onCancel: 取消回调, onConfirm: 确认回调
 * @constructor
 */
const ModalTable: React.FC = (props) => {
    const {open, onCancel,onConfirm} = props;
    const [dataSource, setDataSource] = React.useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showTotal: (total: number) => `共 ${total} 条`,
        pageSizeOptions: ['10', '20', '50', '100', '1000']
    });

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const fetchData = async (params:{current: number, pageSize: number}) => {
        try {
            const {data} = await getListUserByPage({
                current: params.current,
                pageSize: params.pageSize
            });
            setDataSource(data.records);
            setPagination({
                ...pagination,
                total: data.total
            });
        } catch (e) {
        }
    };

    const handleTableChange = (newPagination: any) => {
        // TODO 添加查询参数
        // const values = searchForm.getFieldsValue();
        fetchData({
            // ...values,
            current: newPagination.current,
            pageSize: newPagination.pageSize
        });
        setPagination(prevState =>  {
            return {
                ...prevState,
                current: newPagination.current,
                pageSize: newPagination.pageSize
            }
        });
    };

    // 表格列
    const columns = [
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '账号',
            dataIndex: 'userAccount',
            key: 'userAccount',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
    ]

    useEffect(() => {
        if (open) {
            fetchData({
                current: 1,
                pageSize: 10
            });
        }
    }, [open]);

    return (
        <div>
            <Modal
                title="查询"
                open={open}
                width={1000}
                onCancel={onCancel}
                footer={[
                    <Button key="cancel" onClick={()=>{
                        onCancel()
                        setSelectedRowKeys([])
                    }}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={async () => {
                        // 点击确认时调用 onConfirm 回调，并传递选中的数据
                        if (onConfirm) {
                            // 根据 selectedRowKeys 找到对应的行数据
                            const selectedRows = dataSource.filter(item =>
                                selectedRowKeys.includes(item.id)
                            );
                            onConfirm(selectedRows, selectedRowKeys);
                        }
                        onCancel();
                        setSelectedRowKeys([]);
                    }}>
                        确定
                    </Button>,
                ]}
            >
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey="id"
                    size={'small'}
                    pagination={pagination}
                    onChange={handleTableChange}
                    rowSelection={rowSelection}
                />
            </Modal>
        </div>
    )
}

export default ModalTable;
```



测试

```
import React from "react";
import {Button, message} from "antd";
import ModalTable from "@/components/ModalTable";

const Test: React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState(false)
    const [form] = Form.useForm();

    // 处理 ModalTable 确认回调
    const handleModalConfirm = (selectedRows: any[], selectedRowKeys: React.Key[]) => {
        console.log('选中的行数据:', selectedRows);
        console.log('选中的行key:', selectedRowKeys);
        message.success(`已选择 ${selectedRows.length} 条数据`);
        // 在这里处理选中的数据
        form.setFieldsValue({
            userId: selectedRowKeys,
            userName: selectedRows.map(item => item.userName),
        })
    }

    return (
        <div>
            <Button onClick={() => {
                setModalOpen(true)
            }}>测试</Button>
            <Form form={form}>
                <Form.Item
                    name="userId"
                    hidden={true}
                >
                </Form.Item>
                <Form.Item
                    name="userName"
                    rules={[{required: true, message: '请输入用户名！'}]}
                >
                    <Input placeholder="请输入用户名" disabled={true}/>
                </Form.Item>
            </Form>
            
            <ModalTable
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                onConfirm={handleModalConfirm}/>
        </div>
    )
}


export default Test;
```





## 部署说明

nginx.conf

```

server{
    listen 8089;
    server_name localhost;
	root /home/www/react-admin/dist;
    index  index.html;
	
	# 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # HTML 文件不缓存
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    location / {
      try_files $uri $uri/ /index.html;
    }

  	location /api/ {
  	  	# 移除/api前缀，将剩余路径转发到后端
        rewrite ^/api/(.*)$ /$1 break;
        proxy_pass http://127.0.0.1:8100;
        add_header 'Access-Control-Allow-origin' $http_origin;
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header Access-Control-Allow-Methods 'GET,POST,OPTIONS';
        add_header Access-Control-Allow-Headers '*';
        if ($request_method = 'OPTIONS'){
          add_header 'Access-Control-Allow-Credentials' 'true';
          add_header 'Access-Control-Allow-Origin' $http_origin;
          add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, PATCH';
          add_header 'Access-Control-Request-Private-Network' 'true';
          add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
          add_header 'Access-Control-Max-Age' 1728000;
          add_header 'Content-Type' 'text/plain; charset=utf-8';
          add_header 'Content-Length' 0;
          return 204;
        } 
    }
}
```



## 更新日志

###  v1.0.0

- 初始版本发布 (打包体积约2M)

欢迎提交 Pull Request 或 Issue 来帮助改进项目。
