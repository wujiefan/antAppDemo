import React, { useState } from 'react';
import { useAccess, Access } from 'umi';
import { Tabs } from 'antd';

const PageA = (props) => {
  const { foo } = props;
  const access = useAccess();
  const [activeKey, setActiveKey] = useState('2');

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  return (
    <div>
      <Tabs activeKey={activeKey} onChange={onChange}>
        {access.canRead1 && (
          <Tabs.TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </Tabs.TabPane>
        )}
        <Tabs.TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
      {/* <Access accessible={access.canRead1} fallback={<div>Can not read foo content.</div>}>
        Foo content.
      </Access>
      <Access accessible={access.canRead2} fallback={<div>Can not update foo.</div>}>
        Update foo.
      </Access> */}
    </div>
  );
};
export default PageA;
