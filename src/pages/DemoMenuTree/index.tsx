import React, { useState, useEffect } from 'react';
import './index.less';
import { Tree, Menu, Dropdown, Input, Tooltip } from 'antd';
import { MoreOutlined, SearchOutlined } from '@ant-design/icons';
import type { DataNode, TreeProps } from 'antd/es/tree';

const { Search } = Input;

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

const TreeList: React.FC = () => {
  const [treeData, setTreeData] = useState(treeDataTemp);
  const valueRef = React.useRef<string>(); //存储新增节点输入的名称
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [expandedKeys, setExpandedKeys] = useState([]);

  // 渲染Input框以及保存按钮
  const renderInput = (key, title) => {
    return (
      <Input
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          valueRef.current = e.target.value;
        }}
        defaultValue={title ? title : undefined}
        suffix={
          <div
            className="keep"
            onClick={(e) => {
              e.stopPropagation();
              onSave(key);
            }}
          >
            保存
          </div>
        }
      />
    );
  };

  //创建当前层级和下一级node
  const onAdd = (key, type) => {
    const treeDataOld = treeData.slice();
    const treeDataNew = addNode(key, treeDataOld);
    function addNode(key, data) {
      data.map((item, index) => {
        if (item.key === key) {
          const key = Math.random(100);
          const treeNode = {
            key: key,
            title: '',
            isOperate: true,
          };
          if (type === 'currentNode') {
            data.push(treeNode);
          } else {
            if (item.children) {
              item.children.push(treeNode);
            } else {
              item.children = [];
              item.children.push(treeNode);
            }
            setExpandedKeys([...expandedKeys, item.key]);
          }

          return;
        } else if (item.children && item.children.length) {
          addNode(key, item.children);
        }
      });
      return data;
    }
    setTreeData(treeDataNew);
  };

  // 保存
  const onSave = (key) => {
    const treeDataOld = treeData.slice();
    const treeDataNew = saveNode(key, treeDataOld);
    function saveNode(key, data) {
      data.forEach((item) => {
        if (item.key === key) {
          item.title = valueRef.current;
          item.value = valueRef.current;
          item.isOperate = false;
        } else if (item.children && item.children.length) {
          saveNode(key, item.children);
        }
      });
      return data;
    }
    setTreeData(treeDataNew);
  };

  // 重命名
  const onRename = (key) => {
    const treeDataOld = treeData.slice();
    const treeDataNew = renameNode(key, treeDataOld);
    function renameNode(key, data) {
      data.forEach((item) => {
        if (item.key === key) {
          item.isOperate = true;
        } else if (item.children && item.children.length) {
          renameNode(key, item.children);
        }
      });
      return data;
    }
    setTreeData(treeDataNew);
  };
  // 删除
  const onDelete = (key) => {
    const treeDataOld = treeData.slice();
    const treeDataNew = renameNode(key, treeDataOld);
    function renameNode(key, data) {
      data.forEach((item, index) => {
        if (item.key === key) {
          data.splice(index, 1);
        } else if (item.children && item.children.length) {
          renameNode(key, item.children);
        }
      });
      return data;
    }
    setTreeData(treeDataNew);
  };

  const menu = (item) => (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a
              target="_blank"
              onClick={(e) => {
                e.stopPropagation();
                onRename(item.key);
              }}
            >
              重命名
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a
              target="_blank"
              onClick={(e) => {
                e.stopPropagation();
                const type = 'currentNode';

                onAdd(item.key, type);
              }}
            >
              新建当前级
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a
              target="_blank"
              onClick={(e) => {
                e.stopPropagation();
                const type = 'nextNode';
                onAdd(item.key, type);
              }}
            >
              新建子级
            </a>
          ),
        },
        {
          key: '4',
          label: (
            <a
              target="_blank"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.key);
              }}
            >
              删除
            </a>
          ),
        },
      ]}
    />
  );

  const onDrop: TreeProps['onDrop'] = (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...treeData];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setTreeData(data);
  };

  const onExpand = (newExpandedKeys) => {
    // expandedKeysRef.current=newExpandedKeys
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const dataList: { key: React.Key; title: string }[] = [];
  const generateList = (data: DataNode[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key, title } = node;
      dataList.push({ key, title: title as string });
      if (node.children) {
        generateList(node.children);
      }
    }
  };

  const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
    let parentKey: React.Key;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey!;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    generateList(treeData);
    const newExpandedKeys = dataList
      .map((item) => {
        if (value !== '' && item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(newExpandedKeys as React.Key[]);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  return (
    <div className="container">
      <Input
        style={{ width: '95%', margin: '12px 8px' }}
        placeholder="Enter your username"
        suffix={
          <Tooltip title="Extra information">
            <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
        onChange={onChange}
      />
      <Tree
        className="draggable-tree"
        // defaultExpandedKeys={expandedKeys}
        // draggable
        blockNode
        // onDragEnter={onDragEnter}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onDrop={onDrop}
        treeData={treeData}
        titleRender={(data) => {
          const strTitle = data.title as string;
          const index = strTitle.indexOf(searchValue);
          const beforeStr = strTitle.substring(0, index);
          const afterStr = strTitle.slice(index + searchValue.length);
          data.value = (
            <div className="tree-item" style={{ display: 'flex' }}>
              <div style={{ flex: 1, lineHeight: '32px' }}>
                {data.isOperate ? (
                  renderInput(data.key, data.title)
                ) : index > -1 ? (
                  <span>
                    {beforeStr}
                    <span className="site-tree-search-value">{searchValue}</span>
                    {afterStr}
                  </span>
                ) : (
                  data.title
                )}
              </div>
              <div style={{ padding: '0px 10px', lineHeight: '32px' }}>
                <Dropdown overlay={menu(data)} placement="bottomRight">
                  <a onClick={(e) => e.preventDefault()}>
                    <MoreOutlined />
                  </a>
                </Dropdown>
              </div>
            </div>
          );
          return <div>{data.value}</div>;
        }}
      />
    </div>
  );
};

export default TreeList;
