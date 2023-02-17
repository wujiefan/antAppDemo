import { useState, useRef, useEffect } from 'react';

export default () => {
  async function fn() {
    let value = await new Promise((resolve, reject) => {
      reject('failure');
    });
    console.log('do something...');
  }

  useEffect(() => {
    import('@/utils').then((data) => {
      console.log(data.getPageQuery());
    });
    fn();
  }, []);
  return <div></div>;
};
