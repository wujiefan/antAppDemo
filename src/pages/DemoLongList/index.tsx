import React, { useEffect, useState } from 'react';
import img from '@/assets/img.png';
import SlicingHoc from './components/Hoc';

// 子组件
const Item: React.FC<{ id: any }> = ({ id }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: 5 }} key={id}>
      <img src={img} width={80} height={120} alt="" />
      列表{id}
    </div>
  );
};

const ItemHoc = SlicingHoc(Item);

const Index: React.FC<any> = (props) => {
  const [list, setList] = useState<Array<number>>([]);

  useEffect(() => {
    let arr: number[] = [];
    for (let i = 0; i < 5000; i++) {
      arr.push(i);
    }
    setList(arr);
  }, []);

  return (
    <div>
      <ItemHoc list={list} />
    </div>
  );
};

export default Index;
