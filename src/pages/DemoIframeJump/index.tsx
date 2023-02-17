import { useState } from 'react';
import { message } from 'antd';

const DemoIframeJump = () => {
  window.say = function () {
    message.warning('限定发售的嘎嘎说的');
  };
  return (
    <div>
      <iframe
        src="http://localhost:8000/#/demoIframeIn"
        width={720}
        height={480}
        sandbox="allow-scripts allow-top-navigation allow-same-origin"
        loading="eager"
      />
    </div>
  );
};

export default DemoIframeJump;
