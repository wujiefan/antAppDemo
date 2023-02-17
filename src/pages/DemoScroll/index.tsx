import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Image, Anchor } from 'antd';
import style from './index.less';

const { Link } = Anchor;

const DemoScroll = () => {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined);
  const leftRef = useRef();
  const rightRef = useRef();
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    setTargetOffset(rightRef?.current?.clientHeight / 2);
    setData([1, 2, 3, 4, 5, 6]);
  }, []);
  const onChange = (link: string) => {
    console.log('Anchor:OnChange', link);
    const num = Number(link.slice(4)) || 0;
    setCurrent(num);
  };
  useEffect(() => {
    console.log(current);
    if (leftRef) {
      console.log(leftRef);
      leftRef.current.scrollTop = 210 * current;
    }
  }, [current]);
  return (
    <Row className={style.container} gutter={16}>
      <Col span={6} className={style.colbox} ref={leftRef}>
        <Anchor
          affix={false}
          getContainer={() => {
            return document.getElementById('right');
          }}
          onChange={onChange}
          targetOffset={targetOffset}
          style={{ maxHeight: 'none' }}
        >
          {data.map((v, i) => (
            <Link
              key={v}
              href={`#div${i}`}
              title={
                <Image
                  width={200}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  preview={false}
                />
              }
              className={`${style.link} ${i === current ? style.active : ''}`}
            />
          ))}
        </Anchor>
      </Col>
      <Col span={18} className={style.colbox} id="right" ref={rightRef}>
        {data.map((v, i) => (
          <div className={`${style[`bg_${(i % 3) + 1}`]}`} id={`div${i}`}>
            内容{v}版块
          </div>
        ))}
      </Col>
    </Row>
  );
};
export default DemoScroll;
