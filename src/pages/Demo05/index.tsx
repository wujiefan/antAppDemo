import React, { useState } from 'react';
import { Button } from 'antd';

let number2: number | undefined;

const Demo05 = () => {
  const [number1, setNumber1] = useState(0);

  if (number2 === undefined) {
    console.log('init number2');
    number2 = 0;
  }

  const getNumber1 = () => {
    console.log('number1', number1);
    return number1;
  };
  const getNumber2 = () => {
    console.log('number2', number2);
    return number2;
  };
  return (
    <div>
      <div>number1:{number1}</div>
      <div>number2:{number2}</div>
      <div>get number1:{getNumber1()}</div>
      <div>get number2:{getNumber2()}</div>
      <div>
        <Button
          onClick={() => {
            setNumber1(number1 + 1);
          }}
        >
          add 1
        </Button>
        <Button
          onClick={() => {
            number2 = number2 + 1;
          }}
        >
          add 2
        </Button>
      </div>
    </div>
  );
};
export default Demo05;
