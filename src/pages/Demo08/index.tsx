import React, { useState, useRef } from 'react';
import { Button } from 'antd-mobile';
import useCreation from '@/components/useCreation';

const Index: React.FC<any> = () => {
  const [_, setFlag] = useState<boolean>(false);
  const timer = useRef(null);
  const [count, setCount] = useState(60);

  const getNowData = () => {
    return Math.random();
  };
  const countdown = () => {
    timer.current = setInterval(() => {
      setCount((old) => {
        return old - 1;
      });
    }, 1000);
  };
  const nowData = useCreation(() => getNowData(), []);

  return (
    <div style={{ padding: 50 }}>
      <div>正常的函数： {getNowData()}</div>
      <div>useCreation包裹后的： {nowData}</div>
      <div>{count}</div>
      <div>
        <Button
          type="primary"
          onClick={() => {
            setFlag((v) => !v);
          }}
        >
          渲染
        </Button>
        <Button
          type="primary"
          onClick={() => {
            countdown();
          }}
        >
          开始
        </Button>
        <Button
          type="primary"
          onClick={() => {
            clearInterval(timer.current);
          }}
        >
          暂停
        </Button>
      </div>
    </div>
  );
};

export default Index;
