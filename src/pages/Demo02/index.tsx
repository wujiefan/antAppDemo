import { connect } from 'umi';
import { useModel } from 'umi';
import { useEffect } from 'react';

const Demo02 = (props) => {
  console.log(props);
  const { data, dispatch } = props;
  const { counter } = useModel('counter', (ret) => ({
    counter: ret.counter,
  }));
  useEffect(() => {
    dispatch({
      type: 'user/query',
      payload: { name: 123 },
      callb(res) {
        console.log(res);
      },
    });
  }, []);
  return (
    <div>
      <h1>{counter}</h1>
      <h1>{String(data)}</h1>
      <button onClick={() => {}}>add by 1</button>
      <button onClick={() => {}}>minus by 1</button>
      <button
        onClick={() => {
          dispatch({ type: 'user/save', payload: { data: '456' } });
        }}
      >
        dispatch
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'user/get' });
        }}
      >
        dispatch2
      </button>
    </div>
  );
};

export default connect(({ user }) => {
  return { data: user.data };
})(Demo02);
