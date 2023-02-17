import React, { useEffect } from 'react';
import { useAnime } from '@/hooks/useAnime';

const Animate: React.FC = () => {
  const { animateTargetRef, animationRef } = useAnime({
    translateX: 300,
    loop: true,
    duration: 2000,
    autoplay: false,
  });

  useEffect(() => {
    setTimeout(() => {
      animationRef.current?.play?.();
    }, 3000);
  }, [animationRef]);

  return (
    <div
      ref={animateTargetRef}
      style={{ width: '100px', height: '100px', backgroundColor: 'black' }}
    />
  );
};

export default Animate;
