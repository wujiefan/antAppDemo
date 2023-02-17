import React from 'react';
import { Row, Col, Checkbox, Empty, Tabs } from 'antd';
import _ from 'lodash';

const { TabPane } = Tabs;

const treeDataTemp = [
  {
    title: '0-0',
    key: '0-0',
    value: '0-0',
    defaultValue: '0-0',
    children: [
      {
        title: '0-0-0',
        value: '0-0',
        key: '0-0-0',
        defaultValue: '0-0-0',
        children: [
          {
            title: '0-0-0-0',
            key: '0-0-0-0',
            value: '0-0',
            defaultValue: '0-0-0-0',
            children: [
              {
                title: '0-0-0-0-0',
                key: '0-0-0-0-0',
                value: '0-0-0-0-0',
                defaultValue: '0-0-0-0-0',
              },
              {
                title: '0-0-0-0-1',
                key: '0-0-0-0-1',
                value: '0-0',
                defaultValue: '0-0-0-0-1',
              },
            ],
          },
          {
            title: '0-0-0-1',
            key: '0-0-0-1',
            value: '0-0',
            defaultValue: '0-0-0-1',
          },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
        value: '0-0',
        defaultValue: '0-0-2',
      },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
    value: '0-0',
    defaultValue: '0-2',
  },
];

const tabs = [{ name: 123, key: 123, child: [] }];

const CheckboxRow: React.FC<any> = ({ tab, checkedList, setCheckedList, activeKey, Initdata }) => {
  const [indeterminate, setIndeterminate] = React.useState([]); //当前tab二级控非选中状态样式
  const [allInte, setAllInte] = React.useState({}); //当前tab一级级非选中状态样式
  const [checkAll, setCheckAll] = React.useState({}); //当前tab二级选中状态
  const [activeKeyCheAll, setActiveKeyCheAll] = React.useState({}); //当前tab一级状态

  // 当前tab面板数据
  const tabpanel = tabs.filter((item: any) => item.key == activeKey)[0] || [];
  const checks = tabpanel && tabpanel.child;
  // 单选
  const onChange = (cdAllKey, checkedkeys, parentKey) => {
    let checkKey = {};
    let checked_list = {};
    checked_list[parentKey] = checkedkeys;

    Object.keys(cdAllKey).forEach((key) => {
      checkKey[key] = 0;
      for (let checkedItem of checkedkeys || []) {
        if (cdAllKey[key].indexOf(checkedItem) != -1) {
          checkKey[key]++;
          checkAll[key] = checkKey[key] === cdAllKey[key].length;
          indeterminate[key] = !!checkKey[key] && checkKey[key] < cdAllKey[key].length;
        }
      }
      if (checkKey[key] === 0) {
        // 选项组下仅有一个选项时取消选中
        checkAll[key] = false;
        indeterminate[key] = false;
      }
    });

    setCheckedList({ ...checkedList, ...checked_list });
    setIndeterminate(indeterminate);
    setCheckAll(checkAll);
  };

  // 初始化
  React.useEffect(() => {
    if (JSON.stringify(Initdata) != '{}') {
      let Indet_erminate = {},
        check_All = {},
        currPanel = {};
      // 以下为初始值与当前tab页数据对比处理
      const Initdatas = Object.keys(Initdata).reduce((prev, cur) => {
        prev[cur] = Initdata[cur];
        return prev;
      }, {});
      checks.forEach((item) => {
        currPanel[item.key] = item.children.map((k) => k.key);
      });
      // 初始值验证数组
      Object.keys(Initdatas).forEach((key) => {
        const currlength = currPanel[key] && currPanel[key].length;
        const Initlength = Initdatas[key] && Initdatas[key].length;
        if (currlength <= Initlength) {
          check_All[key] = true;
        } else if (Initlength < currlength) {
          Indet_erminate[key] = true;
        }
      });
      // 当前tab页二级选项选中 vs 当前原始数据 控制一级全选
      const check_AllKeys = Object.keys(check_All);
      const currPanelKeys = Object.keys(currPanel);
      const active_KeyCheAll = {},
        All_Inte = {};

      if (check_AllKeys.length == currPanelKeys.length) {
        active_KeyCheAll[activeKey] = true;
      } else if (check_AllKeys.length < currPanelKeys.length) {
        All_Inte[activeKey] = true;
      }
      setIndeterminate(Indet_erminate);
      setCheckAll(check_All);
      setAllInte(All_Inte);
      setActiveKeyCheAll(active_KeyCheAll);
    }
  }, []);

  // 监测当前tab数据变化改变一级 二级状态
  React.useEffect(() => {
    const All = Object.keys(checkAll).filter((key) => checkAll[key]) || [];
    const Checks = checks.map((item) => item.key) || [];
    const indeterminateaArr =
      Object.keys(indeterminate).filter((key) => indeterminate[key] === true) || [];

    if (All.length === Checks.length) {
      allInte[activeKey] = false;
      let activeKey_CheAll = {};
      activeKey_CheAll[activeKey] = true;
      setActiveKeyCheAll({ ...activeKeyCheAll, ...activeKey_CheAll });
      setAllInte(allInte);
    } else if ((All.length > 0 && All.length < Checks.length) || indeterminateaArr.length) {
      allInte[activeKey] = true;
      setAllInte(allInte);
      setActiveKeyCheAll(_.omit(activeKeyCheAll, activeKey));
    }
  }, [checkedList]);

  //二级全选
  const onCheckAllChange = (e, plainOptions, parentKey) => {
    const checked = e.target.checked;
    if (checked === true) {
      let checked_list = {};
      checked_list[parentKey] = plainOptions.map((item) => item.value);
      checkAll[parentKey] = true;
      setCheckedList({ ...checkedList, ...checked_list });
      setIndeterminate(_.omit(indeterminate, parentKey));
      setCheckAll(checkAll);
    } else {
      setCheckedList(_.omit(checkedList, parentKey));
      setCheckAll(_.omit(checkAll, parentKey));
    }
  };

  // 一级选项
  const onAllChange = (e) => {
    const checked = e.target.checked;
    let checkData = {};
    if (checked === true) {
      checks.forEach((item) => {
        checkData[item.key] = item && item.children && item.children.map((check) => check.key);
        checkAll[item.key] = true;
        indeterminate[item.key] = false;
      });
      activeKeyCheAll[activeKey] = true;
      setCheckedList({ ...checkedList, ...checkData });
      setIndeterminate(indeterminate);
      setCheckAll(checkAll);
      setActiveKeyCheAll(activeKeyCheAll);
    } else {
      checks.forEach((item) => {
        checkedList = _.omit(checkedList, item.key);
        checkAll[item.key] = false;
        indeterminate[item.key] = false;
      });
      activeKeyCheAll[activeKey] = false;
      setCheckedList({ ...checkedList });
      setIndeterminate(indeterminate);
      setCheckAll(checkAll);
      setActiveKeyCheAll(activeKeyCheAll);
    }
  };

  return tab.child && tab.child.length > 0 ? (
    <div>
      <Checkbox
        style={{ margin: '0px 0px 10px 10px' }}
        indeterminate={allInte[activeKey]}
        checked={activeKeyCheAll[activeKey]}
        onChange={onAllChange}
      >
        全选
      </Checkbox>{' '}
      {tab.child.map((cd) => (
        <Row gutter={[3, 16]}>
          <Col span={6}>
            <div className="Tabs-Col">
              <Checkbox
                key={cd.key}
                indeterminate={indeterminate[cd.key]}
                checked={checkAll[cd.key]}
                onChange={(e) => onCheckAllChange(e, toLable((cd && cd.children) || []), cd.key)}
              >
                {cd.title}
              </Checkbox>
            </div>
          </Col>
          <Col span={18}>
            <div className="Tabs-Col Tabs-Col2">
              {cd && cd.children && cd.children.length > 0 ? (
                <CheckboxCol cd={cd} checkedList={checkedList} onChange={onChange} />
              ) : null}
            </div>
          </Col>
        </Row>
      ))}
    </div>
  ) : (
    <Empty image={''} imageStyle={{ height: 100 }} description="暂无数据"></Empty>
  );
};

const PermissionTabs = ({ permission, defaultCheckedKeys = [], inputOnChange }) => {
  const [activeKey, setActiveKey] = React.useState('node'); //选择tab的Key
  const [checkedList, setCheckedList] = React.useState(treeDataTemp); // 所有选中数据
  const Initdata = treeDataTemp; // 存储初始数据

  const tab_convert = (keys, sign) => {
    // 处理数据 可忽略
    if (!keys) return [];
    let tabs = [];
    keys.map((key) => {
      permission.map((tab) => {
        if (sign) {
          // if (tab.key.toLowerCase() != key.toLowerCase()) tabs.push(tab)
        } else {
          if (tab.key.toLowerCase() == key.toLowerCase()) tabs.push(tab);
        }
      });
    });
    return tabs;
  };

  const convert_data = (checkedList) => {
    // 转换保存时的数据格式
    if (JSON.stringify(checkedList) == '{}') return [];
    const data = Object.keys(checkedList).map((item) => checkedList[item].concat(item));
    return _.flattenDeep(data);
  };

  const convert_values = (defaultCheckedKeys = []) => {
    //处理初始数据
    const arr = defaultCheckedKeys.reduce((prev, cur, index, arr) => {
      if (cur.indexOf('.') != -1 && cur.indexOf('-') == -1) {
        const key_code = cur.split('.');
        prev[key_code[0]] = arr.filter((key) => key.indexOf(key_code[0] + '.') != -1);
      }
      return prev;
    }, {});
    return arr;
  };

  React.useEffect(() => {
    // 存储数据
    // inputOnChange(convert_data(checkedList));
    console.log(checkedList);
  }, [checkedList]);

  const callback = (key) => setActiveKey(key);

  return (
    <Tabs activeKey={activeKey} onChange={callback}>
      {tabs.map((tab) => (
        <TabPane tab={tab.name} key={tab.key}>
          <CheckboxRow
            tab={tab}
            activeKey={activeKey}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
            Initdata={Initdata}
          />
        </TabPane>
      ))}
    </Tabs>
  );
};
export default PermissionTabs;
