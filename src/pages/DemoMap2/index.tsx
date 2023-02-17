import React, { useEffect, useState } from 'react';

import EchartInit from './components/EchartInit';
export default function EchartMap(props) {
  const {} = props;

  const [option, setOption] = useState({});

  const initOption = () => {
    let _option = {
      title: {
        text: '香港人口分布',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{c} (p / km2)',
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      grid: {
        top: 10,
        left: 'center',
        width: 80,
        height: 20,
      },
      visualMap: {
        min: 800,
        max: 50000,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered'],
        },
      },
      series: [
        {
          name: '地图',
          type: 'map',
          map: 'china',
          label: {
            show: true,
          },
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
        },
      ],
    };
    setOption(_option);
  };
  useEffect(() => {
    initOption();
  }, []);

  return (
    <>
      <EchartInit options={option} type="map" soureName={'china'} />
    </>
  );
}
