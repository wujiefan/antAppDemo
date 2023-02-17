import { useState, useRef, useEffect } from 'react';

const timeout = (err) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (err) {
        reject('出错了');
      } else {
        resolve('正常');
      }
    }, 2000),
  );
};
export default () => {
  const fun1 = async () => {
    try {
      await timeout(false);
      return 1;
    } catch (err) {
      console.log(err);
    }
  };
  const fun2 = async () => {
    try {
      await timeout(true);
      return 2;
    } catch (err) {
      console.log(err);
    }
  };
  const fun3 = async () => {
    try {
      await timeout(false);
      return 3;
    } catch (err) {
      console.log(err);
    }
  };
  const init = async () => {
    try {
      const data1 = await fun1();
      console.log(data1);
      const data2 = await fun2();
      console.log(data2);
      console.log('nonono');
      const data3 = await fun3();
      console.log(data3);
    } catch (err) {
      console.log(err);
    }
  };
  const init2 = async () => {
    try {
      const data = await Promise.all([fun1(), fun3()]);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    init2();
  }, []);
  return <div>123</div>;
};
