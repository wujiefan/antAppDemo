import { useState } from 'react';

export default (props) => {
  const { children } = props;
  const [list, setList] = useState(['鸡', '鸭', '鱼', '肉']);
  return (
    <div>
      <div>菜谱</div>
      {children(list)}
    </div>
  );
};
