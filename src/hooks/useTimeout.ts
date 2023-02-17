import { useEffect } from 'react';

function useTimeout(fn: () => void, delay: number) {
  useEffect(() => {
    const timer = setTimeout(() => {
      fn();
    }, delay);
    return () => {
      clearTimeout(timer); // 移除定时器
    };
  }, [delay]);
}

export default useTimeout;
