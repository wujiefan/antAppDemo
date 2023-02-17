import anime, { AnimeParams, AnimeInstance } from 'animejs';
import { useRef, useLayoutEffect } from 'react';

export const useAnime = (props: AnimeParams = {}) => {
  const animateTargetRef = useRef<any>();
  const animationRef = useRef<AnimeInstance>();

  useLayoutEffect(() => {
    if (!animateTargetRef.current) {
      console.warn('please bind the anime ref while useAnime');
      return;
    }
    animationRef.current = anime({
      ...props,
      targets: [animateTargetRef.current],
    });
  }, [props]);

  return { animateTargetRef, animationRef };
};
