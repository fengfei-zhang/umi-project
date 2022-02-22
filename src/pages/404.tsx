import { Button, Result } from 'antd';
import React from 'react';

// 这里应该使用 antd 的 404 result 组件，
// 但是还没发布，先来个简单的。

const NoFoundPage: React.FC<{}> = () => (
  <Result
    status="404"
    title="404"
    subTitle="页面不存在"
    extra={
      <Button
        type="primary"
        onClick={() => {
          // router.push('/')
          history.back();
        }}
      >
        返回
      </Button>
    }
  ></Result>
);

export default NoFoundPage;
