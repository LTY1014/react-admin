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

## 技术栈

- React 18.2
- Redux 9.1.0
- Ant Design 5.3.0
- React Router
- Axios
- TypeScript



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

- 初始版本发布

欢迎提交 Pull Request 或 Issue 来帮助改进项目。



### 许可证

[MIT](https://gitee.com/liang-tian-yu/vue3-init/blob/master/LICENSE)LICENSE)