/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: {
  currentUser?: API.CurrentUser | undefined;
  list: any;
}) {
  const { currentUser, list } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canRead1: list.read1,
    canRead2: list.read2,
  };
}
