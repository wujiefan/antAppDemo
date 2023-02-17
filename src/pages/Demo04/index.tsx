import { Form, Select, Space, Input, Button, Row, Col, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ChildrenDemo from '@/components/ChildrenDemo';
const { Option } = Select;

const Demo03 = (props) => {
  const areas = [
    { label: 'Beijing', value: 'Beijing' },
    { label: 'Shanghai', value: 'Shanghai' },
  ];

  const sights = {
    Beijing: ['Tiananmen', 'Great Wall'],
    Shanghai: ['Oriental Pearl', 'The Bund'],
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  return (
    <>
      <Row>
        <Col span={8}>
          <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.Item
              label="设备价格"
              shouldUpdate={(pre: any, cur: any) => pre.price !== cur.price}
            >
              {(forms) => {
                const { getFieldValue } = forms;
                const price = getFieldValue('price');
                return (
                  <>
                    <Radio.Group
                      value={price ? 1 : 0}
                      onChange={(e) => form.setFieldsValue({ price: e.target.value ? [] : '' })}
                    >
                      <Radio.Button value={0}>不限</Radio.Button>
                      <Radio.Button value={1}>选择价格</Radio.Button>
                    </Radio.Group>
                    {price ? (
                      <Form.Item name="price">
                        <Select style={{ width: 260 }} allowClear={true} placeholder="选择价格">
                          <Option value={1}>2000以下</Option>
                          <Option value={2}>2000-3000</Option>
                          <Option value={3}>3000-4000</Option>
                        </Select>
                      </Form.Item>
                    ) : (
                      ''
                    )}
                  </>
                );
              }}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={6}>
          <ChildrenDemo>
            {(list: string[]) => {
              return list.map((v: string, i: number) => <div key={i}>{v}</div>);
            }}
          </ChildrenDemo>
        </Col>
      </Row>
    </>
  );
};

export default Demo03;
