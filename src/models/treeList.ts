import { useState } from 'react';

export default () => {
  const [list, setList] = useState([]);
  return { list, setList };
};
