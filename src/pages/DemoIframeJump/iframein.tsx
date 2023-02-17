import { useState } from 'react';
import { Button, Space } from 'antd';

export default () => {
  return (
    <div>
      <Space>
        <Button
          onClick={() => {
            parent.location.href = 'http://localhost:8000/#/demo1';
          }}
        >
          跳转
        </Button>
        <Button
          onClick={() => {
            window.parent.say && window.parent.say();
          }}
        >
          调用
        </Button>
      </Space>
    </div>
  );
};
