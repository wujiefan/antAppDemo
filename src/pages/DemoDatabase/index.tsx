import { useState, useRef, useEffect } from 'react';

// const customerData = [
//   { ssn: '444-44-4444', name: 'Bill', age: 35, email: 'bill@company.com' },
//   { ssn: '555-55-5555', name: 'Donna', age: 32, email: 'donna@home.org' },
// ];

export default () => {
  // useEffect(() => {
  //   const request = window.indexedDB.open('mydatabase');
  //   request.onerror = (event) => {
  //     // do something
  //     alert('打开本地indexedDB存储失败');
  //   };
  //   request.onsucess = (event) => {
  //     // do something
  //     db = event.target.result;
  //   };
  //   request.onupgradeneeded = (event) => {
  //     let db = event.target.result;
  //     // 为该数据库创建一个对象仓库
  //     // 建立一个对象仓库来存储我们客户的相关信息，我们选择 ssn 作为键路径（key path）
  //     // 因为 ssn 可以保证是不重复的
  //     let objStore = db.createObjectStore('customers', {
  //       keyPath: 'ssn',
  //     });
  //     // 姓名不唯一
  //     objStore = objStore.createIndex('name', 'name', { unique: false });
  //     // 邮箱唯一
  //     objStore = objStore.createIndex('email', 'email', { unique: true });
  //   };
  // }, []);
  return <div></div>;
};
