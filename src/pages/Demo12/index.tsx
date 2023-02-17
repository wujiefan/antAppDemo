import React from 'react';
import styles from './index.less';
import { useModel } from 'umi';

export default () => {
  const { add, minus, counter } = useModel('counter', (ret) => ({
    add: ret.increment,
    minus: ret.decrement,
    counter: ret.counter,
  }));

  return <div></div>;
};
