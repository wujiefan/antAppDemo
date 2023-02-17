import React, { useState, useEffect } from 'react';
import { Transfer, Select, Tree, Form, Row, Button, Col, Input } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
const { Option } = Select;

const isChecked = (selectedKeys, eventKey) => selectedKeys.indexOf(eventKey) !== -1;

const generateTree = (treeNodes = [], checkedKeys = []) =>
  treeNodes.map(({ children, ...props }) => ({
    ...props,
    disabled: checkedKeys.includes(props.key),
    children: generateTree(children, checkedKeys),
  }));

const TreeTransfer = ({ dataSource = [], targetKeys, ...restProps }) => {
  console.log(dataSource);
  const [expand, setExpand] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [form] = Form.useForm();

  const transferDataSource = [];
  const flatten = (list = []) => {
    list.forEach((item) => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  };
  flatten(dataSource);

  const getFields = () => {
    const count = expand ? 1 : 3;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={12} key={i}>
          <Form.Item
            name={`field-${i}`}
            label={`Field ${i}`}
            rules={[
              {
                required: true,
                message: 'Input something!',
              },
            ]}
          >
            {i % 3 !== 1 ? (
              <Input placeholder="placeholder" />
            ) : (
              <Select defaultValue="2">
                <Option value="1">1</Option>
                <Option value="2">
                  longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
                </Option>
              </Select>
            )}
          </Form.Item>
        </Col>,
      );
    }
    return children;
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    console.log(values['field-0'], dataSource.length);
    if (values['field-0'] >= 0 && values['field-0'] < dataSource.length) {
      const data = generateTree(dataSource.slice(values['field-0']), targetKeys);
      setTreeData(data);
    }
  };
  useEffect(() => {
    const data = generateTree(dataSource, targetKeys);
    console.log(data);
    setTreeData(data);
  }, [dataSource, targetKeys]);
  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={(item) => item.title}
      showSelectAll={false}
    >
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <div>
              <div style={{ width: 600, padding: 20 }}>
                <Form
                  form={form}
                  onFinish={onFinish}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Row gutter={24}>{getFields()}</Row>
                  <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                      <Button type="primary" htmlType="submit">
                        Search
                      </Button>
                      <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                          form.resetFields();
                        }}
                      >
                        Clear
                      </Button>
                      <a
                        style={{ fontSize: 12 }}
                        onClick={() => {
                          setExpand(!expand);
                        }}
                      >
                        {expand ? <UpOutlined /> : <DownOutlined />} Collapse
                      </a>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div>
                <Tree
                  blockNode
                  checkable
                  checkStrictly
                  defaultExpandAll
                  checkedKeys={checkedKeys}
                  treeData={treeData}
                  onCheck={(_, { node: { key } }) => {
                    onItemSelect(key, !isChecked(checkedKeys, key));
                  }}
                  onSelect={(_, { node: { key } }) => {
                    onItemSelect(key, !isChecked(checkedKeys, key));
                  }}
                />
              </div>
            </div>
          );
        }
      }}
    </Transfer>
  );
};

const App = () => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  const onChange = (keys) => {
    setTargetKeys(keys);
  };

  const getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    setTargetKeys(targetKeys);
    setDataSource(mockData);
  };

  useEffect(() => {
    getMock();
  }, []);

  return <TreeTransfer dataSource={dataSource} targetKeys={targetKeys} onChange={onChange} />;
};

export default App;
