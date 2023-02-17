import { useState } from 'react';
import useTimeout from '@/hooks/useTimeout';
import useUpdate from '@/hooks/useUpdate';
const MyPage = () => {
  const [count, setCount] = useState(0);
  const update = useUpdate();

  useTimeout(() => {
    setCount((count) => count + 1);
  }, 3000);

  return (
    <div>
      <div>
        <button type="button">增加 {count}</button>
      </div>
      <div>
        <button type="button" onClick={update}>
          Time: {Date.now()}
        </button>
      </div>
    </div>
  );
};

export default MyPage;
