import { useModel } from 'umi';
import { useEffect } from 'react';

export default () => {
  const { add, minus, counter } = useModel('counter', (ret) => ({
    add: ret.increment,
    minus: ret.decrement,
    counter: ret.counter,
  }));
  useEffect(() => {}, []);
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={add}>add by 1</button>
      <button onClick={minus}>minus by 1</button>
    </div>
  );
};
