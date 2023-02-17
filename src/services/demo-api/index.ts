import { request } from 'umi';

export const getLoginParam = () => {
  return Promise.resolve({
    data: {
      appid: 'wxa1745d8a7429060e',
      scope: 'snsapi_login',
      redirect_uri: 'https://teacher.u-ark.cn/#/user/login',
      state: '',
    },
  });
};
