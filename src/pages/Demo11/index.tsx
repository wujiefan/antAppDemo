import { useEffect } from 'react';
import { Button } from 'antd';
import { history, Link } from 'umi';

export default () => {
  async function fn() {
    return 1;
  }

  useEffect(() => {
    console.log(fn());
    sessionStorage.setItem('name', '123');
    const hiddenProperty =
      'hidden' in document
        ? 'hidden'
        : 'webkitHidden' in document
        ? 'webkitHidden'
        : 'mozHidden' in document
        ? 'mozHidden'
        : null;
    const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    const onVisibilityChange = function () {
      if (!document[hiddenProperty]) {
        console.log('页面非激活');
      } else {
        console.log('页面激活');
        /*document.location.reload();//重新加载当前页面*/
      }
    };
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
  }, []);
  return (
    <div>
      <Link target="_blank" to={'/demo1'}>
        跳转
      </Link>
    </div>
  );
};
