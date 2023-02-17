import { Tree, Dropdown, Menu, message, Row, Col } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import type { MenuProps } from 'antd';
import { DashOutlined } from '@ant-design/icons';

const treeData: DataNode[] = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          {
            title: '0-0-0-0',
            key: '0-0-0-0',
            children: [
              {
                title: '0-0-0-0-0',
                key: '0-0-0-0-0',
                children: [{ title: '0-0-0-0-0-0', key: '0-0-0-0-0-0' }],
              },
            ],
          },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`);
};

export default () => {
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          key: 'add',
          label: <span>新增</span>,
        },
        {
          key: 'delete',
          label: <span>删除</span>,
        },
        {
          key: 'update',
          label: <span>编辑</span>,
        },
      ]}
    />
  );

  const titleRender = (nodeData: DataNode) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: 8 }}>{nodeData.title}</div>
        <Dropdown overlay={menu} trigger={['click']}>
          <DashOutlined />
        </Dropdown>
      </div>
    );
  };

  return (
    <div>
      <Row>
        <Col flex="400px" style={{ overflow: 'auto' }}>
          <Tree
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            titleRender={titleRender}
            treeData={treeData}
          />
        </Col>
        <Col flex="auto" style={{ backgroundColor: 'yellow' }}></Col>
      </Row>
    </div>
  );
};
