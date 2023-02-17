// src/pages/Demo/index.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import styles from './index.less';

SwiperCore.use([Autoplay, Navigation]);

const Demo: React.FC = () => {
  const partnerLogo: string[] = ['1', '2', '3', '4', '5'];

  return (
    <div className={styles.demo}>
      <LeftOutlined className={styles.prev} />
      <RightOutlined className={styles.next} />
      {/* <img className={styles.prev} src={imgPrev} />
      <img className={styles.next} src={imgNext} /> */}

      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        loop
        autoplay
        navigation={{ prevEl: `.${styles.prev}`, nextEl: `.${styles.next}` }}
      >
        {partnerLogo.map((value, index) => {
          return (
            <SwiperSlide key={index}>
              <h1 className={styles.item}>{value}</h1>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Demo;
