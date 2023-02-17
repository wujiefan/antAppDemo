import React, { useState, useRef, useEffect } from 'react';
import styles from './index.less';
import anime from 'animejs';

export default () => {
  const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const boref = useRef<any>();
  const scref = useRef<any>();
  const liRefList = useRef<any[]>([]);

  function scrollTo(scroll, cb) {
    const demosEl = scref.current;
    anime({
      targets: { scroll: demosEl.scrollLeft },
      scroll: scroll,
      duration: 500,
      easing: 'easeInOutQuart',
      update: function (a) {
        demosEl.scrollLeft = a.animations[0].currentValue;
      },
      complete: function () {
        if (cb) cb();
      },
    });
  }

  function handelClick(scroll) {
    scrollTo(scroll, () => {});
  }

  return (
    <div className={styles.container}>
      <div className={styles.box} ref={boref}>
        <div className={styles.scroll} ref={scref}>
          <div className={styles.tabs}>
            {list.map((v, i) => (
              <div
                key={v}
                className={styles.item}
                ref={(dom) => {
                  liRefList.current.push(dom);
                }}
                onClick={() => {
                  const sreen = boref.current;
                  const tabs = scref.current;
                  const item = liRefList.current[i];
                  // setScroll(item.offsetWidth * i - sreen.offsetWidth / 2 + item.offsetWidth / 2);
                  handelClick(item.offsetWidth * i - sreen.offsetWidth / 2 + item.offsetWidth / 2);
                }}
              >
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
