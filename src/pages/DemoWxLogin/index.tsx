import { useState, useRef, useEffect } from 'react';
import { Button } from 'antd';
import { getLoginParam } from '@/services/demo-api';
import { history } from 'umi';
import { getPageQuery } from '@/utils';

export default () => {
  const login = () => {
    getLoginParam().then((response) => {
      const obj = new window.WxLogin({
        self_redirect: true,
        id: 'weixinLogin',
        appid: response.data.appid,
        scope: response.data.scope,
        redirect_uri: response.data.redirect_uri,
        state: response.data.state,
        style: 'black',
        href: '',
      });
      console.log(obj);
    });
  };

  useEffect(() => {
    window.onhashchange = () => {
      //用一个方法拿到当前地址的参数
      const params = getPageQuery();
      // 扫码成功后地址栏会拼上一个code参数
      console.log(params);
      if (params.code || params['?code']) {
        const code = params.code ? params.code : params['?code'];
        console.log(code);
      }
    };
    return () => {
      window.onhashchange = null;
    };
  }, []);
  return (
    <div>
      <Button
        onClick={() => {
          login();
        }}
      >
        登陆
      </Button>
      <Button
        onClick={() => {
          history.push('/demoWxLogin?code=112233');
        }}
      >
        跳转
      </Button>
      <div id="weixinLogin" style={{ width: 200, height: 200 }}></div>
    </div>
  );
};
