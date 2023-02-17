import React, { useRef, useState, useEffect } from 'react';
import { PlusOutlined, RedoOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { ProFormField } from '@ant-design/pro-form';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, Form, Input, Space, Row, Col } from 'antd';

const { Search } = Input;

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [ready, setReady] = useState(false);
  const defaultColumns: ProColumns<any>[] = [
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
  const [columns, setColumns] = useState(defaultColumns);
  useEffect(() => {
    const head = [...defaultColumns];
    for (let i = 0; i < 6; i++) {
      head.unshift({
        title: `活动名称${i}`,
        dataIndex: `title${i}`,
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
        editable: () => i == 3,
      });
    }
    setTimeout(() => {
      setColumns(head);
      setReady(true);
    }, 1000);
  }, []);
  const onBatch = (value = '', key) => {
    console.log(value, key, dataSource);
    if (!value.trim()) {
      return;
    }
    const list = JSON.parse(JSON.stringify(dataSource));
    list.forEach((v) => {
      v[`title${key}`] = value;
    });
    setDataSource(list);
    console.log(actionRef.current);
  };
  return (
    <>
      <Row>
        <Col span={6}>
          <Search
            placeholder="批量修改"
            enterButton={<RedoOutlined style={{ fontSize: 16 }} />}
            size="small"
            onSearch={(val) => {
              onBatch(val, 1);
            }}
          />
        </Col>
      </Row>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            actionRef.current?.addEditRecord?.({
              id: (Math.random() * 1000000).toFixed(0),
              title: '新的一行',
            });
          }}
          icon={<PlusOutlined />}
        >
          新建一行
        </Button>
        <Button
          key="rest"
          onClick={() => {
            form.resetFields();
          }}
        >
          重置表单
        </Button>
      </Space>

      {ready && (
        <EditableProTable<any>
          rowKey="id"
          scroll={{
            x: 960,
            y: 600,
          }}
          actionRef={actionRef}
          headerTitle="可编辑表格"
          maxLength={5}
          // 关闭默认的新建按钮
          recordCreatorProps={false}
          columns={columns}
          request={async () => {
            console.log('on request');
            const list = [];
            for (let i = 0; i < 30; i++) {
              const data = {
                id: i,
              };
              for (let j = 0; j < 6; j++) {
                data[`title${j}`] = `活动字段${j}`;
              }
              list.push(data);
            }
            console.log(list);
            return {
              data: list,
              total: list.length,
              success: true,
            };
          }}
          value={dataSource}
          onChange={setDataSource}
          editable={{
            form,
            editableKeys,
            onSave: async () => {
              await waitTime(2000);
            },
            onChange: setEditableRowKeys,
            actionRender: (row, config, dom) => [dom.save, dom.cancel, dom.delete],
          }}
        />
      )}
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};
