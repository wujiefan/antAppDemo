import React, { useState, useEffect, useCallback, useMemo, FC, useRef } from 'react';
import * as charts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import './index.less';
type EChartsOption = charts.EChartsOption;

const EchartsTest: FC = (props) => {
  const getOption = () => {
    const option: EChartsOption = {
      backgroundColor: '', //背景颜色
      title: {
        text: '世界地图',
        subtext: '',
        color: '#000',
        x: 'center',
      },
      //是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
      visualMap: {
        // 左下角定义 在选中范围中的视觉元素 渐变地区颜色
        type: 'piecewise', // 类型为分段型
        top: 'bottom',
        // calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
        right: 10,
        splitNumber: 6,
        seriesIndex: [0],
        itemWidth: 20, // 每个图元的宽度
        itemGap: 2, // 每两个图元之间的间隔距离，单位为px
        pieces: [
          // 自定义每一段的范围，以及每一段的文字
          { gte: 10000, label: '10000人以上', color: '#1890FF' }, // 不指定 max，表示 max 为无限大（Infinity）。
          {
            gte: 1000,
            lte: 9999,
            label: '1000-9999人',
            color: '#83C2FF',
          },
          {
            gte: 500,
            lte: 999,
            label: '500-999人',
            color: '#CDE5FF',
          },
          {
            gte: 100,
            lte: 499,
            label: '100-499人',
            color: '#E6F1FF',
          },
          {
            gte: 1,
            lte: 99,
            label: '1-99人',
            color: '#EBF3FF',
          },
          { lte: 0, label: '无', color: '#FAFAFA' }, // 不指定 min，表示 min 为无限大（-Infinity）。
        ],
        textStyle: {
          color: '#737373',
        },
      },
      // 提示框，鼠标移入
      tooltip: {
        show: true, //鼠标移入是否触发数据
        trigger: 'item', //出发方式
        formatter: '{b}-用户数量：{c}',
      },
      //配置地图的数据，并且显示
      series: [
        {
          name: '地图',
          type: 'map', //地图种类
          map: 'china', //地图类型。
          data: [
            {
              name: '北京',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '天津',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '上海',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '重庆',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '河北',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '河南',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '云南',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '辽宁',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '黑龙江',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '湖南',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '安徽',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '山东',
              value: Math.round(Math.random() * 5000),
            },
            {
              name: '新疆',
              value: Math.round(Math.random() * 0),
            },
            {
              name: '江苏',
              value: Math.round(Math.random() * 5000),
            },
            {
              name: '浙江',
              value: Math.round(Math.random() * 50000),
            },
            {
              name: '江西',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '湖北',
              value: Math.round(Math.random() * 5000),
            },
            {
              name: '广西',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '甘肃',
              value: Math.round(Math.random() * 0),
            },
            {
              name: '山西',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '内蒙古',
              value: Math.round(Math.random() * 0),
            },
            {
              name: '陕西',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '吉林',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '福建',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '贵州',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '广东',
              value: Math.round(Math.random() * 500000),
            },
            {
              name: '青海',
              value: Math.round(Math.random() * 0),
            },
            {
              name: '西藏',
              value: Math.round(Math.random() * 0),
            },
            {
              name: '四川',
              value: Math.round(Math.random() * 5000),
            },
            {
              name: '宁夏',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '海南',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '台湾',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '香港',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '澳门',
              value: Math.round(Math.random() * 500),
            },
            {
              name: '南海诸岛',
              value: Math.round(Math.random() * 500),
            },
          ],
          itemStyle: {
            normal: {
              label: {
                show: true, //默认是否显示省份名称
              },
              areaStyle: {
                color: '#FAFAFA', //默认的地图板块颜色
              },
              borderWidth: 1,
              borderColor: '#D9D9D9',
            },
            //地图区域的多边形 图形样式。
            emphasis: {
              label: {
                show: true, //选中状态是否显示省份名称
              },
              areaStyle: {
                color: '#90c31d', //选中状态的地图板块颜色
              },
            },
          },
          zoom: 1, //放大比例
          label: {
            //图形上的文本标签，可用于说明图形的一些数据信息
            show: true,
          },
        },
        {
          type: 'scatter',
          showEffectOn: 'render', //配置什么时候显示特效
          coordinateSystem: 'geo', //该系列使用的坐标系
          symbolSize: 10, //标记的大小
          data: [{ name: '宜昌', value: [111.3, 30.7, 130] }],
          zlevel: 99999,
        },
      ],
    };
    return option;
  };
  return (
    <>
      <div>
        <div style={{ width: '50%', margin: '100px auto' }}>
          <ReactEcharts option={getOption()} />
        </div>
      </div>
    </>
  );
};

export default EchartsTest;
