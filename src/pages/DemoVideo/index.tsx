import { useState, useEffect } from 'react';

export default () => {
  const [imgUrl, setImgUrl] = useState('');
  async function checkImgAvailble(url) {
    const isAvailble = async () => {
      return new Promise((s, r) => {
        let img = new Image();
        img.src = url;
        img.onload = () => {
          s(true);
          img = null;
        };
        img.onerror = () => {
          s(false);
          img = null;
        };
      });
    };
    return /^blob:/.test(url) && (await isAvailble());
  }

  const init = () => {
    let video = document.createElement('video');
    let canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    video.setAttribute('crossOrigin', 'Anonymous'); //对此元素的 CORS 请求将不设置凭据标志。
    video.src =
      'https://youliapp.oss-cn-hangzhou.aliyuncs.com/test/enterprise/5914a61a096f4fe483fdcb019e280c1b.mp4';
    video.onloadeddata = async () => {
      console.log(video);
      video.currentTime = 2; // 相当于把进度条拉到2s
      const { videoWidth, videoHeight } = video;
      await new Promise((resolve) => {
        video.onseeked = () => {
          resolve('seek resolve!'); //拉动进度条会触发seeked事件
        };
      });

      canvas.width = videoWidth; //将画布的宽高和video的统一，否则会截不全
      canvas.height = videoHeight;
      await new Promise((resolve) => {
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        canvas.toBlob(async (blob) => {
          console.log(blob);
          //方法名说明了一切 toBlob
          const url = URL.createObjectURL(blob); // 获取可以使用的url
          console.log('url', url);
          if (await checkImgAvailble(url)) {
            setImgUrl(url);
          }
          resolve(void 0);
        });
      });
      //记得释放
      video = null;
      canvas = null;
    };
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <img src={imgUrl} alt="" />
    </div>
  );
};
