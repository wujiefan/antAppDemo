import { useState, useRef, useEffect } from 'react';

export default () => {
  // 滚动容器高度改变后执行的函数
  const changeHeight = useCallback(
    throttle(() => {
      // 容器高度，通过操作dom元素获取高度是因为它不一定是个定值
      curContainerHeight.current = containerRef.current.offsetHeight;
      // 列表最大数量，考虑到列表中顶部和底部可能都会出现没有展现完的item
      curViewNum.current = Math.ceil(curContainerHeight.current / itemHeight) + 1;
    }, 500),
    [],
  );

  useEffect(() => {
    // 组件第一次挂载需要初始化容器的高度以及最大容纳值
    changeHeight();
    // 因为我们的可视窗口和浏览器大小有关系，所以我们需要监听浏览器大小的变化
    // 当浏览器大小改变之后需要重新执行changeHeight函数计算当前可视窗口对应的最大容纳量是多少
    window.addEventListener('resize', changeHeight);
    return () => {
      window.removeEventListener('resize', changeHeight);
    };
  }, [changeHeight]);
  return (
    <div className="container">
      {/* 监听滚动事件的盒子，该高度继承了父元素的高度 */}
      <div className="scroll-box" ref={containerRef} onScroll={boxScroll}>
        {/* 该盒子的高度一定会超过父元素，要实现不了滚动的效果，而且还要动态的改变它的padding值用于控制滚动条的状态 */}
        <div style={topBlankFill.current}>
          {showList.map((item) => (
            <div className="item" key={item.commentId || Math.random() + item.comments}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
