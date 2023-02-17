import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';
const event = 'keydown';
export default () => {
  const [count, setCount] = useState(0);
  const ref = useRef(count);
  const handlekKeydown = (e) => {
    if (e.code === 'Enter') {
      console.log('current count: ', ref.current);
    }
  };

  useEffect(() => {
    ref.current = count;
  });

  useEffect(() => {
    window.addEventListener(event, handlekKeydown);
    return () => {
      window.removeEventListener(event, handlekKeydown);
    };
  }, []);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};
