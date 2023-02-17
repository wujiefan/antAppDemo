import React, { useEffect } from 'react';
import G6 from '@antv/g6';

// 定义数据源
const data = {
  // 点集
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 200,
      label: '起始点', // 节点文本
    },
    {
      id: 'node2',
      x: 300,
      y: 200,
      label: '目标点1', // 节点文本
    },
    {
      id: 'node3',
      x: 400,
      y: 200,
      label: '目标点2', // 节点文本
    },
  ],
  // 边集
  edges: [
    // 表示一条从 node1 节点连接到 node2 节点的边
    {
      source: 'node1',
      target: 'node2',
      label: '我是连线1', // 边的文本
    },
    {
      source: 'node2',
      target: 'node3',
      label: '我是连线2', // 边的文本
    },
  ],
};
export default () => {
  useEffect(() => {
    // 创建 G6 图实例
    const graph = new G6.Graph({
      container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
      // 画布宽高
      width: 800,
      height: 500,
      fitView: true, //超出适配
      fitViewPadding: [20, 40, 50, 20], //页面留白宽度
    });
    // 读取数据
    graph.data(data);
    // 渲染图
    graph.render();
  }, []);
  return <div id="mountNode" ref={this.getContainer}></div>;
};
