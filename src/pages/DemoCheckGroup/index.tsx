import React, { useState, useMemo, useEffect } from 'react';
import styles from './index.less';
import { Checkbox, Space, Modal, Button, Row, Col, Tabs } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons';
import _ from 'lodash';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

type treeItem = {
  title: string;
  key: string;
  children?: treeItem[];
};

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
        children: [
          {
            title: '0-0-2-0',
            key: '0-0-2-0',
            value: '0-0',
            defaultValue: '0-0-2-0',
          },
          {
            title: '0-0-2-1',
            key: '0-0-2-1',
            value: '0-0',
            defaultValue: '0-0-2-1',
          },
        ],
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

const tList = [
  {
    id: 1,
    name: '甲',
    collage: '院院1',
  },
  {
    id: 2,
    name: '乙',
    collage: '院院2',
  },
  {
    id: 3,
    name: '丙',
    collage: '院院3',
  },
];

const TableCheck = (props: any) => {
  const { value, onChange, dataList } = props;

  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'name',
      title: '姓名',
    },
    {
      dataIndex: 'collage',
      title: '院系',
    },
  ];

  const rowSelection = {
    selectedRowKeys: value,
    onChange: onChange,
  };

  return (
    <ProTable
      columns={columns}
      request={(params, sorter, filter) => {
        return Promise.resolve({
          data: dataList,
          success: true,
        });
      }}
      rowKey="id"
      pagination={{
        showQuickJumper: true,
        pageSize: 10,
      }}
      toolBarRender={false}
      search={false}
      rowSelection={rowSelection}
    />
  );
};
const TreeModal = (props: any) => {
  const { visible, onCancel, onSubmit, dataList, linkList } = props;
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [openList, setOpenList] = useState<string[]>([]);
  const [checkNameList, setCheckNameList] = useState<string[]>([]);

  const setCheck = (list: treeItem[]) => {
    list.forEach((v) => {
      if (Array.isArray(v.children) && v.children.length > 0) {
        setCheck(v.children);
        const arr = v.children.filter((v) => checkedList.indexOf(v.key) > -1);
        if (arr.length === v.children.length && checkedList.indexOf(v.key) === -1) {
          setCheckedList((old) => {
            old.push(v.key);
            return [...old];
          });
        }
        if (arr.length < v.children.length && checkedList.indexOf(v.key) > -1) {
          setCheckedList((old) => {
            old.splice(old.indexOf(v.key), 1);
            return [...old];
          });
        }
      }
    });
  };

  const getSon = (list: treeItem[]) => {
    console.log(list);
    let sonList: string[] = [];
    list.forEach((v) => {
      sonList.push(v.key);
      if (Array.isArray(v.children) && v.children.length > 0) {
        sonList = [...sonList, ...getSon(v.children)];
      }
    });
    return sonList;
  };

  const getIndeterminate = (list: treeItem[]) => {
    let flag = false;
    if (Array.isArray(list) && list.length > 0) {
      const arr = list.filter((v) => checkedList.indexOf(v.key) > -1);
      flag = arr.length > 0 && arr.length < list.length;
    }
    return flag;
  };
  const getIcon = (item: treeItem) => {
    if (Array.isArray(item.children) && item.children.length > 0) {
      if (openList.indexOf(item.key) > -1) {
        return (
          <CaretDownFilled
            style={{ fontSize: 12, marginRight: 4 }}
            onClick={() => {
              setOpenList((old) => {
                old.splice(old.indexOf(item.key), 1);
                return [...old];
              });
            }}
          />
        );
      } else {
        return (
          <CaretRightFilled
            style={{ fontSize: 12, marginRight: 4 }}
            onClick={() => {
              setOpenList((old) => {
                old.push(item.key);
                return [...old];
              });
            }}
          />
        );
      }
    } else {
      return null;
    }
  };

  const getCard = (list: treeItem[], level: number, pid: string) => {
    return (
      <div
        className={`${styles.cardlist} ${styles[`level${level}`]} ${
          openList.indexOf(pid) === -1 ? styles.hide : ''
        }`}
      >
        <Space>
          {list.map((v: treeItem) => (
            <Checkbox
              key={v.key}
              indeterminate={getIndeterminate(v.children)}
              checked={checkedList.indexOf(v.key) > -1}
              onChange={(e) => {
                setCheckedList((old) => {
                  let sonList = [];
                  if (Array.isArray(v.children) && v.children.length > 0) {
                    sonList = getSon(v.children);
                  }
                  if (e.target.checked) {
                    old.push(v.key);
                    old = _.uniq([...old, ...sonList]);
                  } else {
                    old.splice(old.indexOf(v.key), 1);
                    old = _.difference(old, sonList);
                  }
                  console.log(old);
                  return [...old];
                });
              }}
            >
              <div className={styles.card}>
                <div>{v.title}</div>
                <div>这是一段描述</div>
              </div>
            </Checkbox>
          ))}
        </Space>
      </div>
    );
  };
  const getRow = (list: treeItem[], level: number, max: number, pid: string) => {
    return (list || []).map((v) => (
      <div
        className={`${styles[`level${level}`]} ${
          pid && openList.indexOf(pid) === -1 ? styles.hide : ''
        }`}
        key={v.key}
      >
        <span style={{ display: 'inline-block', width: 14 }}>{getIcon(v)}</span>
        <Checkbox
          key={v.key}
          indeterminate={getIndeterminate(v.children)}
          checked={checkedList.indexOf(v.key) > -1}
          onChange={(e) => {
            setCheckedList((old) => {
              let sonList = [];
              if (Array.isArray(v.children) && v.children.length > 0) {
                sonList = getSon(v.children);
              }
              if (e.target.checked) {
                old.push(v.key);
                old = _.uniq([...old, ...sonList]);
              } else {
                old.splice(old.indexOf(v.key), 1);
                old = _.difference(old, sonList);
              }
              console.log(old);
              return [...old];
            });
          }}
        >
          {v.title}
        </Checkbox>
        {/* {getRow(v.children, level + 1, max)} */}
        {Array.isArray(v.children) && v.children.length > 0
          ? level + 1 < max
            ? getRow(v.children, level + 1, max, v.key)
            : getCard(v.children, max, v.key)
          : null}
      </div>
    ));
  };
  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'student',
      title: '学生',
    },
    {
      dataIndex: 'teacher',
      title: '老师',
    },
  ];

  return (
    <Modal
      title="已选项目"
      width={900}
      destroyOnClose
      visible={visible}
      onCancel={() => onCancel()}
      onOk={() => onSubmit(checkedList, checkNameList)}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="未关联" key="1">
          <Row>
            <Col span={12}>{getRow(dataList, 1, 3, '')}</Col>
            <Col span={12}>
              <TableCheck dataList={tList} value={checkNameList} onChange={setCheckNameList} />
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="已关联" key="2">
          <ProTable
            columns={columns}
            request={(params, sorter, filter) => {
              return Promise.resolve({
                data: linkList,
                success: true,
              });
            }}
            rowKey="id"
            pagination={{
              showQuickJumper: true,
              pageSize: 10,
            }}
            toolBarRender={false}
            search={false}
          />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default () => {
  const [dataList, setDataList] = useState<treeItem[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [openList, setOpenList] = useState<string[]>([]);
  const [treeModal, setTreeModal] = useState({ visible: false });

  const onSubmit = (value1, value2) => {
    console.log(value1, value2);
  };
  const getCheckList = (list: treeItem[], pid = '') => {
    let checkTreeList: (treeItem & { pid: string })[] = [];
    list.forEach((v) => {
      if (checkedList.indexOf(v.key) > -1) {
        checkTreeList.push({ ...v, pid });
        if (Array.isArray(v.children) && v.children.length > 0) {
          const sonList = getCheckList(v.children, v.key);
          checkTreeList = [...checkTreeList, ...sonList];
        }
      }
    });
    return checkTreeList;
  };

  const getCheckTree = (list: treeItem[]) => {
    let checkTreeList: treeItem[] = [];
    list.forEach((v) => {
      if (checkedList.indexOf(v.key) > -1) {
        let treeItem = { ...v };
        if (Array.isArray(v.children) && v.children.length > 0) {
          treeItem.children = getCheckTree(v.children);
        }
        checkTreeList.push(treeItem);
      }
    });
    return checkTreeList;
  };

  const setCheck = (list: treeItem[]) => {
    list.forEach((v) => {
      if (Array.isArray(v.children) && v.children.length > 0) {
        setCheck(v.children);
        const arr = v.children.filter((v) => checkedList.indexOf(v.key) > -1);
        if (arr.length === v.children.length && checkedList.indexOf(v.key) === -1) {
          setCheckedList((old) => {
            old.push(v.key);
            return [...old];
          });
        }
        if (arr.length < v.children.length && checkedList.indexOf(v.key) > -1) {
          setCheckedList((old) => {
            old.splice(old.indexOf(v.key), 1);
            return [...old];
          });
        }
      }
    });
  };

  const getSon = (list: treeItem[]) => {
    console.log(list);
    let sonList: string[] = [];
    list.forEach((v) => {
      sonList.push(v.key);
      if (Array.isArray(v.children) && v.children.length > 0) {
        sonList = [...sonList, ...getSon(v.children)];
      }
    });
    return sonList;
  };

  const getIndeterminate = (list: treeItem[]) => {
    let flag = false;
    if (Array.isArray(list) && list.length > 0) {
      const arr = list.filter((v) => checkedList.indexOf(v.key) > -1);
      flag = arr.length > 0 && arr.length < list.length;
    }
    return flag;
  };
  const getIcon = (item: treeItem) => {
    if (Array.isArray(item.children) && item.children.length > 0) {
      if (openList.indexOf(item.key) > -1) {
        return (
          <CaretDownFilled
            style={{ fontSize: 12, marginRight: 4 }}
            onClick={() => {
              setOpenList((old) => {
                old.splice(old.indexOf(item.key), 1);
                return [...old];
              });
            }}
          />
        );
      } else {
        return (
          <CaretRightFilled
            style={{ fontSize: 12, marginRight: 4 }}
            onClick={() => {
              setOpenList((old) => {
                old.push(item.key);
                return [...old];
              });
            }}
          />
        );
      }
    } else {
      return null;
    }
  };

  const getCard = (list, level, pid) => {
    return (
      <div
        className={`${styles.cardlist} ${styles[`level${level}`]} ${
          openList.indexOf(pid) === -1 ? styles.hide : ''
        }`}
      >
        <Space>
          {list.map((v: treeItem) => (
            <Checkbox
              key={v.key}
              indeterminate={getIndeterminate(v.children)}
              checked={checkedList.indexOf(v.key) > -1}
              onChange={(e) => {
                setCheckedList((old) => {
                  let sonList = [];
                  if (Array.isArray(v.children) && v.children.length > 0) {
                    sonList = getSon(v.children);
                  }
                  if (e.target.checked) {
                    old.push(v.key);
                    old = _.uniq([...old, ...sonList]);
                  } else {
                    old.splice(old.indexOf(v.key), 1);
                    old = _.difference(old, sonList);
                  }
                  console.log(old);
                  return [...old];
                });
              }}
            >
              <div className={styles.card}>
                <div>{v.title}</div>
                <div>这是一段描述</div>
              </div>
            </Checkbox>
          ))}
        </Space>
      </div>
    );
  };
  const getRow = (list, level, max, pid) => {
    return (list || []).map((v) => (
      <div
        className={`${styles[`level${level}`]} ${
          pid && openList.indexOf(pid) === -1 ? styles.hide : ''
        }`}
        key={v.key}
      >
        <span style={{ display: 'inline-block', width: 14 }}>{getIcon(v)}</span>
        <Checkbox
          key={v.key}
          indeterminate={getIndeterminate(v.children)}
          checked={checkedList.indexOf(v.key) > -1}
          onChange={(e) => {
            setCheckedList((old) => {
              let sonList = [];
              if (Array.isArray(v.children) && v.children.length > 0) {
                sonList = getSon(v.children);
              }
              if (e.target.checked) {
                old.push(v.key);
                old = _.uniq([...old, ...sonList]);
              } else {
                old.splice(old.indexOf(v.key), 1);
                old = _.difference(old, sonList);
              }
              console.log(old);
              return [...old];
            });
          }}
        >
          {v.title}
        </Checkbox>
        {/* {getRow(v.children, level + 1, max)} */}
        {Array.isArray(v.children) && v.children.length > 0
          ? level + 1 < max
            ? getRow(v.children, level + 1, max, v.key)
            : getCard(v.children, max, v.key)
          : null}
      </div>
    ));
  };
  const checkTree = useMemo(() => {
    const checkDataList = getCheckTree(dataList);
    return checkDataList;
  }, [checkedList]);
  useEffect(() => {
    setDataList(treeDataTemp);
  }, []);
  useEffect(() => {
    setCheck(dataList);
  }, [checkedList]);
  return (
    <div>
      {getRow(dataList, 1, 3, '')}
      <div>
        <Button type="primary" onClick={() => setTreeModal({ visible: true, dataList: checkTree })}>
          确认
        </Button>
      </div>
      <TreeModal
        {...treeModal}
        onSubmit={onSubmit}
        onCancel={() => {
          setTreeModal({ visible: false });
        }}
      />
      {/* <div className={styles['level1']}>
        <CaretDownFilled />
        <Checkbox key={'0-0'} indeterminate={false} checked={false} onChange={(e) => {}}>
          {'0-0'}
        </Checkbox>
        <div className={styles['level2']}>
          <Checkbox key={'0-0-0'} indeterminate={false} checked={false} onChange={(e) => {}}>
            {'0-0-0'}
          </Checkbox>
          <div className={`${styles.cardlist} ${styles['level3']}`}>
            <Space>
              <Checkbox key={'0-0-0-0'} indeterminate={false} checked={false} onChange={(e) => {}}>
                <div className={styles.card}>
                  <div>{'0-0-0-0'}</div>
                  <div>这是一段描述</div>
                </div>
              </Checkbox>
              <Checkbox key={'0-0-0-1'} indeterminate={false} checked={false} onChange={(e) => {}}>
                <div className={styles.card}>
                  <div>{'0-0-0-1'}</div>
                  <div>这是一段描述</div>
                </div>
              </Checkbox>
            </Space>
          </div>
        </div>
        <div className={styles['level2']}>
          <Checkbox key={'0-0-1'} indeterminate={false} checked={false} onChange={(e) => {}}>
            {'0-0-1'}
          </Checkbox>
        </div>
      </div>
      <div className={styles['level1']}>
        <CaretRightFilled />
        <Checkbox key={'0-1'} indeterminate={false} checked={false} onChange={(e) => {}}>
          {'0-1'}
        </Checkbox>
      </div> */}
    </div>
  );
};
