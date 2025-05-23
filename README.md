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
- ESLint + Prettier

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

## 贡献指南

欢迎提交 Pull Request 或 Issue 来帮助改进项目。

## 许可证

[MIT](LICENSE)