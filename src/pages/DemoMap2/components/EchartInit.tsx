import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import '../index.less';
import mapData from '@/pages/DemoMap/china.json';

interface ECHARTINIT {
  options: any;
  type?: string;
  otherSource?: any;
  soureName?: string;
}
export default function EchartInit(props: ECHARTINIT) {
  const { options, type, soureName = '', otherSource } = props;
  const curRef = useRef(null);
  let echart: any = null;

  const initEchart = () => {
    if (type === 'map') {
      echarts.registerMap(soureName, { geoJSON: mapData });
    }
    echart = echarts.init(curRef.current as unknown as HTMLElement);
    window.addEventListener('resize', handleResize);
    console.log(options);
    //渲染
    options && echart.setOption(options);
    echart.resize();
  };

  const handleResize = () => {
    try {
      echart.resize();
    } catch (err) {}
  };

  useEffect(() => {
    initEchart();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [options]);

  return <div ref={curRef} className="echart"></div>;
}
