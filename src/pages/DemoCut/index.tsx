import { useState, useCallback, useEffect, useRef } from 'react';
import { Avatar, Form, Button, Space, Select } from 'antd';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './index.less';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 文件最大限制为5M

function HooksCropperModal({ uploadedImageFile, onClose, onSubmit }) {
  const [src, setSrc] = useState(null); // 被选中的待裁剪文件的src
  const cropperRef = useRef(null); // 标记Cropper，会用到自带的方法将裁剪好的img的url进行转义

  useEffect(() => {
    const fileReader = new FileReader(); // 拿到文件
    fileReader.onload = (e) => {
      const dataURL = e.target.result;
      setSrc(dataURL);
    };

    fileReader.readAsDataURL(uploadedImageFile);
  }, [uploadedImageFile]);

  const handleSubmit = useCallback(() => {
    // let filename = uploadedImageFile.name

    console.log('正在上传图片');
    // TODO: 这里可以尝试修改上传图片的尺寸
    const dataUrl = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
    // async blob => {
    // // 创造提交表单数据对象
    // const formData = new FormData()
    // // 添加要上传的文件
    // formData.append('file', blob, filename)
    // 提示开始上传 (因为demo没有后端server, 所以这里代码我注释掉了, 这里是上传到服务器并拿到返回数据的代码)
    // this.setState({submitting: true})
    // 上传图片
    // const resp = await http.post(url, formData)
    // 拿到服务器返回的数据(resp)
    // console.log(resp)
    // 提示上传完毕
    // this.setState({submitting: false})

    //把选中裁切好的的图片传出去
    onSubmit(dataUrl);

    // 关闭弹窗
    onClose();
    // }
  }, [onClose, onSubmit]);

  return (
    <div style={{ width: '100%' }}>
      <Cropper
        src={src}
        ref={cropperRef}
        style={{
          height: window.innerHeight > 1000 ? window.innerHeight - 277 : window.innerHeight - 177,
        }} //想要改变图片的大小，用style
        viewMode={1}
        rotatable={true} // 滚轮滑动缩放图片大小
        zoomable={true}
        aspectRatio={1} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
        guides={false}
      />
      <div className="rotate-and-save-button-container">
        <Button
          type="primary"
          onClick={() => {
            cropperRef.current.cropper.rotate(-90); // 逆时针旋转
          }}
        >
          旋转
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          确定
        </Button>
      </div>
    </div>
  );
}

export default () => {
  const [hooksModalVisible, setHooksModalVisible] = useState(false); // 裁剪图片
  const [hooksModalFile, setHooksModalFile] = useState(null); // 选取的img文件
  const [hooksResultImgUrl, setHooksResultImgUrl] = useState(null); // 裁剪后的img

  function removeImgBgFromLoadedImage(img, num) {
    const rgba = [0, 0, 0, 255];
    const tolerance = 200;
    let imgData = null;
    const [r0, g0, b0, a0] = rgba;
    let r, g, b, a;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const w = img.width;
    const h = img.height;
    canvas.width = w;
    canvas.height = h;
    context.drawImage(img, 0, 0);
    imgData = context.getImageData(0, 0, w, h);
    for (let i = 0; i < imgData.data.length; i += 4) {
      r = imgData.data[i];
      g = imgData.data[i + 1];
      b = imgData.data[i + 2];
      a = imgData.data[i + 3];
      const t = Math.sqrt((r - r0) ** 2 + (g - g0) ** 2 + (b - b0) ** 2 + (a - a0) ** 2);
      if (t > tolerance) {
        imgData.data[i] = 0;
        imgData.data[i + 1] = 0;
        imgData.data[i + 2] = 0;
        imgData.data[i + 3] = 0;
      }
    }
    context.putImageData(imgData, 0, 0);
    const newBase64 = canvas.toDataURL('image/png');
    // console.log('newBase64', newBase64);
    setHooksResultImgUrl(newBase64);
  }
  const removeImgBgFromLoadedImage2 = (img) => {
    const rgba = [0, 0, 0, 255];
    const tolerance = 220;
    let imgData = null;
    const [r0, g0, b0, a0] = rgba;
    let r, g, b, a;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const w = img.width;
    const h = img.height;
    canvas.width = w;
    canvas.height = h;
    context.drawImage(img, 0, 0);
    imgData = context.getImageData(0, 0, w, h);
    for (let i = 0; i < imgData.data.length; i += 4) {
      r = imgData.data[i];
      g = imgData.data[i + 1];
      b = imgData.data[i + 2];
      a = imgData.data[i + 3];
      const t = Math.sqrt((r - r0) ** 2 + (g - g0) ** 2 + (b - b0) ** 2 + (a - a0) ** 2);
      // if ((r - r0 < 180 && g - g0 > 30 && b - b0 > 30) || t > tolerance) {
      if ((r - r0 < 180 && g - g0 > 20 && b - b0 > 20) || t > tolerance) {
        imgData.data[i] = 0;
        imgData.data[i + 1] = 0;
        imgData.data[i + 2] = 0;
        imgData.data[i + 3] = 0;
      }
    }
    context.putImageData(imgData, 0, 0);
    const newBase64 = canvas.toDataURL('image/png');
    // console.log('newBase64', newBase64);
    setHooksResultImgUrl(newBase64);
  };
  const handleHooksFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        const fileReader = new FileReader(); // 拿到文件
        fileReader.onload = (e) => {
          const dataURL = e.target.result;
          console.log(dataURL, e.target);
          let img = new Image();
          img.src = dataURL;
          img.onload = function () {
            // removeImgBgFromLoadedImage(img, 1);
            removeImgBgFromLoadedImage2(img);
          };
        };
        fileReader.readAsDataURL(file);
        // //选中的文件
        // setHooksModalFile(file);
        // // 显示裁剪
        // setHooksModalVisible(true);
      } else {
        console.log('文件过大');
      }
    }
  };

  return (
    <div>
      <h1>图片裁剪组件</h1>

      <div>
        <label>
          <span>(hooks形式的component)添加图片</span>
          {/* 
            	1. 获取本地文件，如果不想input要这个按钮样式，可以直接给透明度为0；
				2. 若调取相册：type="file"
				3. 若调取相机：type="file"  capture="camera"
			 */}
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleHooksFileChange}
          />
        </label>

        {/* 最终裁剪好的图片 */}
        <div>
          {hooksResultImgUrl && (
            <img className="img" src={hooksResultImgUrl} alt="classResultImgUrl" />
          )}
        </div>
      </div>

      {/* 裁剪框 */}
      {hooksModalVisible && (
        <HooksCropperModal
          uploadedImageFile={hooksModalFile}
          onClose={() => {
            setHooksModalVisible(false);
          }}
          onSubmit={setHooksResultImgUrl}
        />
      )}
    </div>
  );
};
