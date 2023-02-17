import { useModel } from 'umi';
import { useState, useRef, useEffect } from 'react';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef(123);
  const add = () => {
    setCounter(counter + 1);
  };
  const minus = () => {};
  useEffect(() => {
    console.log(ref);
  }, []);
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={add}>add by 1</button>
      <button onClick={minus}>minus by 1</button>
      <div ref={ref}>112233</div>
    </div>
  );
};
