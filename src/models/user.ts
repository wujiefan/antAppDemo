import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

const IndexModel = {
  namespace: 'user',
  state: {
    data: '123',
  },
  effects: {
    *query({ payload, callb }, { call, put }) {
      callb('789');
    },
  },
  reducers: {
    get(state, action) {
      console.log(state.data);
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];

      return {
        ...state,
        data,
      };
    },
    // 启用 immer 之后
    save(state, action) {
      console.log(state);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user') {
          dispatch({
            type: 'get',
          });
        }
      });
    },
  },
};

export default IndexModel;
