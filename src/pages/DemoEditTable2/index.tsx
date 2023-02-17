import ProForm, { ProFormDependency, ProFormField, ProFormRadio } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { EditableProTable } from '@ant-design/pro-table';
import type { ProColumns, EditableFormInstance } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { Space, Button } from 'antd';
import React, { useRef, useState } from 'react';

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: '624748504',
    title: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
    update_at: '2020-05-26T09:42:56Z',
  },
  {
    id: '624691229',
    title: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: '2020-05-26T08:19:22Z',
    update_at: '2020-05-26T08:19:22Z',
  },
];

export default () => {
  const editorFormRefs = useRef<EditableFormInstance<DataSourceType>>([]);
  const [tableList, setTableList] = useState([{}]);
  // const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const formRef = useRef<ProFormInstance<any>>();

  const onSubmit = (values: any) => {
    console.log(values);
  };
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
      width: '30%',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
    },
    {
      title: '活动时间',
      dataIndex: 'created_at',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue(
              record.tableName,
            ) as DataSourceType[];
            formRef.current?.setFieldsValue({
              [record.tableName]: tableDataSource.filter((item) => item.id !== record.id),
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <ProForm<{
      table: DataSourceType[];
    }>
      formRef={formRef}
      initialValues={{
        table1: defaultData,
      }}
      validateTrigger="onBlur"
      onFinish={onSubmit}
    >
      <div>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              const list = JSON.parse(JSON.stringify(tableList));
              list.push({});
              setTableList(list);
            }}
          >
            加个表
          </Button>
        </Space>
      </div>
      {tableList.map((v, i) => (
        <EditableProTable<DataSourceType>
          rowKey="id"
          scroll={{
            x: 960,
          }}
          editableFormRef={(r) => {
            editorFormRefs.current[i] = r;
          }}
          headerTitle={'可编辑表格' + (i + 1)}
          maxLength={5}
          name={'table' + (i + 1)}
          recordCreatorProps={{
            position: 'bottom',
            record: () => {
              const id = (Math.random() * 1000000).toFixed(0);
              return { id };
            },
          }}
          toolBarRender={() => [
            <Button
              type="text"
              key="rows"
              onClick={() => {
                const rows = editorFormRefs.current[i]?.getRowsData?.();
                console.log(rows);
              }}
            >
              获取 table 的数据
            </Button>,
          ]}
          columns={columns}
          editable={{
            type: 'multiple',
            actionRender: (row, config, defaultDom) => {
              return [defaultDom.save, defaultDom.delete || defaultDom.cancel];
            },
          }}
        />
      ))}
    </ProForm>
  );
};
