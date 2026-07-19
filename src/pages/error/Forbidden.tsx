import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const Forbidden: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle="对不起，您没有权限访问此页面。"
      extra={
        <Button type="primary" onClick={() => navigate(config.homePath)}>
          返回首页
        </Button>
      }
    />
  );
};

export default Forbidden; 